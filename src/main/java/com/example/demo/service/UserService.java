package com.example.demo.service;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;

import java.sql.SQLException;
import java.util.List;

public interface UserService {
    /**
     * <h1>Lấy tất cả thông tin của người dùng</h1>
     *
     * @return Danh sách người dùng
     * @throws SQLException
     */
    List<User> getAllUsers() throws SQLException;

    /**
     * <h1>Thêm mới người dùng</h1>
     * <p>
     *     + nếu userId đã tồn tại -> Update
     *     + ngược lại -> Insert
     * </p>
     * @param user Đối tượng người dùng cần thêm mới
     * @return int - Số dòng được thêm mới
     * @throws SQLException
     */
    int createUser(User user) throws SQLException;

    /**
     * <h1>Kiểm tra người dùng có tồn tại chưa</h1>
     * <p>
     *     + nếu user đã tồn tại -> @return false
     *     + ngược lại -> @return true
     * </p>
     * @param user Đối tượng người dùng cần kiểm tra
     * @return boolean
     * @throws SQLException
     */
    boolean isUserExist(User user) throws SQLException;

    /**
     * <h1>Xóa người dùng</h1>
     *
     * @param user Đối tượng người dùng cần xóa
     * @return int - Số dòng đã xóa
     * @throws SQLException
     */
    int deleteUser(User user) throws SQLException;
}
