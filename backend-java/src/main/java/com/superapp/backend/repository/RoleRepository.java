package com.superapp.backend.repository;

import com.superapp.backend.model.ERole;
import com.superapp.backend.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
