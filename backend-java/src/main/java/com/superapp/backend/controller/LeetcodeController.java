package com.superapp.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/leetcode")
public class LeetcodeController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/{username}")
    public ResponseEntity<?> getLeetcodeStats(@PathVariable String username) {
        try {
            String url = "https://leetcode-stats-api.herokuapp.com/" + username;
            String response = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Fallback: try the alfa API
            try {
                String url2 = "https://alfa-leetcode-api.onrender.com/" + username + "/solved";
                String response2 = restTemplate.getForObject(url2, String.class);
                return ResponseEntity.ok(response2);
            } catch (Exception e2) {
                return ResponseEntity.ok("{\"status\":\"error\",\"message\":\"Could not fetch LeetCode data. Please check the username.\"}");
            }
        }
    }
}
