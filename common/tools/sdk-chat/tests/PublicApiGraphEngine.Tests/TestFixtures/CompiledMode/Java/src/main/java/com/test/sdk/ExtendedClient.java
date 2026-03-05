// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

package com.test.sdk;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/**
 * Client extending an external HTTP client library.
 *
 * The source parser sees the extends and import statements but cannot
 * resolve the external types without the compiled JAR:
 * - Cannot determine if HttpClient is abstract, final, or concrete
 * - Cannot enumerate methods inherited from HttpClient
 * - Cannot classify HttpRequest/HttpResponse (interface vs class vs record)
 */
public abstract class ExtendedClient extends HttpClient {
    private final String endpoint;
    private final String apiKey;

    public ExtendedClient(String endpoint, String apiKey) {
        super();
        this.endpoint = endpoint;
        this.apiKey = apiKey;
    }

    /**
     * Sends a request using external types as parameter and return.
     * HttpRequest and HttpResponse are from the external package.
     */
    public HttpResponse<String> sendRequest(HttpRequest request) {
        return null;
    }

    public String getApiKey() {
        return apiKey;
    }
}
