import { WorkloadsContext as Client } from "../index.js";
import { OperationStatusResult, SAPCentralServerInstance, UpdateSAPCentralInstanceRequest, _SAPCentralServerInstanceListResult } from "../../models/models.js";
import { SAPCentralServerInstancesStopOptionalParams, SAPCentralServerInstancesStartOptionalParams, SAPCentralServerInstancesListOptionalParams, SAPCentralServerInstancesDeleteOptionalParams, SAPCentralServerInstancesUpdateOptionalParams, SAPCentralServerInstancesCreateOptionalParams, SAPCentralServerInstancesGetOptionalParams } from "./options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";
export declare function _stopSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesStopOptionalParams): StreamableMethod;
export declare function _stopDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Stops the SAP Central Services Instance. */
export declare function stop(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _startSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesStartOptionalParams): StreamableMethod;
export declare function _startDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Starts the SAP Central Services Instance. */
export declare function start(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesStartOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _listSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPCentralServerInstancesListOptionalParams): StreamableMethod;
export declare function _listDeserialize(result: PathUncheckedResponse): Promise<_SAPCentralServerInstanceListResult>;
/** Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource. */
export declare function list(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPCentralServerInstancesListOptionalParams): PagedAsyncIterableIterator<SAPCentralServerInstance>;
export declare function _$deleteSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Deletes the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesDeleteOptionalParams): PollerLike<OperationState<void>, void>;
export declare function _updateSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, properties: UpdateSAPCentralInstanceRequest, options?: SAPCentralServerInstancesUpdateOptionalParams): StreamableMethod;
export declare function _updateDeserialize(result: PathUncheckedResponse): Promise<SAPCentralServerInstance>;
/** Updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource. */
export declare function update(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, properties: UpdateSAPCentralInstanceRequest, options?: SAPCentralServerInstancesUpdateOptionalParams): Promise<SAPCentralServerInstance>;
export declare function _createSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, resource: SAPCentralServerInstance, options?: SAPCentralServerInstancesCreateOptionalParams): StreamableMethod;
export declare function _createDeserialize(result: PathUncheckedResponse): Promise<SAPCentralServerInstance>;
/** Creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. */
export declare function create(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, resource: SAPCentralServerInstance, options?: SAPCentralServerInstancesCreateOptionalParams): PollerLike<OperationState<SAPCentralServerInstance>, SAPCentralServerInstance>;
export declare function _getSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<SAPCentralServerInstance>;
/** Gets the SAP Central Services Instance resource. */
export declare function get(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, centralInstanceName: string, options?: SAPCentralServerInstancesGetOptionalParams): Promise<SAPCentralServerInstance>;
//# sourceMappingURL=operations.d.ts.map