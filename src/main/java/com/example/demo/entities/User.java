package com.example.demo.entities;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private long userId;
    private String userName;
    private long age;
    private String gmail;
    private String description;
    private Long roleId;
    private Role role;
}
