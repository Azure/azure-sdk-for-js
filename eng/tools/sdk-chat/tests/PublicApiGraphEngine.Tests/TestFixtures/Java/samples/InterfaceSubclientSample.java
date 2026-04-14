package com.test.sample;

public class InterfaceSubclientSample {
    public static void main(String[] args) {
        InterfaceClient client = new InterfaceClient("https://example.com");
        client.getRecommendationsClient().listRecommendations();
    }
}
