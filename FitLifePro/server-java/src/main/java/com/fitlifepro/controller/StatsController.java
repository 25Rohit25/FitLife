package com.fitlifepro.controller;

import com.fitlifepro.model.DailyStats;
import com.fitlifepro.repository.DailyStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    @Autowired
    DailyStatsRepository dailyStatsRepository;

    @GetMapping("/today")
    public DailyStats getTodayStats(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        String today = LocalDate.now().toString();

        return dailyStatsRepository.findByUserIdAndDate(Long.parseLong(userId), today)
                .orElseGet(() -> {
                    DailyStats newStats = new DailyStats();
                    newStats.setUserId(Long.parseLong(userId));
                    newStats.setDate(today);
                    return dailyStatsRepository.save(newStats);
                });
    }

    @PostMapping("/sync-device")
    public DailyStats syncDevice(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        String today = LocalDate.now().toString();

        DailyStats stats = dailyStatsRepository.findByUserIdAndDate(Long.parseLong(userId), today)
                .orElseGet(() -> {
                    DailyStats newStats = new DailyStats();
                    newStats.setUserId(Long.parseLong(userId));
                    newStats.setDate(today);
                    return newStats;
                });

        // Simulate syncing
        stats.setSteps(stats.getSteps() + (int) (Math.random() * 500));
        stats.setCaloriesBurned(stats.getCaloriesBurned() + (int) (Math.random() * 50));

        return dailyStatsRepository.save(stats);
    }
}
