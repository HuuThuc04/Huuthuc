package com.example.demo.api;

import com.example.demo.entities.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/users")
public class UserApi {
    @Autowired
    UserService userService;

    @GetMapping("/getAllUser")
    public ResponseEntity<?> doGetUser() {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("status", true);
            result.put("message", "OK");
            result.put("data", userService.getAllUsers());
        } catch (Exception e) {
            result.put("status", false);
            result.put("message", "API Fail");
            result.put("data", "[]");
            System.out.println("Fail when call API /users/getUser : " + e);
        } finally {
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping("/postUser")
    public ResponseEntity<?> doPostUser(@RequestBody User user) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("status", true);
            result.put("message", "OK");
            result.put("data", userService.createUser(user));
        } catch (Exception e) {
            result.put("status", false);
            result.put("message", "API Fail");
            result.put("data", "[]");
            System.out.println("Fail when call API /users/postUser : " + e);
        } finally {
            return ResponseEntity.ok(result);
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> doDeleteUser(@RequestBody User user) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("status", true);
            result.put("message", "OK");
            result.put("data", userService.deleteUser(user));
        } catch (Exception e) {
            result.put("status", false);
            result.put("message", "API Fail");
            result.put("data", "[]");
            System.out.println("Fail when call API /users/deleteUser : " + e);
        } finally {
            return ResponseEntity.ok(result);
        }
    }
}
