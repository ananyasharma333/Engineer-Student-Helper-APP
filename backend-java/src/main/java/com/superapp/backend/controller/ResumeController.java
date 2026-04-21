package com.superapp.backend.controller;

import com.superapp.backend.model.Resume;
import com.superapp.backend.repository.ResumeRepository;
import com.superapp.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    ResumeRepository resumeRepository;

    @GetMapping
    public ResponseEntity<?> getResume(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return resumeRepository.findByUserId(userDetails.getId())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> updateResume(@RequestBody Resume resumeRequest, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Resume resume = resumeRepository.findByUserId(userDetails.getId())
                .orElse(new Resume());
        
        resume.setUserId(userDetails.getId());
        resume.setFullName(resumeRequest.getFullName());
        resume.setEmail(resumeRequest.getEmail());
        resume.setPhone(resumeRequest.getPhone());
        resume.setSkills(resumeRequest.getSkills());
        resume.setExperience(resumeRequest.getExperience());
        resume.setEducation(resumeRequest.getEducation());

        resumeRepository.save(resume);
        return ResponseEntity.ok(resume);
    }
}
