package com.superapp.backend.repository;

import com.superapp.backend.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ResumeRepository extends MongoRepository<Resume, String> {
    Optional<Resume> findByUserId(String userId);
}
