package com.fitlifepro.model;

import lombok.Data;
import jakarta.persistence.*;

import java.util.Date;

@Data
@Entity
@Table(name = "workouts")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // Reference to User ID

    private String type;
    private Integer duration;
    private String intensity;
    private Integer caloriesBurned;
    private Date date = new Date();
}
