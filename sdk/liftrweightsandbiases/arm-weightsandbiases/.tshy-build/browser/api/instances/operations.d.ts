import { WeightsAndBiasesContext as Client } from "../index.js";
import { InstanceResource, InstanceResourceUpdate, _InstanceResourceListResult } from "../../models/models.js";
import { InstancesListBySubscriptionOptionalParams, InstancesListByResourceGroupOptionalParams, InstancesDeleteOptionalParams, InstancesUpdateOptionalParams, InstancesCreateOrUpdateOptionalParams, InstancesGetOptionalParams } from "./options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";
export declare function _listBySubscriptionSend(context: Client, options?: InstancesListBySubscriptionOptionalParams): StreamableMethod;
export declare function _listBySubscriptionDeserialize(result: PathUncheckedResponse): Promise<_InstanceResourceListResult>;
/** List InstanceResource resources by subscription ID */
export declare function listBySubscription(context: Client, options?: InstancesListBySubscriptionOptionalParams): PagedAsyncIterableIterator<InstanceResource>;
export declare function _listByResourceGroupSend(context: Client, resourceGroupName: string, options?: InstancesListByResourceGroupOptionalParams): StreamableMethod;
export declare function _listByResourceGroupDeserialize(result: PathUncheckedResponse): Promise<_InstanceResourceListResult>;
/** List InstanceResource resources by resource group */
export declare function listByResourceGroup(context: Client, resourceGroupName: string, options?: InstancesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<InstanceResource>;
export declare function _$deleteSend(context: Client, resourceGroupName: string, instancename: string, options?: InstancesDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Delete a InstanceResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, resourceGroupName: string, instancename: string, options?: InstancesDeleteOptionalParams): PollerLike<OperationState<void>, void>;
export declare function _updateSend(context: Client, resourceGroupName: string, instancename: string, properties: InstanceResourceUpdate, options?: InstancesUpdateOptionalParams): StreamableMethod;
export declare function _updateDeserialize(result: PathUncheckedResponse): Promise<InstanceResource>;
/** Update a InstanceResource */
export declare function update(context: Client, resourceGroupName: string, instancename: string, properties: InstanceResourceUpdate, options?: InstancesUpdateOptionalParams): Promise<InstanceResource>;
export declare function _createOrUpdateSend(context: Client, resourceGroupName: string, instancename: string, resource: InstanceResource, options?: InstancesCreateOrUpdateOptionalParams): StreamableMethod;
export declare function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<InstanceResource>;
/** Create a InstanceResource */
export declare function createOrUpdate(context: Client, resourceGroupName: string, instancename: string, resource: InstanceResource, options?: InstancesCreateOrUpdateOptionalParams): PollerLike<OperationState<InstanceResource>, InstanceResource>;
export declare function _getSend(context: Client, resourceGroupName: string, instancename: string, options?: InstancesGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<InstanceResource>;
/** Get a InstanceResource */
export declare function get(context: Client, resourceGroupName: string, instancename: string, options?: InstancesGetOptionalParams): Promise<InstanceResource>;
//# sourceMappingURL=operations.d.ts.map