package com.autowash.service;

import com.autowash.dto.response.ProfileResponse;
import com.autowash.dto.response.UserResponse;
import com.autowash.entity.CustomerProfile;
import com.autowash.entity.User;
import com.autowash.repository.CustomerProfileRepository;
import com.autowash.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.autowash.dto.request.UpdateProfileRequest;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;

    public User getCurrentUserEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        String phone = authentication.getName();

        return userRepository.findByPhone(phone)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "User not found"
                ));
    }

    public UserResponse getCurrentUser() {
        User user = getCurrentUserEntity();
        return UserResponse.fromUser(user);
    }

    public ProfileResponse getCurrentUserProfile() {
        User user = getCurrentUserEntity();

        CustomerProfile profile = customerProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer profile not found"
                ));

        return ProfileResponse.fromProfile(profile);
    }

    @Transactional
    public UserResponse updateCurrentUserProfile(UpdateProfileRequest request) {
        User user = getCurrentUserEntity();

        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
        }

        User savedUser = userRepository.save(user);

        return UserResponse.fromUser(savedUser);
    }

}
