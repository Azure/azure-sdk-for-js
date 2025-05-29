import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SAPCentralInstances } from "../operationsInterfaces/index.js";
import { WorkloadsClient } from "../workloadsClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { SAPCentralServerInstance, SAPCentralInstancesListOptionalParams, SAPCentralInstancesGetOptionalParams, SAPCentralInstancesGetResponse, SAPCentralInstancesCreateOptionalParams, SAPCentralInstancesCreateResponse, SAPCentralInstancesUpdateOptionalParams, SAPCentralInstancesUpdateResponse, SAPCentralInstancesDeleteOptionalParams, SAPCentralInstancesDeleteResponse, SAPCentralInstancesStartInstanceOptionalParams, SAPCentralInstancesStartInstanceResponse, SAPCentralInstancesStopInstanceOptionalParams, SAPCentralInstancesStopInstanceResponse } from "../models/index.js";
/** Class containing SAPCentralInstances operations. */
export declare class SAPCentralInstancesImpl implements SAPCentralInstances {
    private readonly client;
    /**
     * Initialize a new instance of the class SAPCentralInstances class.
     * @param client Reference to the service client
     */
    constructor(client: WorkloadsClient);
    /**
     * Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions
     * resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    list(resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPCentralInstancesListOptionalParams): PagedAsyncIterableIterator<SAPCentralServerInstance>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the SAP Central Services Instance resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesGetOptionalParams): Promise<SAPCentralInstancesGetResponse>;
    /**
     * Creates the SAP Central Services Instance resource. <br><br>This will be used by service only. PUT
     * operation on this resource by end user will return a Bad Request error.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginCreate(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesCreateOptionalParams): Promise<SimplePollerLike<OperationState<SAPCentralInstancesCreateResponse>, SAPCentralInstancesCreateResponse>>;
    /**
     * Creates the SAP Central Services Instance resource. <br><br>This will be used by service only. PUT
     * operation on this resource by end user will return a Bad Request error.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginCreateAndWait(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesCreateOptionalParams): Promise<SAPCentralInstancesCreateResponse>;
    /**
     * Updates the SAP Central Services Instance resource. <br><br>This can be used to update tags on the
     * resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesUpdateOptionalParams): Promise<SimplePollerLike<OperationState<SAPCentralInstancesUpdateResponse>, SAPCentralInstancesUpdateResponse>>;
    /**
     * Updates the SAP Central Services Instance resource. <br><br>This can be used to update tags on the
     * resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesUpdateOptionalParams): Promise<SAPCentralInstancesUpdateResponse>;
    /**
     * Deletes the SAP Central Services Instance resource. <br><br>This will be used by service only.
     * Delete operation on this resource by end user will return a Bad Request error. You can delete the
     * parent resource, which is the Virtual Instance for SAP solutions resource, using the delete
     * operation on it.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<SAPCentralInstancesDeleteResponse>, SAPCentralInstancesDeleteResponse>>;
    /**
     * Deletes the SAP Central Services Instance resource. <br><br>This will be used by service only.
     * Delete operation on this resource by end user will return a Bad Request error. You can delete the
     * parent resource, which is the Virtual Instance for SAP solutions resource, using the delete
     * operation on it.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesDeleteOptionalParams): Promise<SAPCentralInstancesDeleteResponse>;
    /**
     * Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions
     * resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param options The options parameters.
     */
    private _list;
    /**
     * Starts the SAP Central Services Instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginStartInstance(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesStartInstanceOptionalParams): Promise<SimplePollerLike<OperationState<SAPCentralInstancesStartInstanceResponse>, SAPCentralInstancesStartInstanceResponse>>;
    /**
     * Starts the SAP Central Services Instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginStartInstanceAndWait(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesStartInstanceOptionalParams): Promise<SAPCentralInstancesStartInstanceResponse>;
    /**
     * Stops the SAP Central Services Instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginStopInstance(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesStopInstanceOptionalParams): Promise<SimplePollerLike<OperationState<SAPCentralInstancesStopInstanceResponse>, SAPCentralInstancesStopInstanceResponse>>;
    /**
     * Stops the SAP Central Services Instance.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param centralInstanceName Central Services Instance resource name string modeled as parameter for
     *                            auto generation to work correctly.
     * @param options The options parameters.
     */
    beginStopInstanceAndWait(resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralInstancesStopInstanceOptionalParams): Promise<SAPCentralInstancesStopInstanceResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param sapVirtualInstanceName The name of the Virtual Instances for SAP solutions resource
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=sAPCentralInstances.d.ts.map