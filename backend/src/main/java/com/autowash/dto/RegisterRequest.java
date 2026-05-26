package com.autowash.dto;

import com.autowash.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;

    private String phone;

    private String password;

    private String licensePlate;

    private Role role;
}