package com.praneeth.taskmanager.common.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    @GetMapping("/api/health")
    public String health() {
        jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return "ok";
    }
}