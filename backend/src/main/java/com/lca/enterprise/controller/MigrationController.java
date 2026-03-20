package com.lca.enterprise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/migration")
@CrossOrigin(origins = "http://localhost:4200")
public class MigrationController {

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzePom(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(Map.of(
            "status", "PENDING",
            "message", "Analyse du pom.xml en cours...",
            "filename", file.getOriginalFilename()
        ));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "LCA Enterprise Migration API"));
    }
}
