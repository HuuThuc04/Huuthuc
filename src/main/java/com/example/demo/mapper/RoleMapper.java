package com.example.demo.mapper;

import com.example.demo.entities.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface RoleMapper {
    List<Role> getAllRole();
    Role getRoleByID(@Param("roleId") Long roleId) throws SQLException;
}
