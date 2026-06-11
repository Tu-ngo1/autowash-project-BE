package com.autowash.dto.response;

import com.autowash.entity.CustomerProfile;
import com.autowash.entity.User;
import com.autowash.enums.TierLevel;
import com.autowash.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AdminCustomerResponse {

    private Long id;
    private String fullName;
    private String phone;
    private String email;
    private UserStatus status;
    private TierLevel tierLevel;
    private Integer rewardPoints;
    private Integer tierPoints;
    private Integer carCount;
    private Integer bookingCount;
    private LocalDateTime createdAt;

    public static AdminCustomerResponse fromProfile(
            CustomerProfile profile,
            Integer carCount,
            Integer bookingCount
    ) {
        User user = profile.getUser();

        return new AdminCustomerResponse(
                user.getId(),
                user.getFullName(),
                user.getPhone(),
                user.getEmail(),
                user.getStatus(),
                profile.getTierConfig().getTierLevel(),
                profile.getRewardPoints(),
                profile.getTierPoints(),
                carCount,
                bookingCount,
                user.getCreatedAt()
        );
    }
}