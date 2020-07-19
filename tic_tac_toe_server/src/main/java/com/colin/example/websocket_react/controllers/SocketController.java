package com.colin.example.websocket_react.controllers;

import com.colin.example.websocket_react.beans.ConnectionBean;
import com.colin.example.websocket_react.beans.MessageBean;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
public class SocketController {

    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public MessageBean send(@Payload MessageBean message){

        MessageBean response = new MessageBean();

        String nextPlayer = message.getPlayer().equals("X") ? "O" : "X";

        response.setPlayer(nextPlayer);

        return response;

    }

    @EventListener(SessionConnectEvent.class)
    public ConnectionBean handleConnection(SessionConnectEvent event){
        System.out.println("Received new connection from: " + event.getSource());

        ConnectionBean response = new ConnectionBean("You're connected!");

        return response;
    }

    @EventListener(SessionDisconnectEvent.class)
    public ConnectionBean handleDisconnection(SessionDisconnectEvent event){
        System.out.println("Session closed: " + event.getSource());

        ConnectionBean response = new ConnectionBean("Disconnected... bye!");

        return response;
    }

}
