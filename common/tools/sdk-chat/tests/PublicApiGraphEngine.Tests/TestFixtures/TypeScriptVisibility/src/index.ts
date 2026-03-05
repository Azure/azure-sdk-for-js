/**
 * Test fixture for verifying that the engine only collects type references
 * from public API signatures, not from private/protected implementation details.
 *
 * Pattern modeled after @azure/storage-blob:
 * - PublicClient extends BaseClient
 * - BaseClient has a protected member of type GeneratedContext
 * - GeneratedContext references InternalOperations interface
 * - InternalOperations references InternalResponseModel (type alias)
 *
 * Expected:
 * - PublicClient.referencedTypes should include PublicResponse (public method return type)
 * - PublicClient.referencedTypes should include BaseClient (extends)
 * - PublicClient.referencedTypes should NOT include GeneratedContext (only reachable via protected member)
 * - PublicClient.referencedTypes should NOT include InternalOperations (only reachable via GeneratedContext)
 * - PublicClient.referencedTypes should NOT include InternalResponseModel (only reachable via InternalOperations)
 */

// ---- Internal/generated types (not part of public API) ----

/**
 * Simulates a generated response model — like BlobDownloadResponse type alias
 * that only appears in generated operations, not in public signatures.
 */
export type InternalResponseModel = {
    body: string;
    status: number;
};

/**
 * Simulates a generated operations interface — like the 'Blob' interface in
 * generated/src/operationsInterfaces/blob that has methods returning generated types.
 */
export interface InternalOperations {
    download(): Promise<InternalResponseModel>;
    delete(): Promise<void>;
}

/**
 * Simulates a generated service client context — like the generated StorageClient.
 * Has operation-group properties that reference internal operation interfaces.
 */
export class GeneratedContext {
    public readonly ops: InternalOperations;

    constructor() {
        this.ops = {} as InternalOperations;
    }

    public getEndpoint(): string {
        return "https://internal.example.com";
    }
}

// ---- Public API types ----

/**
 * Simulates a type used only via private member of a dependency type.
 * In storage-blob, PrivateHelperConfig is analogous to types that leak
 * only through private members of types reachable via public signatures.
 */
export interface PrivateHelperConfig {
    retries: number;
    timeout: number;
}

/**
 * Public response model — used in public method signatures.
 */
export interface PublicResponse {
    data: string;
    etag: string;
}

/**
 * Public options model — used in public method signatures.
 */
export interface PublicOptions {
    timeout?: number;
}

/**
 * Base client — simulates StorageClient with a protected generated context member.
 * The protected member's type (GeneratedContext) should NOT leak into referencedTypes.
 */
export abstract class BaseClient {
    /** Public member — its type should be in referencedTypes. */
    public readonly endpoint: string;

    /**
     * Protected generated context — simulates StorageClient.storageClientContext.
     * This member's type should NOT be included in referencedTypes because
     * protected members are implementation details.
     */
    protected readonly context: GeneratedContext;

    /**
     * Private helper config — simulates internal configuration.
     * This member's type should NOT be included in referencedTypes.
     */
    private readonly helperConfig: PrivateHelperConfig;

    protected constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.context = new GeneratedContext();
        this.helperConfig = { retries: 3, timeout: 30000 };
    }
}

/**
 * Public client — simulates BlobClient.
 * Extends BaseClient (protected context member) and has public methods
 * that use PublicResponse and PublicOptions.
 */
export class PublicClient extends BaseClient {
    /**
     * A private field that should NOT leak its type into referencedTypes.
     */
    #internalState: Map<string, InternalResponseModel> = new Map();

    constructor(endpoint: string) {
        super(endpoint);
    }

    /**
     * Public method — return type should be in referencedTypes.
     */
    async download(options?: PublicOptions): Promise<PublicResponse> {
        // Implementation uses protected context (implementation detail)
        const raw = await this.context.ops.download();
        return { data: raw.body, etag: "abc" };
    }

    /**
     * Public method returning void.
     */
    async delete(): Promise<void> {
        await this.context.ops.delete();
    }
}
