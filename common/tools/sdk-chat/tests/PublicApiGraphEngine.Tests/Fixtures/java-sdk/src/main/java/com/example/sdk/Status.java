// Copyright (c) Example Corporation.
// Licensed under the MIT License.

package com.example.sdk;

/**
 * Resource status enumeration with associated metadata.
 * This is the type of enum that causes issues with JavaParser validators.
 */
public enum Status {
    /**
     * Resource is active and available.
     */
    ACTIVE("active", 1),

    /**
     * Resource is inactive but retained.
     */
    INACTIVE("inactive", 2),

    /**
     * Resource is pending activation.
     */
    PENDING("pending", 0),

    /**
     * Resource has been deleted.
     */
    DELETED("deleted", -1);

    private final String value;
    private final int priority;

    Status(String value, int priority) {
        this.value = value;
        this.priority = priority;
    }

    /**
     * Gets the string value of the status.
     * @return The status value
     */
    public String getValue() {
        return value;
    }

    /**
     * Gets the priority ordering of this status.
     * @return The priority value
     */
    public int getPriority() {
        return priority;
    }

    /**
     * Parses a status from its string value.
     * @param value The string value to parse
     * @return The matching status
     * @throws IllegalArgumentException if no matching status exists
     */
    public static Status fromValue(String value) {
        for (Status status : values()) {
            if (status.value.equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + value);
    }
}
