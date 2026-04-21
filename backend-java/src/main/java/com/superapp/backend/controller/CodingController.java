package com.superapp.backend.controller;

import com.superapp.backend.model.CodingProfile;
import com.superapp.backend.repository.CodingProfileRepository;
import com.superapp.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/coding")
public class CodingController {

    @Autowired
    CodingProfileRepository codingProfileRepository;

    @GetMapping
    public ResponseEntity<?> getCodingProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return codingProfileRepository.findByUserId(userDetails.getId())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> updateCodingProfile(@RequestBody CodingProfile profileRequest, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        CodingProfile profile = codingProfileRepository.findByUserId(userDetails.getId())
                .orElse(new CodingProfile());

        profile.setUserId(userDetails.getId());
        profile.setLeetcodeUsername(profileRequest.getLeetcodeUsername());
        profile.setGithubUsername(profileRequest.getGithubUsername());
        profile.setCodeforcesUsername(profileRequest.getCodeforcesUsername());

        codingProfileRepository.save(profile);
        return ResponseEntity.ok(profile);
    }
}
