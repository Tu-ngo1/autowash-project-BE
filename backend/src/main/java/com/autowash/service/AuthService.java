package com.autowash.service;

import com.autowash.dto.AuthResponse;
import com.autowash.dto.LoginRequest;
import com.autowash.dto.RegisterRequest;
import com.autowash.entity.Role;
import com.autowash.entity.User;
import com.autowash.repository.UserRepository;
import com.autowash.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        Role role = request.getRole();
        if (role == null) {
            role = Role.CUSTOMER;
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .licensePlate(request.getLicensePlate())
                .role(role)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getPhone(), user.getRole().name());

        return new AuthResponse(token, user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid phone or password"
                ));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid phone or password"
            );
        }

        String token = jwtService.generateToken(user.getPhone(), user.getRole().name());

        return new AuthResponse(token, user.getRole().name());
    }
}