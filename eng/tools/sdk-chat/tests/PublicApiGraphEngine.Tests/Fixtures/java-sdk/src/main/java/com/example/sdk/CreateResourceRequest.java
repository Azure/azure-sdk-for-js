// Copyright (c) Example Corporation.
// Licensed under the MIT License.

package com.example.sdk;

/**
 * Request object for creating a new resource.
 */
public class CreateResourceRequest {
    private String name;
    private Status initialStatus;

    /**
     * Gets the name for the new resource.
     * @return The resource name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name for the new resource.
     * @param name The resource name
     * @return This request for chaining
     */
    public CreateResourceRequest setName(String name) {
        this.name = name;
        return this;
    }

    /**
     * Gets the initial status for the new resource.
     * @return The initial status
     */
    public Status getInitialStatus() {
        return initialStatus;
    }

    /**
     * Sets the initial status for the new resource.
     * @param status The initial status
     * @return This request for chaining
     */
    public CreateResourceRequest setInitialStatus(Status status) {
        this.initialStatus = status;
        return this;
    }
}
