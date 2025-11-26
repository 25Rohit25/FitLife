package com.fitlifepro.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "meals")
public class Meal {
    @Id
    private String id;
    private String userId;
    private String type;
    private String description;
    private Integer calories;
    private Date date = new Date();
}
