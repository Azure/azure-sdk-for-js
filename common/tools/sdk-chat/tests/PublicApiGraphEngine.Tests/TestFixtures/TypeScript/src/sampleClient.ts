/**
 * Sample TypeScript package for testing API graphing.
 */

import { AbortSignalLike } from '@sdk/abort-controller';

/**
 * Result status enumeration.
 */
export enum ResultStatus {
    /** Operation succeeded. */
    Success = 'success',
    /** Operation failed. */
    Failed = 'failed',
    /** Operation is pending. */
    Pending = 'pending'
}

/**
 * Represents a resource.
 */
export interface Resource {
    /** The resource ID. */
    readonly id: string;
    /** The resource name. */
    name: string;
    /** Optional tags. */
    tags?: Record<string, string>;
    /** Creation timestamp. */
    readonly createdAt?: Date;
}

/**
 * Options for creating a resource.
 */
export interface ResourceCreateOptions {
    /** The resource name. */
    name: string;
    /** Optional tags. */
    tags?: Record<string, string>;
}

/**
 * Common options for operations.
 */
export interface OperationOptions {
    /** Abort signal for cancellation. */
    abortSignal?: AbortSignalLike;
    /** Request timeout in milliseconds. */
    timeout?: number;
}

/**
 * Options for configuring SampleClient.
 */
export interface SampleClientOptions {
    /** Number of retries. Default: 3 */
    retryCount?: number;
    /** Timeout in milliseconds. Default: 30000 */
    timeout?: number;
    /** API version. Default: "2024-01-01" */
    apiVersion?: string;
}

/**
 * A sample client for testing API graphing.
 * Demonstrates public API patterns for TypeScript SDK.
 */
export class SampleClient {
    /** The service endpoint. */
    public readonly endpoint: string;

    /** Subclient for widget operations. */
    public readonly widgets: WidgetClient;
    
    private readonly options: Required<SampleClientOptions>;
    
    /**
     * Creates a new SampleClient instance.
     * @param endpoint - The service endpoint URL.
     * @param options - Optional client configuration.
     */
    constructor(endpoint: string, options?: SampleClientOptions) {
        this.endpoint = endpoint;
        this.options = {
            retryCount: options?.retryCount ?? 3,
            timeout: options?.timeout ?? 30000,
            apiVersion: options?.apiVersion ?? '2024-01-01'
        };
        this.widgets = new WidgetClient(this);
    }
    
    /**
     * Gets a resource by ID.
     * @param resourceId - The resource identifier.
     * @param options - Operation options.
     * @returns The resource.
     */
    async getResource(resourceId: string, options?: OperationOptions): Promise<Resource> {
        return { id: resourceId, name: 'Test' };
    }
    
    /**
     * Lists all resources.
     * @param filter - Optional OData filter expression.
     * @returns AsyncIterableIterator of resources.
     */
    listResources(filter?: string): AsyncIterableIterator<Resource> {
        return this.listResourcesInternal(filter);
    }
    
    private async *listResourcesInternal(filter?: string): AsyncIterableIterator<Resource> {
        yield { id: '1', name: 'Test' };
    }
    
    /**
     * Creates a new resource.
     * @param options - Creation options.
     * @returns The created resource.
     */
    async createResource(options: ResourceCreateOptions): Promise<Resource> {
        return { id: 'new', name: options.name, tags: options.tags };
    }
    
    /**
     * Deletes a resource.
     * @param resourceId - The resource to delete.
     */
    async deleteResource(resourceId: string): Promise<void> {
        // Delete implementation
    }
    
    /**
     * Updates a resource.
     * @param resourceId - The resource ID.
     * @param resource - The updated resource data.
     * @returns The updated resource.
     */
    async updateResource(resourceId: string, resource: Partial<Resource>): Promise<Resource> {
        return { id: resourceId, name: resource.name ?? 'Updated' };
    }
    
    /**
     * Creates a client from a connection string.
     * @param connectionString - The connection string.
     * @param options - Optional client configuration.
     * @returns A new SampleClient instance.
     */
    static fromConnectionString(connectionString: string, options?: SampleClientOptions): SampleClient {
        // Parse connection string
        return new SampleClient('https://example.com', options);
    }
}

/**
 * Subclient for widget operations.
 */
export class WidgetClient {
    private readonly parent: SampleClient;

    constructor(parent: SampleClient) {
        this.parent = parent;
    }

    /**
     * Lists widgets.
     */
    listWidgets(): string[] {
        return [this.parent.endpoint];
    }
}

/**
 * Client with no methods, only subclient properties.
 */
export class EmptyClient {
    public readonly widgets: WidgetClient;

    constructor(endpoint: string) {
        this.widgets = new WidgetClient(new SampleClient(endpoint));
    }
}

/**
 * Interface for recommendations operations.
 */
export interface RecommendationsClient {
    /**
     * Lists recommendations.
     */
    listRecommendations(): string[];
}

/**
 * Implementation for recommendations operations.
 */
export class RecommendationsClientImpl implements RecommendationsClient {
    private readonly parent: SampleClient;

    constructor(parent: SampleClient) {
        this.parent = parent;
    }

    /**
     * Lists recommendations.
     */
    listRecommendations(): string[] {
        return [`${this.parent.endpoint}/recommendations`];
    }
}

/**
 * Client with interface-typed subclient.
 */
export class InterfaceClient {
    public readonly recommendations: RecommendationsClient;

    constructor(endpoint: string) {
        this.recommendations = new RecommendationsClientImpl(new SampleClient(endpoint));
    }
}

/**
 * Interface for resource operations.
 */
export interface ResourceOperations {
    /**
     * Gets a resource.
     * @param id - The resource ID.
     */
    get(id: string): Promise<Resource>;
    
    /**
     * Deletes a resource.
     * @param id - The resource ID.
     */
    delete(id: string): Promise<void>;
    
    /**
     * Updates a resource.
     * @param id - The resource ID.
     * @param resource - The updated resource.
     */
    update(id: string, resource: Partial<Resource>): Promise<Resource>;
}

/**
 * A generic result wrapper.
 */
export type Result<T> = 
    | { status: ResultStatus.Success; value: T }
    | { status: ResultStatus.Failed; error: string }
    | { status: ResultStatus.Pending };

/**
 * Factory function to create a client with defaults.
 * @param endpoint - The service endpoint.
 * @returns A configured SampleClient.
 */
export function createDefaultClient(endpoint: string): SampleClient {
    return new SampleClient(endpoint);
}

/**
 * Gets multiple resources in batch.
 * @param client - The client to use.
 * @param ids - List of resource IDs.
 * @returns Array of resources.
 */
export async function batchGetResources(client: SampleClient, ids: string[]): Promise<Resource[]> {
    return Promise.all(ids.map(id => client.getResource(id)));
}
