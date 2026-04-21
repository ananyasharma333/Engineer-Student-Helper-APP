package com.superapp.backend.repository;

import com.superapp.backend.model.Internship;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InternshipRepository extends MongoRepository<Internship, String> {
}
