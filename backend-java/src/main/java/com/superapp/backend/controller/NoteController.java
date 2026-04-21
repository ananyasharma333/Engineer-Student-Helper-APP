package com.superapp.backend.controller;

import com.superapp.backend.model.Note;
import com.superapp.backend.repository.NoteRepository;
import com.superapp.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

    @Autowired
    NoteRepository noteRepository;

    public NoteController() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes(@RequestParam(required = false) String subject) {
        if (subject != null && !subject.isEmpty()) {
            return ResponseEntity.ok(noteRepository.findBySubject(subject));
        }
        return ResponseEntity.ok(noteRepository.findAll());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadNote(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("subject") String subject,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        String fileName = UUID.randomUUID().toString() + "-" + org.springframework.util.StringUtils.cleanPath(file.getOriginalFilename());
        
        try {
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            Note note = new Note();
            note.setTitle(title);
            note.setSubject(subject);
            note.setFileUrl("/uploads/" + fileName);
            note.setUploadedBy(userDetails.getId());
            
            noteRepository.save(note);
            
            return ResponseEntity.ok(note);
            
        } catch (IOException ex) {
            return ResponseEntity.internalServerError().body("Could not store file " + fileName + ". Please try again!");
        }
    }
}
