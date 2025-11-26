package com.fitlifepro.dto;

import lombok.Data;

@Data
public class AiResponse {
    private String answer;
    
    public AiResponse(String answer) {
        this.answer = answer;
    }
}
