const studentService = require('../services/student.service');

class StudentController {
  // POST /api/students
  async createStudent(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json({
        success: true,
        message: 'Tạo sinh viên thành công',
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/students
  async getStudents(req, res, next) {
    try {
      const { page, limit, major } = req.query;
      const result = await studentService.getStudents({ page, limit, major });
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/students/:id
  async getStudentById(req, res, next) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sinh viên',
        });
      }
      res.status(200).json({
        success: true,
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/students/:id
  async updateStudent(req, res, next) {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sinh viên',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Cập nhật thành công',
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/students/:id
  async deleteStudent(req, res, next) {
    try {
      const student = await studentService.deleteStudent(req.params.id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sinh viên',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Xóa sinh viên thành công',
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/students/:id/score
  async updateScore(req, res, next) {
    try {
      const { score } = req.body;
      if (score === undefined || score < 0 || score > 100) {
        return res.status(400).json({
          success: false,
          message: 'Score không hợp lệ, phải trong khoảng 0 - 100',
        });
      }
      const student = await studentService.updateScore(req.params.id, score);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sinh viên',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Cập nhật điểm thành công',
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/students/top
  async getTopStudents(req, res, next) {
    try {
      const { limit } = req.query;
      const students = await studentService.getTopStudents(limit);
      res.status(200).json({
        success: true,
        data: students,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/students/stats/avg
  async getAvgScore(req, res, next) {
    try {
      const avgScore = await studentService.getAvgScore();
      res.status(200).json({
        success: true,
        data: { avgScore },
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/students/search
  async searchStudents(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng nhập từ khóa tìm kiếm',
        });
      }
      const students = await studentService.searchStudents(q);
      res.status(200).json({
        success: true,
        data: students,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();