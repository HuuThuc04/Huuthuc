package com.example.demo.service.ServiceImpl;

import com.example.demo.entities.User;
import com.example.demo.mapper.RoleMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    RoleMapper roleMapper;

    @Override
    public List<User> getAllUsers() throws SQLException {
        List<User> userRes = userMapper.getAllUser();
        // get Role for User
//        C1:
//        for(int i = 0 ; i < userRes.size() ; i++){
//            userRes.get(i).setRole(roleMapper.getRoleByID(Long.parseLong(userRes.get(i).getRoleId())));
//        }
//        C2:
//        userRes.forEach(e ->{
//            e.setRole(roleMapper.getRoleByID(Long.parseLong(e.getRoleId())));
//        });
//        C3:
        userRes.stream()
                .forEach(e -> {
                    try {
                        e.setRole(roleMapper.getRoleByID(e.getRoleId()));
                    } catch (Exception ex) {
                        ex.getMessage();
                    }
                });
        return userRes;
    }

    @Override
    public int createUser(User user) throws SQLException {
        boolean isUserExist = this.isUserExist(user);
        int row = 0;
        if(isUserExist) {
            row = userMapper.updateUser(user);
        } else {
            row = userMapper.insertUser(user);
        }
        return row;
    }

    @Override
    public boolean isUserExist(User user) throws SQLException {
        return userMapper.isUserExist(user);
    }

    @Override
    public int deleteUser(User user) throws SQLException {
        return userMapper.deleteUser(user);
    }
}
