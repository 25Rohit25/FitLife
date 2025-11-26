package com.fitlifepro.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    
    private Physical physical = new Physical();
    private Goals goals = new Goals();
    private Gamification gamification = new Gamification();
    private List<DailyLog> dailyLogs = new ArrayList<>();
    private Date createdAt = new Date();

    @Data
    public static class Physical {
        private Double height;
        private Double weight;
        private Integer age;
        private String gender;
    }

    @Data
    public static class Goals {
        private Integer dailySteps = 10000;
        private Double targetWeight = 70.0;
        private Integer dailyCalories = 2000;
        private Integer weeklyWorkouts = 4;
    }

    @Data
    public static class Gamification {
        private Integer xp = 0;
        private Integer level = 1;
        private Integer currentStreak = 0;
        private Date lastActivityDate = new Date();
        private List<String> badges = new ArrayList<>();
    }

    @Data
    public static class DailyLog {
        private Date date = new Date();
        private Integer waterIntake = 0;
    }
}
