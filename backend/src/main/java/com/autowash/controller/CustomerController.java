package com.autowash.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    @GetMapping("/api/customer/test")
    public String customerTest() {
        return "Customer API is working";
    }
}