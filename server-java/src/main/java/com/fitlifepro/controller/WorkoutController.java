package com.fitlifepro.controller;

import com.fitlifepro.model.User;
import com.fitlifepro.model.Workout;
import com.fitlifepro.repository.UserRepository;
import com.fitlifepro.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    @Autowired
    WorkoutRepository workoutRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<Workout> getWorkouts(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return workoutRepository.findByUserIdOrderByDateDesc(Long.parseLong(userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<?> addWorkout(@RequestBody Workout workout, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        workout.setUserId(Long.parseLong(userId));

        Workout savedWorkout = workoutRepository.save(workout);

        // Gamification Logic (Simplified)
        User user = userRepository.findById(Long.parseLong(userId)).orElseThrow();
        int xpGained = 10 * (workout.getDuration() / 10);
        user.getGamification().setXp(user.getGamification().getXp() + xpGained);

        // Level up logic
        int currentLevel = user.getGamification().getLevel();
        int nextLevelXp = currentLevel * 100;
        boolean leveledUp = false;
        if (user.getGamification().getXp() >= nextLevelXp) {
            user.getGamification().setLevel(currentLevel + 1);
            leveledUp = true;
        }

        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("workout", savedWorkout);
        if (leveledUp) {
            Map<String, Object> gamification = new HashMap<>();
            gamification.put("leveledUp", true);
            gamification.put("level", user.getGamification().getLevel());
            gamification.put("xp", user.getGamification().getXp());
            response.put("gamification", gamification);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkout(@PathVariable Long id) {
        workoutRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
