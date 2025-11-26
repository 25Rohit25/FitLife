package com.fitlifepro.repository;

import com.fitlifepro.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MealRepository extends MongoRepository<Meal, String> {
    List<Meal> findByUserIdOrderByDateDesc(String userId);
}
