// Copyright (c) Test Corporation.
// Sample Java package for testing API graphing.

package com.test.sample;

/**
 * Client with interface-typed subclient.
 */
public class InterfaceClient {
    private final RecommendationsClient recommendationsClient;

    public InterfaceClient(String endpoint) {
        this.recommendationsClient = new RecommendationsClientImpl(new SampleClient(endpoint));
    }

    public RecommendationsClient getRecommendationsClient() {
        return recommendationsClient;
    }
}
