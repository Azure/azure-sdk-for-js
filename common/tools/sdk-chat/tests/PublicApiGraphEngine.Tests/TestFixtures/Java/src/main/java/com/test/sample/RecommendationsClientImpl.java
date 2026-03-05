// Copyright (c) Test Corporation.
// Sample Java package for testing API graphing.

package com.test.sample;

import java.util.List;

/**
 * Implementation for recommendations operations.
 */
public class RecommendationsClientImpl implements RecommendationsClient {
    private final SampleClient parent;

    public RecommendationsClientImpl(SampleClient parent) {
        this.parent = parent;
    }

    @Override
    public List<String> listRecommendations() {
        return List.of(parent.getEndpoint() + "/recommendations");
    }
}
