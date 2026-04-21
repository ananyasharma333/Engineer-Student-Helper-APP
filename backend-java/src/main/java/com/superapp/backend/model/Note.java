package com.superapp.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "notes")
public class Note {
    @Id
    private String id;
    private String title;
    private String subject;
    private String description;
    private String fileUrl;
    private String uploadedBy; // userId
    private Date uploadedAt = new Date();
    private int downloads = 0;
}
