import { Service } from "../operationsInterfaces/index.js";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import { StorageClient } from "../storageClient.js";
import { BlobServiceProperties, ServiceSetPropertiesOptionalParams, ServiceSetPropertiesResponse, ServiceGetPropertiesOptionalParams, ServiceGetPropertiesResponse, ServiceGetStatisticsOptionalParams, ServiceGetStatisticsResponse, ServiceListContainersSegmentOptionalParams, ServiceListContainersSegmentResponse, KeyInfo, ServiceGetUserDelegationKeyOptionalParams, ServiceGetUserDelegationKeyResponse, ServiceGetAccountInfoOptionalParams, ServiceGetAccountInfoResponse, ServiceSubmitBatchOptionalParams, ServiceSubmitBatchResponse, ServiceFilterBlobsOptionalParams, ServiceFilterBlobsResponse } from "../models/index.js";
/** Class containing Service operations. */
export declare class ServiceImpl implements Service {
    private readonly client;
    /**
     * Initialize a new instance of the class Service class.
     * @param client Reference to the service client
     */
    constructor(client: StorageClient);
    /**
     * Sets properties for a storage account's Blob service endpoint, including properties for Storage
     * Analytics and CORS (Cross-Origin Resource Sharing) rules
     * @param blobServiceProperties The StorageService properties.
     * @param options The options parameters.
     */
    setProperties(blobServiceProperties: BlobServiceProperties, options?: ServiceSetPropertiesOptionalParams): Promise<ServiceSetPropertiesResponse>;
    /**
     * gets the properties of a storage account's Blob service, including properties for Storage Analytics
     * and CORS (Cross-Origin Resource Sharing) rules.
     * @param options The options parameters.
     */
    getProperties(options?: ServiceGetPropertiesOptionalParams): Promise<ServiceGetPropertiesResponse>;
    /**
     * Retrieves statistics related to replication for the Blob service. It is only available on the
     * secondary location endpoint when read-access geo-redundant replication is enabled for the storage
     * account.
     * @param options The options parameters.
     */
    getStatistics(options?: ServiceGetStatisticsOptionalParams): Promise<ServiceGetStatisticsResponse>;
    /**
     * The List Containers Segment operation returns a list of the containers under the specified account
     * @param options The options parameters.
     */
    listContainersSegment(options?: ServiceListContainersSegmentOptionalParams): Promise<ServiceListContainersSegmentResponse>;
    /**
     * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
     * bearer token authentication.
     * @param keyInfo Key information
     * @param options The options parameters.
     */
    getUserDelegationKey(keyInfo: KeyInfo, options?: ServiceGetUserDelegationKeyOptionalParams): Promise<ServiceGetUserDelegationKeyResponse>;
    /**
     * Returns the sku name and account kind
     * @param options The options parameters.
     */
    getAccountInfo(options?: ServiceGetAccountInfoOptionalParams): Promise<ServiceGetAccountInfoResponse>;
    /**
     * The Batch operation allows multiple API calls to be embedded into a single HTTP request.
     * @param contentLength The length of the request.
     * @param multipartContentType Required. The value of this header must be multipart/mixed with a batch
     *                             boundary. Example header value: multipart/mixed; boundary=batch_<GUID>
     * @param body Initial data
     * @param options The options parameters.
     */
    submitBatch(contentLength: number, multipartContentType: string, body: coreRestPipeline.RequestBodyType, options?: ServiceSubmitBatchOptionalParams): Promise<ServiceSubmitBatchResponse>;
    /**
     * The Filter Blobs operation enables callers to list blobs across all containers whose tags match a
     * given search expression.  Filter blobs searches across all containers within a storage account but
     * can be scoped within the expression to a single container.
     * @param options The options parameters.
     */
    filterBlobs(options?: ServiceFilterBlobsOptionalParams): Promise<ServiceFilterBlobsResponse>;
}
//# sourceMappingURL=service.d.ts.map