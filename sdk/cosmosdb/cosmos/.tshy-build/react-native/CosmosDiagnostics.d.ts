import type { OperationType, ResourceType } from "./common/index.js";
import type { CosmosDbDiagnosticLevel } from "./diagnostics/CosmosDbDiagnosticLevel.js";
import type { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";
import type { ConsistencyLevel } from "./documents/index.js";
/**
 *  * This is a Cosmos Diagnostic type that holds collected diagnostic information during a client operations. ie. Item.read(), Container.create().
 * It has three members -
 * 1. `clientSideRequestStatistics` member contains aggregate diagnostic information, including -
 *   - metadata lookups. Here all the server requests, apart from the final intended resource are considered as metadata calls.
 *    i.e. for item.read(id), if the client makes server call to discover endpoints it would be considered as metadata call.
 *   - retries
 *   - endpoints contacted.
 *   - request, response payload stats.
 *   - gatewayStatistics - Information corresponding to main operation. For example during Item.read(), the client might perform many operations
 *    i.e. metadata lookup etc, but gatewayStatistics represents the diagnostics information for actual read operation.
 *
 * 2. diagnosticNode - Is a tree like structure which captures detailed diagnostic information. By default it is disabled, and is intended to be
 * used only for debugging on non production environments. The kind of details captured in diagnosticNode is controlled by `CosmosDbDiagnosticLevel`.
 * - CosmosDbDiagnosticLevel.info - Is default value. In this level only clientSideRequestStatistics are captured. Is is meant for production environments.
 * - CosmosDbDiagnosticLevel.debug - Captures diagnosticNode and clientConfig. No request and response payloads are captured. Is not meant to be used
 * in production environment.
 * - CosmosDbDiagnosticLevel.debug-unsafe - In addition to data captured in CosmosDbDiagnosticLevel.debug, also captures request and response payloads.
 * Is not meant to be used in production environment.
 * 3. clientConfig - Captures information related to how client was configured during initialization.
 */
export declare class CosmosDiagnostics {
    readonly clientSideRequestStatistics: ClientSideRequestStatistics;
    readonly diagnosticNode: DiagnosticNode;
    readonly clientConfig?: ClientConfigDiagnostic;
}
/**
 * This type holds information related to initialization of `CosmosClient`
 */
export type ClientConfigDiagnostic = {
    /**
     * End point configured during client initialization.
     */
    endpoint: string;
    /**
     * True if `resourceTokens` was supplied during client initialization.
     */
    resourceTokensConfigured: boolean;
    /**
     * True if `tokenProvider` was supplied during client initialization.
     */
    tokenProviderConfigured: boolean;
    /**
     * True if `aadCredentials` was supplied during client initialization.
     */
    aadCredentialsConfigured: boolean;
    /**
     * True if `connectionPolicy` was supplied during client initialization.
     */
    connectionPolicyConfigured: boolean;
    /**
     * `consistencyLevel` supplied during client initialization.
     */
    consistencyLevel?: keyof typeof ConsistencyLevel;
    /**
     * `defaultHeaders` supplied during client initialization.
     */
    defaultHeaders?: {
        [key: string]: any;
    };
    /**
     * True if `connectionPolicy` were supplied during client initialization.
     */
    agentConfigured: boolean;
    /**
     * `userAgentSuffix` supplied during client initialization.
     */
    userAgentSuffix: string;
    /**
     * `diagnosticLevel` supplied during client initialization.
     */
    diagnosticLevel?: CosmosDbDiagnosticLevel;
    /**
     * True if `plugins` were supplied during client initialization.
     */
    pluginsConfigured: boolean;
    /**
     * SDK version
     */
    sDKVersion: string;
};
/**
 * This type contains diagnostic information regarding all metadata request to server during an CosmosDB client operation.
 */
export type MetadataLookUpDiagnostics = {
    metadataLookups: MetadataLookUpDiagnostic[];
};
/**
 * This type captures diagnostic information regarding retries attempt during an CosmosDB client operation.
 */
export type RetryDiagnostics = {
    failedAttempts: FailedRequestAttemptDiagnostic[];
};
export type GatewayStatistics = {
    /**
     * This is the activityId for request, made to server for fetching the requested resource. (As opposed to other potential meta data requests)
     */
    activityId?: string;
    correlatedActivityId?: string;
    startTimeUTCInMs: number;
    durationInMs: number;
    operationType?: OperationType;
    resourceType?: ResourceType;
    statusCode?: number;
    subStatusCode?: number;
    requestCharge?: number;
    requestPayloadLengthInBytes: number;
    responsePayloadLengthInBytes: number;
};
/**
 * This type contains diagnostic information regarding a single metadata request to server.
 */
export interface MetadataLookUpDiagnostic {
    activityId: string;
    startTimeUTCInMs: number;
    durationInMs: number;
    operationType?: OperationType;
    resourceType?: ResourceType;
    metaDataType: MetadataLookUpType;
    requestPayloadLengthInBytes: number;
    responsePayloadLengthInBytes: number;
}
/**
 * This type captures diagnostic information regarding a failed request to server api.
 */
export interface FailedRequestAttemptDiagnostic {
    attemptNumber: number;
    activityId: string;
    startTimeUTCInMs: number;
    durationInMs: number;
    operationType?: OperationType;
    resourceType?: ResourceType;
    statusCode: number;
    substatusCode?: number;
    requestPayloadLengthInBytes: number;
    responsePayloadLengthInBytes: number;
}
/**
 * @hidden
 * Represents the diagnostics information for encryption operations.
 */
export interface EncryptionDiagnostics {
    /** shows start time, duration and properties count for encryption*/
    encryptContent: Record<string, any>;
    /** shows start time, duration and properties count for decryption*/
    decryptContent: Record<string, any>;
    /** represents total processing duration for encryption/decryption*/
    processingDurationInMs: number;
}
/**
 * This is enum for Type of Metadata lookups possible.
 */
export declare enum MetadataLookUpType {
    PartitionKeyRangeLookUp = "PARTITION_KEY_RANGE_LOOK_UP",
    DatabaseAccountLookUp = "DATABASE_ACCOUNT_LOOK_UP",
    QueryPlanLookUp = "QUERY_PLAN_LOOK_UP",
    DatabaseLookUp = "DATABASE_LOOK_UP",
    ContainerLookUp = "CONTAINER_LOOK_UP"
}
/**
 * This is a collection type for all client side diagnostic information.
 */
export type ClientSideRequestStatistics = {
    /**
     * This is the UTC timestamp for start of client operation.
     */
    requestStartTimeUTCInMs: number;
    /**
     * This is the duration in milli seconds taken by client operation.
     */
    requestDurationInMs: number;
    /**
     * This is the list of Location Endpoints contacted during the client operation.
     */
    locationEndpointsContacted: string[];
    /**
     * This field captures diagnostic information for retries happened during client operation.
     */
    retryDiagnostics: RetryDiagnostics;
    /**
     * This field captures diagnostic information for meta data lookups happened during client operation.
     */
    metadataDiagnostics: MetadataLookUpDiagnostics;
    /**
     * These are the statistics for main point look operation.
     */
    gatewayStatistics: GatewayStatistics[];
    /**
     * This is the cumulated Request Payload Length n bytes, this includes metadata calls along with the main operation.
     */
    totalRequestPayloadLengthInBytes: number;
    /**
     * This is the cumulated Response Payload Length n bytes, this includes metadata calls along with the main operation.
     */
    totalResponsePayloadLengthInBytes: number;
    /**
     * This field captures diagnostic information for encryption/decryption happened during CRUD operation if encryption is enabled.
     */
    encryptionDiagnostics?: EncryptionDiagnostics;
};
export declare function getRootNode(node: DiagnosticNodeInternal): DiagnosticNodeInternal;
/**
 * Represents a tree like structure, for capturing diagnostic information.
 */
export interface DiagnosticNode {
    id: string;
    nodeType: string;
    children: DiagnosticNode[];
    data: {
        [key: string]: any;
    };
    startTimeUTCInMs: number;
    durationInMs: number;
}
//# sourceMappingURL=CosmosDiagnostics.d.ts.map