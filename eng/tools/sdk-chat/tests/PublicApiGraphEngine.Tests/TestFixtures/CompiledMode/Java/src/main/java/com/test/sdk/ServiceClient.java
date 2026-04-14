// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

package com.test.sdk;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * Main service client demonstrating compiled-only precision scenarios.
 *
 * <p>SOURCE LIMITATION: The source parser records method return types and
 * parameter types as strings. It cannot verify that {@code CompletableFuture}
 * is from {@code java.util.concurrent} without matching the import statement.
 * If a wildcard import {@code import java.util.concurrent.*} is used, the
 * source parser's import tracking fails because it only matches explicit imports.
 *
 * <p>COMPILED: ASM reads the method descriptor
 * {@code (Ljava/lang/String;)Ljava/util/concurrent/CompletableFuture;} which
 * contains the fully qualified type — no import guessing needed.
 */
public class ServiceClient implements Processor<String> {

    private final String endpoint;

    /**
     * Creates a new service client.
     *
     * @param endpoint The service endpoint URL.
     */
    public ServiceClient(String endpoint) {
        this.endpoint = endpoint;
    }

    /**
     * Gets a resource by ID.
     *
     * <p>SOURCE LIMITATION: The nested generic return type
     * {@code CompletableFuture<ServiceResponse<String>>} is recorded as a raw
     * string. The source parser cannot verify the nesting structure or that
     * ServiceResponse is from this package vs an external dependency.
     *
     * <p>COMPILED: The generic signature in bytecode
     * {@code (Ljava/lang/String;)Ljava/util/concurrent/CompletableFuture<Lcom/test/sdk/ServiceResponse<Ljava/lang/String;>;>;
     * } is fully resolved with package-level attribution for every type.
     *
     * @param id The resource ID.
     * @return A future containing the response.
     */
    public CompletableFuture<ServiceResponse<String>> getResource(String id) {
        return CompletableFuture.completedFuture(
            new ServiceResponse<>(id, 200, "req-1")
        );
    }

    /**
     * Lists resources with metadata.
     *
     * <p>SOURCE LIMITATION: Map&lt;String, List&lt;String&gt;&gt; is deeply nested.
     * The source parser records the raw string. It cannot determine that Map,
     * List, and String are all from java.util/java.lang (implicitly imported)
     * vs potentially shadowed local types.
     *
     * <p>COMPILED: All types in the descriptor are fully qualified.
     *
     * @param filter Filter criteria.
     * @return Metadata map.
     */
    public Map<String, List<String>> listMetadata(String filter) {
        return Map.of();
    }

    /**
     * Implements Processor&lt;String&gt;.
     *
     * <p>SOURCE LIMITATION: The source parser sees this method declaration.
     * But the Java compiler also generates a bridge method with signature
     * {@code Object process(Object)} due to generic type erasure.
     * The source parser has NO knowledge of bridge methods.
     *
     * <p>COMPILED: ASM ClassReader sees both:
     * 1. The declared method: {@code String process(String)} (ACC_PUBLIC)
     * 2. The bridge method: {@code Object process(Object)} (ACC_PUBLIC | ACC_BRIDGE | ACC_SYNTHETIC)
     * The compiled engine filters out bridge methods (ACC_BRIDGE flag),
     * producing the accurate public API.
     *
     * @param input The input string.
     * @return The processed string.
     */
    @Override
    public String process(String input) {
        return input.toUpperCase();
    }

    /**
     * Gets the endpoint.
     *
     * @return The service endpoint URL.
     */
    public String getEndpoint() {
        return endpoint;
    }

    /**
     * Inner builder class.
     *
     * <p>SOURCE LIMITATION: Nested public classes are found by source parsers,
     * but the compiled engine can additionally verify the enclosing class
     * relationship through the InnerClasses attribute in bytecode.
     */
    public static class Builder {
        private String endpoint;

        /**
         * Sets the endpoint.
         *
         * @param endpoint The service endpoint.
         * @return This builder.
         */
        public Builder endpoint(String endpoint) {
            this.endpoint = endpoint;
            return this;
        }

        /**
         * Builds the client.
         *
         * @return A new ServiceClient instance.
         */
        public ServiceClient build() {
            return new ServiceClient(endpoint);
        }
    }
}
