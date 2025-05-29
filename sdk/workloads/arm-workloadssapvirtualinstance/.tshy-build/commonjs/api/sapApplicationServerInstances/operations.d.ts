import { WorkloadsContext as Client } from "../index.js";
import { OperationStatusResult, SAPApplicationServerInstance, UpdateSAPApplicationInstanceRequest, _SAPApplicationServerInstanceListResult } from "../../models/models.js";
import { SAPApplicationServerInstancesStopOptionalParams, SAPApplicationServerInstancesStartOptionalParams, SAPApplicationServerInstancesListOptionalParams, SAPApplicationServerInstancesDeleteOptionalParams, SAPApplicationServerInstancesUpdateOptionalParams, SAPApplicationServerInstancesCreateOptionalParams, SAPApplicationServerInstancesGetOptionalParams } from "./options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";
export declare function _stopSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesStopOptionalParams): StreamableMethod;
export declare function _stopDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Stops the SAP Application Server Instance. */
export declare function stop(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _startSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesStartOptionalParams): StreamableMethod;
export declare function _startDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Starts the SAP Application Server Instance. */
export declare function start(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesStartOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _listSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPApplicationServerInstancesListOptionalParams): StreamableMethod;
export declare function _listDeserialize(result: PathUncheckedResponse): Promise<_SAPApplicationServerInstanceListResult>;
/** Lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource. */
export declare function list(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPApplicationServerInstancesListOptionalParams): PagedAsyncIterableIterator<SAPApplicationServerInstance>;
export declare function _$deleteSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Deletes the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This operation will be used by service only. Delete by end user will return a Bad Request error. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesDeleteOptionalParams): PollerLike<OperationState<void>, void>;
export declare function _updateSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, properties: UpdateSAPApplicationInstanceRequest, options?: SAPApplicationServerInstancesUpdateOptionalParams): StreamableMethod;
export declare function _updateDeserialize(result: PathUncheckedResponse): Promise<SAPApplicationServerInstance>;
/** Puts the SAP Application Server Instance resource. */
export declare function update(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, properties: UpdateSAPApplicationInstanceRequest, options?: SAPApplicationServerInstancesUpdateOptionalParams): Promise<SAPApplicationServerInstance>;
export declare function _createSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, resource: SAPApplicationServerInstance, options?: SAPApplicationServerInstancesCreateOptionalParams): StreamableMethod;
export declare function _createDeserialize(result: PathUncheckedResponse): Promise<SAPApplicationServerInstance>;
/** Puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
export declare function create(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, resource: SAPApplicationServerInstance, options?: SAPApplicationServerInstancesCreateOptionalParams): PollerLike<OperationState<SAPApplicationServerInstance>, SAPApplicationServerInstance>;
export declare function _getSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<SAPApplicationServerInstance>;
/** Gets the SAP Application Server Instance corresponding to the Virtual Instance for SAP solutions resource. */
export declare function get(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesGetOptionalParams): Promise<SAPApplicationServerInstance>;
//# sourceMappingURL=operations.d.ts.map