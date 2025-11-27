package com.fitlifepro.controller;

import com.fitlifepro.model.User;
import com.fitlifepro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername())).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername())).orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Update fields
        user.setName(updatedUser.getName());

        if (updatedUser.getPhysical() != null) {
            user.setPhysical(updatedUser.getPhysical());
        }

        if (updatedUser.getGoals() != null) {
            user.setGoals(updatedUser.getGoals());
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/water")
    public ResponseEntity<?> getWaterIntake(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername())).orElse(null);
        if (user == null)
            return ResponseEntity.notFound().build();

        String todayStr = java.time.LocalDate.now().toString();
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");

        if (user.getDailyLogs() == null) {
            user.setDailyLogs(new java.util.ArrayList<>());
        }

        com.fitlifepro.model.User.DailyLog todayLog = user.getDailyLogs().stream()
                .filter(log -> {
                    if (log.getDate() == null)
                        return false;
                    return sdf.format(log.getDate()).equals(todayStr);
                })
                .findFirst()
                .orElse(new com.fitlifepro.model.User.DailyLog());

        return ResponseEntity.ok(java.util.Map.of("waterIntake", todayLog.getWaterIntake()));
    }

    @PostMapping("/water")
    public ResponseEntity<?> updateWaterIntake(@RequestBody com.fitlifepro.dto.WaterRequest request,
            Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername())).orElse(null);
        if (user == null)
            return ResponseEntity.notFound().build();

        String todayStr = java.time.LocalDate.now().toString();
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");

        if (user.getDailyLogs() == null) {
            user.setDailyLogs(new java.util.ArrayList<>());
        }

        com.fitlifepro.model.User.DailyLog todayLog = user.getDailyLogs().stream()
                .filter(log -> {
                    if (log.getDate() == null)
                        return false;
                    return sdf.format(log.getDate()).equals(todayStr);
                })
                .findFirst()
                .orElse(null);

        if (todayLog == null) {
            todayLog = new com.fitlifepro.model.User.DailyLog();
            // Date is initialized to new Date() in the model, which is correct for today
            todayLog.setWaterIntake(0);
            user.getDailyLogs().add(todayLog);
        }

        int newAmount = todayLog.getWaterIntake() + request.getAmount();
        if (newAmount < 0)
            newAmount = 0;
        todayLog.setWaterIntake(newAmount);

        userRepository.save(user);

        return ResponseEntity.ok(java.util.Map.of("waterIntake", todayLog.getWaterIntake()));
    }
}
