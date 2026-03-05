// Copyright (c) Test Corporation.
// Sample Java package for testing API graphing.

package com.test.sample;

import java.util.List;

/**
 * Subclient for widget operations.
 */
public class WidgetsClient {
    private final SampleClient parent;

    WidgetsClient(SampleClient parent) {
        this.parent = parent;
    }

    /**
     * Lists widgets.
     *
     * @return A list of widgets.
     */
    public List<String> listWidgets() {
        return List.of(parent.getEndpoint());
    }
}
