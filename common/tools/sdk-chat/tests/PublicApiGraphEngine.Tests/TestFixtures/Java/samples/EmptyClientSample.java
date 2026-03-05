package com.test.sample;

public class EmptyClientSample {
    public static void main(String[] args) {
        EmptyClient client = new EmptyClient("https://example.com");
        client.getWidgetsClient().listWidgets();
    }
}
