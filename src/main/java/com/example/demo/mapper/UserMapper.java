package com.example.demo.mapper;

import com.example.demo.entities.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<User> getAllUser();
    int insertUser(User user);
    int updateUser(User user);
    int deleteUser(User user);
    boolean isUserExist(User user);
}
