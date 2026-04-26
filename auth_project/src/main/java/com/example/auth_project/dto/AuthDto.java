package com.example.auth_project.dto;

public class AuthDto {

    // ─── Register Request ──────────────────────────────────────────
    public static class RegisterRequest {

        private String name;
        private String email;
        private String password;

        public RegisterRequest() {}

        public RegisterRequest(String name, String email, String password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // ─── Login Request ─────────────────────────────────────────────
    public static class LoginRequest {

        private String email;
        private String password;

        public LoginRequest() {}

        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // ─── User Info (returned in responses) ────────────────────────
    public static class UserInfo {

        private Long id;
        private String name;
        private String email;

        public UserInfo() {}

        public UserInfo(Long id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    // ─── Auth Response (success) ───────────────────────────────────
    public static class AuthResponse {

        private String token;
        private UserInfo user;
        private String message;

        public AuthResponse() {}

        public AuthResponse(String token, UserInfo user, String message) {
            this.token = token;
            this.user = user;
            this.message = message;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public UserInfo getUser() { return user; }
        public void setUser(UserInfo user) { this.user = user; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    // ─── Error Response ────────────────────────────────────────────
    public static class ErrorResponse {

        private String message;

        public ErrorResponse() {}

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
