package com.colin.example.websocket_react.beans;

public class ConnectionBean {

    private String message;

    public ConnectionBean(String message) {
        this.message = message;
    }

    public ConnectionBean() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
