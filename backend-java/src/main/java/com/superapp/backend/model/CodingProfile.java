package com.superapp.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "coding_profiles")
public class CodingProfile {
    @Id
    private String id;
    private String userId;
    private String leetcodeUsername;
    private String githubUsername;
    private String codeforcesUsername;
}
