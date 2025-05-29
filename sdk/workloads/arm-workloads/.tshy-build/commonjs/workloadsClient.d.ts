import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { SAPVirtualInstances, SAPCentralInstances, SAPDatabaseInstances, SAPApplicationServerInstances, Monitors, ProviderInstances, SapLandscapeMonitorOperations, Operations } from "./operationsInterfaces/index.js";
import { WorkloadsClientOptionalParams, SAPSizingRecommendationsOptionalParams, SAPSizingRecommendationsResponse, SAPSupportedSkuOptionalParams, SAPSupportedSkuResponse, SAPDiskConfigurationsOptionalParams, SAPDiskConfigurationsResponse, SAPAvailabilityZoneDetailsOptionalParams, SAPAvailabilityZoneDetailsResponse } from "./models/index.js";
export declare class WorkloadsClient extends coreClient.ServiceClient {
    $host: string;
    subscriptionId: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the WorkloadsClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The ID of the target subscription.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: WorkloadsClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    /**
     * Get SAP sizing recommendations by providing input SAPS for application tier and memory required for
     * database tier
     * @param location The name of Azure region.
     * @param options The options parameters.
     */
    sAPSizingRecommendations(location: string, options?: SAPSizingRecommendationsOptionalParams): Promise<SAPSizingRecommendationsResponse>;
    /**
     * Get a list of SAP supported SKUs for ASCS, Application and Database tier.
     * @param location The name of Azure region.
     * @param options The options parameters.
     */
    sAPSupportedSku(location: string, options?: SAPSupportedSkuOptionalParams): Promise<SAPSupportedSkuResponse>;
    /**
     * Get the SAP Disk Configuration Layout prod/non-prod SAP System.
     * @param location The name of Azure region.
     * @param options The options parameters.
     */
    sAPDiskConfigurations(location: string, options?: SAPDiskConfigurationsOptionalParams): Promise<SAPDiskConfigurationsResponse>;
    /**
     * Get the recommended SAP Availability Zone Pair Details for your region.
     * @param location The name of Azure region.
     * @param options The options parameters.
     */
    sAPAvailabilityZoneDetails(location: string, options?: SAPAvailabilityZoneDetailsOptionalParams): Promise<SAPAvailabilityZoneDetailsResponse>;
    sAPVirtualInstances: SAPVirtualInstances;
    sAPCentralInstances: SAPCentralInstances;
    sAPDatabaseInstances: SAPDatabaseInstances;
    sAPApplicationServerInstances: SAPApplicationServerInstances;
    monitors: Monitors;
    providerInstances: ProviderInstances;
    sapLandscapeMonitorOperations: SapLandscapeMonitorOperations;
    operations: Operations;
}
//# sourceMappingURL=workloadsClient.d.ts.map