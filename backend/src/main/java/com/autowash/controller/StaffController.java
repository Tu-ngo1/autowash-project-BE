package com.autowash.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffController {

    @GetMapping("/api/staff/test")
    public String staffTest() {
        return "Staff API is working";
    }
}