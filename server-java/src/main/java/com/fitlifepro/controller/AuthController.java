package com.fitlifepro.controller;

import com.fitlifepro.dto.JwtResponse;
import com.fitlifepro.dto.LoginRequest;
import com.fitlifepro.dto.RegisterRequest;
import com.fitlifepro.model.User;
import com.fitlifepro.repository.UserRepository;
import com.fitlifepro.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("Backend is running!");
    }

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest signUpRequest) {
        System.out.println("Register request received for email: " + signUpRequest.getEmail());
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            System.out.println("Email already in use: " + signUpRequest.getEmail());
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.getRoles().add("ROLE_USER");

        User savedUser = userRepository.save(user);

        // Auto login after register
        String jwt = jwtUtils.generateJwtToken(savedUser.getId().toString());
        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login request received for email: " + loginRequest.getEmail());
        // We need to find the user first to get the ID, because our UserDetailsService
        // expects ID
        // But standard AuthManager expects username.
        // Let's adjust UserDetailsService to find by email if it's an email?
        // Actually, the simplest way to match the Node app logic (which finds by email)
        // is to manually check password here or implement a custom AuthProvider.
        // But let's try to stick to Spring Security.

        // Hack: We find the user by email, get their ID, then authenticate with ID.
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid Credentials");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getId().toString(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername())).orElse(null);
        return ResponseEntity.ok(user);
    }
}
