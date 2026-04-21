package com.superapp.backend.controller;

import com.superapp.backend.model.Project;
import com.superapp.backend.repository.ProjectRepository;
import com.superapp.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        project.setAuthorId(userDetails.getId());
        projectRepository.save(project);
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}/upvote")
    public ResponseEntity<?> upvoteProject(@PathVariable String id) {
        return projectRepository.findById(id).map(project -> {
            project.setUpvotes(project.getUpvotes() + 1);
            projectRepository.save(project);
            return ResponseEntity.ok(project);
        }).orElse(ResponseEntity.notFound().build());
    }
}
