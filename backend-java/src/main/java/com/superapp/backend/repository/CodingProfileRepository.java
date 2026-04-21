package com.superapp.backend.repository;

import com.superapp.backend.model.CodingProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CodingProfileRepository extends MongoRepository<CodingProfile, String> {
    Optional<CodingProfile> findByUserId(String userId);
}
