package com.fitlifepro.security;

import com.fitlifepro.model.User;
import com.fitlifepro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        // In this app, we use ID as the subject in JWT usually, but let's stick to
        // standard Spring Security
        // If the token subject is ID, we find by ID. If email, find by email.
        // The Node.js app likely put the user ID in the payload.
        // Let's assume the subject is the User ID for consistency with typical MERN
        // JWTs.

        User user = userRepository.findById(Long.parseLong(id))
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + id));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getId().toString()) // Use ID as username for internal security context
                .password(user.getPassword())
                .authorities(user.getRoles().stream()
                        .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority(role))
                        .collect(java.util.stream.Collectors.toList()))
                .build();
    }
}
