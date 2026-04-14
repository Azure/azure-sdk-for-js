// Copyright (c) Example Corporation.
// Licensed under the MIT License.

package com.example.sdk;

/**
 * Represents a resource in the system.
 */
public record Resource(
    /**
     * Unique identifier for the resource.
     */
    String id,
    
    /**
     * Display name of the resource.
     */
    String name,
    
    /**
     * Current status of the resource.
     */
    Status status
) {
    /**
     * Checks if the resource is in an active state.
     * @return true if active, false otherwise
     */
    public boolean isActive() {
        return status == Status.ACTIVE;
    }
}
