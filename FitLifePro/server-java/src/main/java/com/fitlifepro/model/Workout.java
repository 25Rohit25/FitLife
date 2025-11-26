package com.fitlifepro.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "workouts")
public class Workout {
    @Id
    private String id;
    private String userId; // Reference to User ID
    private String type;
    private Integer duration;
    private String intensity;
    private Integer caloriesBurned;
    private Date date = new Date();
}
