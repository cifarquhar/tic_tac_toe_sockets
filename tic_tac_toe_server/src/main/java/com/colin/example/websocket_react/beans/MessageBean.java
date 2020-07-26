package com.colin.example.websocket_react.beans;

public class MessageBean {

    private String type;
    private String player;
    private int playerNumber;
    private int indexToUpdate;

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public int getPlayerNumber() {
        return playerNumber;
    }

    public void setPlayerNumber(int playerNumber) {
        this.playerNumber = playerNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getIndexToUpdate() {
        return indexToUpdate;
    }

    public void setIndexToUpdate(int indexToUpdate) {
        this.indexToUpdate = indexToUpdate;
    }
}
