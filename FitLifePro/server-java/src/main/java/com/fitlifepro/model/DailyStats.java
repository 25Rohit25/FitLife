package com.fitlifepro.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "daily_stats")
public class DailyStats {
    @Id
    private String id;
    private String userId;
    private String date; // YYYY-MM-DD
    private Integer steps = 0;
    private Integer caloriesBurned = 0;
    private Integer caloriesConsumed = 0;
    private Double sleepHours = 0.0;
    private Integer avgHeartRate = 0;
}
