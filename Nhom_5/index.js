require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARE ====================

// 1. Serve static files từ thư mục public
app.use(express.static('public'));

// 2. Parse JSON body cho POST request
app.use(express.json());

// 3. MW Logger — ghi [time] METHOD /path ra console cho mọi request
app.use((req, res, next) => {
  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] ${req.method} ${req.path}`);
  next(); // Quan trọng! Phải gọi next() để đi tiếp
});

// 4. MW checkAge — kiểm tra age >= 18
const checkAge = (req, res, next) => {
  const age = req.query.age || req.body?.age;

  if (!age) {
    return res.status(400).json({ error: 'Vui lòng nhập tuổi!' });
  }

  if (Number(age) < 18) {
    return res.status(400).json({ error: 'Bạn phải từ 18 tuổi trở lên!' });
  }

  next(); // Hợp lệ → đi tiếp đến route handler
};

// ==================== ROUTES ====================

// GET /api/info?name=&age=
// Gắn middleware checkAge riêng cho route này
app.get('/api/info', checkAge, (req, res) => {
  const { name, age } = req.query;

  res.json({
    name: name,
    age: Number(age),
    message: `Chào mừng ${name}! Bạn ${age} tuổi.`
  });
});

// POST /api/register — body: name, age, email
app.post('/api/register', (req, res) => {
  const { name, age, email } = req.body;

  // Validate không bỏ trống
  if (!name || !age || !email) {
    return res.status(400).json({
      error: 'Vui lòng điền đầy đủ thông tin!'
    });
  }

  // Trả lại thông tin + id tự tăng (đơn giản dùng timestamp)
  res.json({
    id: Date.now(),
    name,
    age: Number(age),
    email,
    message: `Đăng ký thành công! Chào mừng ${name}!`
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});