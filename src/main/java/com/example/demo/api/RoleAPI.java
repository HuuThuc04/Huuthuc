package com.example.demo.api;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("${api.prefix}/roles")
public class RoleAPI {
    @Autowired
    RoleService roleService;

    @GetMapping("getAllRole")
    public ResponseEntity<?> getAllRoles() {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("status", true);
            result.put("message", "OK");
            result.put("data", roleService.getAllRole());
        } catch (Exception e) {
            result.put("status", false);
            result.put("message", "API Fail");
            result.put("data", "[]");
            System.out.println("Fail when call API getAllRoles: " + e);
        } finally {
            return ResponseEntity.status(200).body(result);
        }
    }

    @GetMapping("/getRoleById")
    public ResponseEntity<?> getRoleById(@RequestParam("roleId") Long roleId) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("status", true);
            result.put("message", "OK");
            result.put("data", roleService.getRoleByID(roleId));
        } catch (Exception e) {
            result.put("status", false);
            result.put("message", "API Fail");
            result.put("data", "[]");
            System.out.println("Fail when call API getRoleByID: " + e);
        } finally {
            return ResponseEntity.status(200).body(result);
        }
    }

    @PostMapping("/postRole")
    public ResponseEntity<?> doPostRole(@RequestBody Role role) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("status", true);
            result.put("message", "OK");
            result.put("data", roleService.getAllRole());
        } catch (Exception e) {
            result.put("status", false);
            result.put("message", "API Fail");
            result.put("data", "[]");
            System.out.println("Fail when call API /roles/postRole : " + e);
        } finally {
            return ResponseEntity.ok(result);
        }
    }

    @DeleteMapping("/deleteRole")
    public ResponseEntity<?> doDeleteRole(@RequestBody Role role) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("status", true);
            result.put("message", "OK");
            result.put("data", roleService.getAllRole());
        } catch (Exception e) {
            result.put("status", false);
            result.put("message", "API Fail");
            result.put("data", "[]");
            System.out.println("Fail when call API /users/postUser : " + e);
        } finally {
            return ResponseEntity.ok(result);
        }
    }
}
