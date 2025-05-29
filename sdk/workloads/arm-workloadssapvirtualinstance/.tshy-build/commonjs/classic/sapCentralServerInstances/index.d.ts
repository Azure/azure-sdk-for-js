import { WorkloadsContext } from "../../api/workloadsContext.js";
import { OperationStatusResult, SAPCentralServerInstance, UpdateSAPCentralInstanceRequest } from "../../models/models.js";
import { SAPCentralServerInstancesStopOptionalParams, SAPCentralServerInstancesStartOptionalParams, SAPCentralServerInstancesListOptionalParams, SAPCentralServerInstancesDeleteOptionalParams, SAPCentralServerInstancesUpdateOptionalParams, SAPCentralServerInstancesCreateOptionalParams, SAPCentralServerInstancesGetOptionalParams } from "../../api/sapCentralServerInstances/options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
/** Interface representing a SAPCentralServerInstances operations. */
export interface SAPCentralServerInstancesOperations {
    /** Stops the SAP Central Services Instance. */
    stop: (resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesStopOptionalParams) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
    /** Starts the SAP Central Services Instance. */
    start: (resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesStartOptionalParams) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
    /** Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource. */
    list: (resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPCentralServerInstancesListOptionalParams) => PagedAsyncIterableIterator<SAPCentralServerInstance>;
    /** Deletes the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it. */
    /**
     *  @fixme delete is a reserved word that cannot be used as an operation name.
     *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
     *         to the operation to override the generated name.
     */
    delete: (resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    /** Updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource. */
    update: (resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, properties: UpdateSAPCentralInstanceRequest, options?: SAPCentralServerInstancesUpdateOptionalParams) => Promise<SAPCentralServerInstance>;
    /** Creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. */
    create: (resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, resource: SAPCentralServerInstance, options?: SAPCentralServerInstancesCreateOptionalParams) => PollerLike<OperationState<SAPCentralServerInstance>, SAPCentralServerInstance>;
    /** Gets the SAP Central Services Instance resource. */
    get: (resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesGetOptionalParams) => Promise<SAPCentralServerInstance>;
}
export declare function _getSAPCentralServerInstancesOperations(context: WorkloadsContext): SAPCentralServerInstancesOperations;
//# sourceMappingURL=index.d.ts.map