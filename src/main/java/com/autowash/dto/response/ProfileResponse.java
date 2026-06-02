package com.autowash.dto.response;

import com.autowash.entity.CustomerProfile;
import com.autowash.enums.TierLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {

    private Long id;
    private Long userId;
    private TierLevel tierLevel;
    private Integer rewardPoints;
    private Integer tierPoints;

    public static ProfileResponse fromProfile(CustomerProfile profile) {
        return new ProfileResponse(
                profile.getId(),
                profile.getUser().getId(),
                profile.getTierConfig().getTierLevel(),
                profile.getRewardPoints(),
                profile.getTierPoints()
        );
    }
}