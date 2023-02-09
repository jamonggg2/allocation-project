package com.allocation.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/set01")
public class set01Controller extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("This is set01 popup");

        String res = "/views/set01.html";
        RequestDispatcher dispatcher = req.getRequestDispatcher(res);
        dispatcher.forward(req, resp);

    }
}

