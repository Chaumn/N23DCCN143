const Student = require('../models/Student');

class StudentService {
  // Tạo sinh viên mới
  async createStudent(data) {
    const student = new Student(data);
    return await student.save();
  }

  // Lấy danh sách sinh viên (pagination + filter)
  async getStudents({ page = 1, limit = 10, major }) {
    const filter = { isActive: true };
    if (major) filter.major = major;

    const skip = (page - 1) * limit;
    const total = await Student.countDocuments(filter);
    const students = await Student.find(filter)
      .skip(skip)
      .limit(Number(limit));

    return {
      data: students,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Lấy chi tiết sinh viên
  async getStudentById(id) {
    return await Student.findById(id);
  }

  // Cập nhật sinh viên
  async updateStudent(id, data) {
    return await Student.findByIdAndUpdate(id, data, { new: true });
  }

  // Xóa mềm sinh viên
  async deleteStudent(id) {
    return await Student.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

  // Cập nhật điểm
  async updateScore(id, score) {
    if (score < 0 || score > 100) {
      throw new Error('Score must be between 0 and 100');
    }
    return await Student.findByIdAndUpdate(
      id,
      { score },
      { new: true }
    );
  }

  // Top sinh viên theo điểm
  async getTopStudents(limit = 5) {
    return await Student.find({ isActive: true })
      .sort({ score: -1 })
      .limit(Number(limit));
  }

  // Điểm trung bình
  async getAvgScore() {
    const result = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgScore: { $avg: '$score' } } },
    ]);
    return result[0]?.avgScore || 0;
  }

  // Tìm kiếm theo tên
  async searchStudents(keyword) {
    return await Student.find({
      isActive: true,
      name: { $regex: keyword, $options: 'i' },
    });
  }
}

module.exports = new StudentService();