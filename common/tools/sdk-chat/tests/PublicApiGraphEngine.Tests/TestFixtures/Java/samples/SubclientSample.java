package com.test.sample;

public class SubclientSample {
    public static void main(String[] args) {
        SampleClient client = new SampleClient("https://example.com");
        client.getWidgetsClient().listWidgets();
    }
}
