package com.superapp.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "internships")
public class Internship {
    @Id
    private String id;
    private String title;
    private String company;
    private String location;
    private String type;
    private String stipend;
    private String description;
    private List<String> requirements;
    private String applyLink;
    private Date postedAt = new Date();
}
