package com.colin.example.websocket_react.controllers;

import com.colin.example.websocket_react.beans.ConnectionBean;
import com.colin.example.websocket_react.beans.MessageBean;
import com.colin.example.websocket_react.beans.UserTracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;

@Controller
public class SocketController {

    @Autowired
    UserTracker userTracker;

    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public MessageBean send(@Payload MessageBean message){

        MessageBean response = new MessageBean();

        String nextPlayer = message.getPlayer().equals("X") ? "O" : "X";

        response.setType("turn");
        response.setPlayer(nextPlayer);
        response.setPlayerNumber(userTracker.getUserCount());
        response.setIndexToUpdate(message.getIndexToUpdate());

        return response;

    }

    @MessageMapping("/register-player")
    @SendTo("/topic/user")
    public ConnectionBean register(){
        ConnectionBean connectionBean = new ConnectionBean();

        connectionBean.setType("registration");
        connectionBean.setPlayerNumber(userTracker.getUserCount());

        return connectionBean;
    }

    @EventListener(SessionConnectEvent.class)
    public void handleConnection(SessionConnectEvent event){
        System.out.println("Received new connection from: " + event.getSource());

        userTracker.addUser();

        System.out.println("Connected users: " + userTracker.getUserCount());
    }

    @EventListener(SessionDisconnectEvent.class)
    public void handleDisconnection(SessionDisconnectEvent event){
        System.out.println("Session closed: " + event.getSource());

        userTracker.removeUser();

        System.out.println("Connected users: " + userTracker.getUserCount());
    }

}
