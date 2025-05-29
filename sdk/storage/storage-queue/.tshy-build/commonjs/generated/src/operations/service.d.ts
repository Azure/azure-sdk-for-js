import { Service } from "../operationsInterfaces/index.js";
import { StorageClient } from "../storageClient.js";
import { QueueServiceProperties, ServiceSetPropertiesOptionalParams, ServiceSetPropertiesResponse, ServiceGetPropertiesOptionalParams, ServiceGetPropertiesResponse, ServiceGetStatisticsOptionalParams, ServiceGetStatisticsResponse, ServiceListQueuesSegmentOptionalParams, ServiceListQueuesSegmentResponse } from "../models/index.js";
/** Class containing Service operations. */
export declare class ServiceImpl implements Service {
    private readonly client;
    /**
     * Initialize a new instance of the class Service class.
     * @param client Reference to the service client
     */
    constructor(client: StorageClient);
    /**
     * Sets properties for a storage account's Queue service endpoint, including properties for Storage
     * Analytics and CORS (Cross-Origin Resource Sharing) rules
     * @param properties The StorageService properties.
     * @param options The options parameters.
     */
    setProperties(properties: QueueServiceProperties, options?: ServiceSetPropertiesOptionalParams): Promise<ServiceSetPropertiesResponse>;
    /**
     * gets the properties of a storage account's Queue service, including properties for Storage Analytics
     * and CORS (Cross-Origin Resource Sharing) rules.
     * @param options The options parameters.
     */
    getProperties(options?: ServiceGetPropertiesOptionalParams): Promise<ServiceGetPropertiesResponse>;
    /**
     * Retrieves statistics related to replication for the Queue service. It is only available on the
     * secondary location endpoint when read-access geo-redundant replication is enabled for the storage
     * account.
     * @param options The options parameters.
     */
    getStatistics(options?: ServiceGetStatisticsOptionalParams): Promise<ServiceGetStatisticsResponse>;
    /**
     * The List Queues Segment operation returns a list of the queues under the specified account
     * @param options The options parameters.
     */
    listQueuesSegment(options?: ServiceListQueuesSegmentOptionalParams): Promise<ServiceListQueuesSegmentResponse>;
}
//# sourceMappingURL=service.d.ts.map