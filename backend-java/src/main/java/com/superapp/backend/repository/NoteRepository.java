package com.superapp.backend.repository;

import com.superapp.backend.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findBySubject(String subject);
}
