package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/form-class")
public class ClassF8Controller {
    @GetMapping("/form-entry")
    public String doGetFormEntry() {
        return "layout/FormClassF8.html";
    }

    @GetMapping("/user-entry")
    public String doGetUserEntry() {
        return "formEntry/UserEntry.html";
    }

    @GetMapping("/role-entry")
    public String doGetRoleEntry() {
        return "formEntry/RoleEntry.html";
    }


}
