package com.fitlifepro.repository;

import com.fitlifepro.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByUserIdOrderByDateDesc(Long userId);
}
