// Copyright (c) Test Corporation.
// Sample Java package for testing API graphing.

package com.test.sample;

import java.time.OffsetDateTime;
import java.util.Map;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * A sample client for testing API graphing.
 * Demonstrates public API patterns for Java SDK.
 */
public class SampleClient implements AutoCloseable {
    
    private final String endpoint;
    private final SampleClientOptions options;
    private final WidgetsClient widgetsClient;
    
    /**
     * Creates a new SampleClient instance.
     *
     * @param endpoint The service endpoint URL.
     */
    public SampleClient(String endpoint) {
        this(endpoint, new SampleClientOptions());
    }
    
    /**
     * Creates a new SampleClient instance with options.
     *
     * @param endpoint The service endpoint URL.
     * @param options The client options.
     */
    public SampleClient(String endpoint, SampleClientOptions options) {
        this.endpoint = endpoint;
        this.options = options;
        this.widgetsClient = new WidgetsClient(this);
    }
    
    /**
     * Gets the service endpoint.
     *
     * @return The endpoint URL.
     */
    public String getEndpoint() {
        return endpoint;
    }

    /**
     * Gets the widgets subclient.
     *
     * @return The widgets client.
     */
    public WidgetsClient getWidgetsClient() {
        return widgetsClient;
    }
    
    /**
     * Gets a resource by ID.
     *
     * @param resourceId The resource identifier.
     * @return The resource.
     * @throws ResourceNotFoundException If resource doesn't exist.
     */
    public Resource getResource(String resourceId) {
        return new Resource(resourceId, "Test");
    }
    
    /**
     * Gets a resource by ID asynchronously.
     *
     * @param resourceId The resource identifier.
     * @return A future containing the resource.
     */
    public CompletableFuture<Resource> getResourceAsync(String resourceId) {
        return CompletableFuture.completedFuture(getResource(resourceId));
    }
    
    /**
     * Lists all resources.
     *
     * @return List of resources.
     */
    public List<Resource> listResources() {
        return listResources(null);
    }
    
    /**
     * Lists resources with a filter.
     *
     * @param filter Optional OData filter expression.
     * @return List of matching resources.
     */
    public List<Resource> listResources(String filter) {
        return List.of();
    }
    
    /**
     * Creates a new resource.
     *
     * @param options Creation options.
     * @return The created resource.
     */
    public Resource createResource(ResourceCreateOptions options) {
        return new Resource("new", options.getName());
    }
    
    /**
     * Deletes a resource.
     *
     * @param resourceId The resource to delete.
     */
    public void deleteResource(String resourceId) {
        // Delete implementation
    }
    
    /**
     * Updates a resource.
     *
     * @param resourceId The resource ID.
     * @param resource The updated resource data.
     * @return The updated resource.
     */
    public Resource updateResource(String resourceId, Resource resource) {
        return resource;
    }
    
    @Override
    public void close() {
        // Cleanup resources
    }
}

/**
 * Client with no methods, only subclient properties.
 */
class EmptyClient {
    private final WidgetsClient widgetsClient;

    EmptyClient(String endpoint) {
        this.widgetsClient = new WidgetsClient(new SampleClient(endpoint));
    }

    public WidgetsClient getWidgetsClient() {
        return widgetsClient;
    }
}

/**
 * Options for configuring SampleClient.
 */
public class SampleClientOptions {
    
    private int retryCount = 3;
    private long timeoutMillis = 30000;
    private ServiceVersion serviceVersion = ServiceVersion.V2024_01_01;
    
    /**
     * Gets the retry count.
     *
     * @return Number of retries.
     */
    public int getRetryCount() {
        return retryCount;
    }
    
    /**
     * Sets the retry count.
     *
     * @param retryCount Number of retries.
     * @return This options instance for chaining.
     */
    public SampleClientOptions setRetryCount(int retryCount) {
        this.retryCount = retryCount;
        return this;
    }
    
    /**
     * Gets the timeout in milliseconds.
     *
     * @return Timeout value.
     */
    public long getTimeoutMillis() {
        return timeoutMillis;
    }
    
    /**
     * Sets the timeout.
     *
     * @param timeoutMillis Timeout in milliseconds.
     * @return This options instance for chaining.
     */
    public SampleClientOptions setTimeoutMillis(long timeoutMillis) {
        this.timeoutMillis = timeoutMillis;
        return this;
    }
    
    /**
     * Gets the service version.
     *
     * @return The service version.
     */
    public ServiceVersion getServiceVersion() {
        return serviceVersion;
    }
    
    /**
     * Sets the service version.
     *
     * @param serviceVersion The service version.
     * @return This options instance for chaining.
     */
    public SampleClientOptions setServiceVersion(ServiceVersion serviceVersion) {
        this.serviceVersion = serviceVersion;
        return this;
    }
}

/**
 * Service version enumeration.
 */
public enum ServiceVersion {
    /** Version 2023-01-01 */
    V2023_01_01("2023-01-01"),
    /** Version 2024-01-01 */
    V2024_01_01("2024-01-01");
    
    private final String version;
    
    ServiceVersion(String version) {
        this.version = version;
    }
    
    /**
     * Gets the version string.
     *
     * @return The version string.
     */
    public String getVersion() {
        return version;
    }
}

/**
 * Represents a resource.
 */
public class Resource {
    
    private final String id;
    private final String name;
    private Map<String, String> tags;
    private OffsetDateTime createdAt;
    
    /**
     * Creates a new Resource.
     *
     * @param id The resource ID.
     * @param name The resource name.
     */
    public Resource(String id, String name) {
        this.id = id;
        this.name = name;
        this.createdAt = OffsetDateTime.now();
    }
    
    /**
     * Gets the resource ID.
     *
     * @return The ID.
     */
    public String getId() {
        return id;
    }
    
    /**
     * Gets the resource name.
     *
     * @return The name.
     */
    public String getName() {
        return name;
    }
    
    /**
     * Gets the resource tags.
     *
     * @return Map of tags.
     */
    public Map<String, String> getTags() {
        return tags;
    }
    
    /**
     * Sets the resource tags.
     *
     * @param tags Map of tags.
     */
    public void setTags(Map<String, String> tags) {
        this.tags = tags;
    }
    
    /**
     * Gets the creation timestamp.
     *
     * @return The created timestamp.
     */
    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}

/**
 * Options for creating a resource.
 */
public class ResourceCreateOptions {
    
    private final String name;
    private Map<String, String> tags;
    
    /**
     * Creates resource creation options.
     *
     * @param name The resource name.
     */
    public ResourceCreateOptions(String name) {
        this.name = name;
    }
    
    /**
     * Gets the resource name.
     *
     * @return The name.
     */
    public String getName() {
        return name;
    }
    
    /**
     * Gets the tags.
     *
     * @return Map of tags.
     */
    public Map<String, String> getTags() {
        return tags;
    }
    
    /**
     * Sets the tags.
     *
     * @param tags Map of tags.
     * @return This options instance for chaining.
     */
    public ResourceCreateOptions setTags(Map<String, String> tags) {
        this.tags = tags;
        return this;
    }
}

/**
 * Interface for resource operations.
 */
public interface ResourceOperations {
    
    /**
     * Gets a resource.
     *
     * @param id The resource ID.
     * @return The resource.
     */
    Resource get(String id);
    
    /**
     * Deletes a resource.
     *
     * @param id The resource ID.
     */
    void delete(String id);
    
    /**
     * Updates a resource.
     *
     * @param id The resource ID.
     * @param resource The updated resource.
     * @return The updated resource.
     */
    Resource update(String id, Resource resource);
}
