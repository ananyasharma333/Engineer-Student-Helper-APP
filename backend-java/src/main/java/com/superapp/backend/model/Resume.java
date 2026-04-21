package com.superapp.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "resumes")
public class Resume {
    @Id
    private String id;
    private String userId;
    private String fullName;
    private String email;
    private String phone;
    private List<String> skills;
    private List<String> experience;
    private List<String> education;
}
