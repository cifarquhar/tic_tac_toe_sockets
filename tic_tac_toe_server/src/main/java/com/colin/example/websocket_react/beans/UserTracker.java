package com.colin.example.websocket_react.beans;

import org.springframework.stereotype.Component;

@Component
public class UserTracker {

    private int userCount;

    public UserTracker(int userCount) {
        this.userCount = userCount;
    }

    public UserTracker() {
    }

    public int getUserCount() {
        return userCount;
    }

    public void setUserCount(int userCount) {
        this.userCount = userCount;
    }

    public void addUser(){
        userCount++;
    }

    public void removeUser(){
        userCount--;
    }
}
