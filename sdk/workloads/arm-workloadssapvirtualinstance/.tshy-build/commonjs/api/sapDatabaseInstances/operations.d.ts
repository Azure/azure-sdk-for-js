import { WorkloadsContext as Client } from "../index.js";
import { OperationStatusResult, SAPDatabaseInstance, UpdateSAPDatabaseInstanceRequest, _SAPDatabaseInstanceListResult } from "../../models/models.js";
import { SAPDatabaseInstancesStopOptionalParams, SAPDatabaseInstancesStartOptionalParams, SAPDatabaseInstancesListOptionalParams, SAPDatabaseInstancesDeleteOptionalParams, SAPDatabaseInstancesUpdateOptionalParams, SAPDatabaseInstancesCreateOptionalParams, SAPDatabaseInstancesGetOptionalParams } from "./options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";
export declare function _stopSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesStopOptionalParams): StreamableMethod;
export declare function _stopDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Stops the database instance of the SAP system. */
export declare function stop(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _startSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesStartOptionalParams): StreamableMethod;
export declare function _startDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Starts the database instance of the SAP system. */
export declare function start(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesStartOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _listSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPDatabaseInstancesListOptionalParams): StreamableMethod;
export declare function _listDeserialize(result: PathUncheckedResponse): Promise<_SAPDatabaseInstanceListResult>;
/** Lists the Database resources associated with a Virtual Instance for SAP solutions resource. */
export declare function list(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPDatabaseInstancesListOptionalParams): PagedAsyncIterableIterator<SAPDatabaseInstance>;
export declare function _$deleteSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesDeleteOptionalParams): PollerLike<OperationState<void>, void>;
export declare function _updateSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, properties: UpdateSAPDatabaseInstanceRequest, options?: SAPDatabaseInstancesUpdateOptionalParams): StreamableMethod;
export declare function _updateDeserialize(result: PathUncheckedResponse): Promise<SAPDatabaseInstance>;
/** Updates the Database resource. */
export declare function update(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, properties: UpdateSAPDatabaseInstanceRequest, options?: SAPDatabaseInstancesUpdateOptionalParams): Promise<SAPDatabaseInstance>;
export declare function _createSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, resource: SAPDatabaseInstance, options?: SAPDatabaseInstancesCreateOptionalParams): StreamableMethod;
export declare function _createDeserialize(result: PathUncheckedResponse): Promise<SAPDatabaseInstance>;
/** Creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
export declare function create(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, resource: SAPDatabaseInstance, options?: SAPDatabaseInstancesCreateOptionalParams): PollerLike<OperationState<SAPDatabaseInstance>, SAPDatabaseInstance>;
export declare function _getSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<SAPDatabaseInstance>;
/** Gets the SAP Database Instance resource. */
export declare function get(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, databaseInstanceName: string, options?: SAPDatabaseInstancesGetOptionalParams): Promise<SAPDatabaseInstance>;
//# sourceMappingURL=operations.d.ts.map