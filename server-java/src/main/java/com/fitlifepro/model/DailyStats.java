package com.fitlifepro.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "daily_stats")
public class DailyStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String date; // YYYY-MM-DD
    private Integer steps = 0;
    private Integer caloriesBurned = 0;
    private Integer caloriesConsumed = 0;
    private Double sleepHours = 0.0;
    private Integer avgHeartRate = 0;
}
