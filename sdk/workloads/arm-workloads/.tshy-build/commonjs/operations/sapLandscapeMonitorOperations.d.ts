import { SapLandscapeMonitorOperations } from "../operationsInterfaces/index.js";
import { WorkloadsClient } from "../workloadsClient.js";
import { SapLandscapeMonitorGetOptionalParams, SapLandscapeMonitorGetResponse, SapLandscapeMonitor, SapLandscapeMonitorCreateOptionalParams, SapLandscapeMonitorCreateResponse, SapLandscapeMonitorDeleteOptionalParams, SapLandscapeMonitorUpdateOptionalParams, SapLandscapeMonitorUpdateResponse, SapLandscapeMonitorListOptionalParams, SapLandscapeMonitorListResponse } from "../models/index.js";
/** Class containing SapLandscapeMonitorOperations operations. */
export declare class SapLandscapeMonitorOperationsImpl implements SapLandscapeMonitorOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class SapLandscapeMonitorOperations class.
     * @param client Reference to the service client
     */
    constructor(client: WorkloadsClient);
    /**
     * Gets configuration values for Single Pane Of Glass for SAP monitor for the specified subscription,
     * resource group, and resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, monitorName: string, options?: SapLandscapeMonitorGetOptionalParams): Promise<SapLandscapeMonitorGetResponse>;
    /**
     * Creates a SAP Landscape Monitor Dashboard for the specified subscription, resource group, and
     * resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param sapLandscapeMonitorParameter Request body representing a configuration for Sap Landscape
     *                                     Monitor Dashboard
     * @param options The options parameters.
     */
    create(resourceGroupName: string, monitorName: string, sapLandscapeMonitorParameter: SapLandscapeMonitor, options?: SapLandscapeMonitorCreateOptionalParams): Promise<SapLandscapeMonitorCreateResponse>;
    /**
     * Deletes a SAP Landscape Monitor Dashboard with the specified subscription, resource group, and SAP
     * monitor name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, monitorName: string, options?: SapLandscapeMonitorDeleteOptionalParams): Promise<void>;
    /**
     * Patches the SAP Landscape Monitor Dashboard for the specified subscription, resource group, and SAP
     * monitor name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param sapLandscapeMonitorParameter Request body representing a configuration for Sap Landscape
     *                                     Monitor Dashboard
     * @param options The options parameters.
     */
    update(resourceGroupName: string, monitorName: string, sapLandscapeMonitorParameter: SapLandscapeMonitor, options?: SapLandscapeMonitorUpdateOptionalParams): Promise<SapLandscapeMonitorUpdateResponse>;
    /**
     * Gets configuration values for Single Pane Of Glass for SAP monitor for the specified subscription,
     * resource group, and resource name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param monitorName Name of the SAP monitor resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, monitorName: string, options?: SapLandscapeMonitorListOptionalParams): Promise<SapLandscapeMonitorListResponse>;
}
//# sourceMappingURL=sapLandscapeMonitorOperations.d.ts.map