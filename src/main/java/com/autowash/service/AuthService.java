package com.autowash.service;

import com.autowash.dto.request.LoginRequest;
import com.autowash.dto.request.RegisterRequest;
import com.autowash.dto.response.AuthResponse;
import com.autowash.entity.CustomerProfile;
import com.autowash.entity.TierConfig;
import com.autowash.entity.User;
import com.autowash.enums.Role;
import com.autowash.enums.TierLevel;
import com.autowash.enums.UserStatus;
import com.autowash.infrastructure.security.JwtService;
import com.autowash.repository.CustomerProfileRepository;
import com.autowash.repository.TierConfigRepository;
import com.autowash.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final TierConfigRepository tierConfigRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Phone number already exists"
            );
        }

        Role role = request.getRole();

        if (role == null) {
            role = Role.CUSTOMER;
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        User savedUser = userRepository.save(user);

        if (savedUser.getRole() == Role.CUSTOMER) {
            TierConfig memberTier = tierConfigRepository.findById(TierLevel.MEMBER)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Default MEMBER tier config not found"
                    ));

            CustomerProfile profile = CustomerProfile.builder()
                    .user(savedUser)
                    .tierConfig(memberTier)
                    .rewardPoints(0)
                    .tierPoints(0)
                    .build();

            customerProfileRepository.save(profile);
        }

        String token = jwtService.generateToken(savedUser.getPhone(), savedUser.getRole().name());

        return new AuthResponse(
                token,
                savedUser.getRole().name(),
                getDashboardUrlByRole(savedUser.getRole())
        );
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid phone or password"
                ));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Account is locked or disabled"
            );
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid phone or password"
            );
        }

        String token = jwtService.generateToken(user.getPhone(), user.getRole().name());

        return new AuthResponse(token, user.getRole().name(), getDashboardUrlByRole(user.getRole()));
    }

    private String getDashboardUrlByRole(Role role) {
        if (role == Role.ADMIN) {
            return "/admin/dashboard";
        }

        if (role == Role.STAFF) {
            return "/staff/dashboard";
        }

        return "/customer/dashboard";
    }


}