package com.fitlifepro.model;

import lombok.Data;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles = new HashSet<>();

    @Embedded
    private Physical physical = new Physical();

    @Embedded
    private Goals goals = new Goals();

    @Embedded
    private Gamification gamification = new Gamification();

    @ElementCollection
    private List<DailyLog> dailyLogs = new ArrayList<>();

    private Date createdAt = new Date();

    @Data
    @Embeddable
    public static class Physical {
        private Double height;
        private Double weight;
        private Integer age;
        private String gender;
    }

    @Data
    @Embeddable
    public static class Goals {
        private Integer dailySteps = 10000;
        private Double targetWeight = 70.0;
        private Integer dailyCalories = 2000;
        private Integer weeklyWorkouts = 4;
    }

    @Data
    @Embeddable
    public static class Gamification {
        @Column(name = "xp_points")
        private Integer xp = 0;

        @Column(name = "user_level")
        private Integer level = 1;

        private Integer currentStreak = 0;
        private Date lastActivityDate = new Date();

        @ElementCollection
        private List<String> badges = new ArrayList<>();
    }

    @Data
    @Embeddable
    public static class DailyLog {
        private Date date = new Date();
        private Integer waterIntake = 0;
    }
}
