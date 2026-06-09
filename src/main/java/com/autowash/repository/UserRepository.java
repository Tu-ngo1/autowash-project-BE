package com.autowash.repository;

import com.autowash.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPhone(String phone);

    boolean existsByPhone(String phone);

    boolean existsUserByUsername(String username);

    boolean existsUserByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}