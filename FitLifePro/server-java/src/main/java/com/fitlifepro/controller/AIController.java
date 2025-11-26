package com.fitlifepro.controller;

import com.fitlifepro.dto.AiRequest;
import com.fitlifepro.dto.AiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @PostMapping("/ask")
    public ResponseEntity<?> askAi(@RequestBody AiRequest request) {
        System.out.println("AI Request received: " + request.getPrompt());
        try {
            RestTemplate restTemplate = new RestTemplate();

            String fullUrl = apiUrl + "?key=" + apiKey;

            Map<String, Object> content = new HashMap<>();
            String fullPrompt = (request.getContext() != null ? request.getContext() : "") + "\n\nUser: "
                    + request.getPrompt();
            content.put("parts", List.of(Map.of("text", fullPrompt)));

            Map<String, Object> body = new HashMap<>();
            body.put("contents", List.of(content));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            System.out.println("Sending request to Gemini: " + fullUrl);
            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);

            if (response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> contentResponse = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) contentResponse.get("parts");
                    String text = (String) parts.get(0).get("text");
                    return ResponseEntity.ok(new AiResponse(text));
                }
            }

            return ResponseEntity.badRequest().body("No response from AI");

        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            System.err.println("AI Client Error: " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode())
                    .body(Map.of("error", "AI Error: " + e.getResponseBodyAsString()));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("AI Error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of("error", "AI Error: " + e.getMessage()));
        }
    }
}
