package com.fitlifepro.repository;

import com.fitlifepro.model.DailyStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface DailyStatsRepository extends MongoRepository<DailyStats, String> {
    Optional<DailyStats> findByUserIdAndDate(String userId, String date);
}
