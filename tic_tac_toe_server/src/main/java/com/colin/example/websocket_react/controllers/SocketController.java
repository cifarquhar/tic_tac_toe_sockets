package com.colin.example.websocket_react.controllers;

import com.colin.example.websocket_react.beans.MessageBean;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public MessageBean send(@Payload MessageBean message){
        System.out.println(message.getName() + ": " + message.getMessage());

        MessageBean reply = new MessageBean();

        reply.setName(message.getName());

        reply.setMessage("Message got lost on the way...");

        return reply;
    }

}
