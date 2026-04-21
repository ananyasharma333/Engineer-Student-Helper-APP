package com.superapp.backend.repository;

import com.superapp.backend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByAuthorId(String authorId);
}
