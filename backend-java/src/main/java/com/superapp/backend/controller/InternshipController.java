package com.superapp.backend.controller;

import com.superapp.backend.model.Internship;
import com.superapp.backend.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    @Autowired
    InternshipRepository internshipRepository;

    @GetMapping
    public ResponseEntity<List<Internship>> getAllInternships() {
        return ResponseEntity.ok(internshipRepository.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addInternship(@RequestBody Internship internship) {
        internshipRepository.save(internship);
        return ResponseEntity.ok(internship);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteInternship(@PathVariable String id) {
        internshipRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
