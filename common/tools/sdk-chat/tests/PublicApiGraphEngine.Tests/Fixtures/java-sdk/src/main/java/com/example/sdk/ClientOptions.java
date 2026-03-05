// Copyright (c) Example Corporation.
// Licensed under the MIT License.

package com.example.sdk;

/**
 * Configuration options for the SDK client.
 */
public class ClientOptions {
    private String apiKey;
    private int timeoutSeconds = 30;
    private boolean enableRetry = true;

    /**
     * Gets the API key.
     * @return The API key
     */
    public String getApiKey() {
        return apiKey;
    }

    /**
     * Sets the API key for authentication.
     * @param apiKey The API key
     * @return This options object for chaining
     */
    public ClientOptions setApiKey(String apiKey) {
        this.apiKey = apiKey;
        return this;
    }

    /**
     * Gets the timeout in seconds.
     * @return The timeout value
     */
    public int getTimeoutSeconds() {
        return timeoutSeconds;
    }

    /**
     * Sets the request timeout in seconds.
     * @param seconds The timeout value
     * @return This options object for chaining
     */
    public ClientOptions setTimeoutSeconds(int seconds) {
        this.timeoutSeconds = seconds;
        return this;
    }

    /**
     * Checks if automatic retry is enabled.
     * @return true if retry is enabled
     */
    public boolean isEnableRetry() {
        return enableRetry;
    }

    /**
     * Enables or disables automatic retry on failure.
     * @param enable Whether to enable retry
     * @return This options object for chaining
     */
    public ClientOptions setEnableRetry(boolean enable) {
        this.enableRetry = enable;
        return this;
    }
}
