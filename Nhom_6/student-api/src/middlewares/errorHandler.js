const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // Lỗi duplicate key (email hoặc studentId trùng)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} đã tồn tại`,
    });
  }

  // Lỗi validation của mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Lỗi server',
  });
};

module.exports = errorHandler;