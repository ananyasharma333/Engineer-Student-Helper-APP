package com.superapp.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "projects")
public class Project {
    @Id
    private String id;
    private String title;
    private String description;
    private List<String> techStack;
    private String githubLink;
    private String liveLink;
    private String authorId;
    private Date createdAt = new Date();
    private int upvotes = 0;
}
