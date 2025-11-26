package com.fitlifepro.repository;

import com.fitlifepro.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    List<Workout> findByUserIdOrderByDateDesc(String userId);
}
