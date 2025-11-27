package com.fitlifepro.repository;

import com.fitlifepro.model.DailyStats;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DailyStatsRepository extends JpaRepository<DailyStats, Long> {
    Optional<DailyStats> findByUserIdAndDate(Long userId, String date);
}
