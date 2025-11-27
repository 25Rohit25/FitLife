package com.fitlifepro.controller;

import com.fitlifepro.model.Meal;
import com.fitlifepro.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
public class MealController {
    @Autowired
    MealRepository mealRepository;

    @GetMapping
    public List<Meal> getMeals(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return mealRepository.findByUserIdOrderByDateDesc(Long.parseLong(userDetails.getUsername()));
    }

    @PostMapping
    public Meal addMeal(@RequestBody Meal meal, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        meal.setUserId(Long.parseLong(userDetails.getUsername()));
        return mealRepository.save(meal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeal(@PathVariable Long id) {
        mealRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
