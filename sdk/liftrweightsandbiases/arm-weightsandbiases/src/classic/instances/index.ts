// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WeightsAndBiasesContext } from "../../api/weightsAndBiasesContext.js";
import {
  InstanceResource,
  InstanceResourceUpdate,
} from "../../models/models.js";
import {
  InstancesListBySubscriptionOptionalParams,
  InstancesListByResourceGroupOptionalParams,
  InstancesDeleteOptionalParams,
  InstancesUpdateOptionalParams,
  InstancesCreateOrUpdateOptionalParams,
  InstancesGetOptionalParams,
} from "../../api/instances/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/instances/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Instances operations. */
export interface InstancesOperations {
  /** List InstanceResource resources by subscription ID */
  listBySubscription: (
    options?: InstancesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceResource>;
  /** List InstanceResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: InstancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InstanceResource>;
  /** Delete a InstanceResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    instancename: string,
    options?: InstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a InstanceResource */
  update: (
    resourceGroupName: string,
    instancename: string,
    properties: InstanceResourceUpdate,
    options?: InstancesUpdateOptionalParams,
  ) => Promise<InstanceResource>;
  /** Create a InstanceResource */
  createOrUpdate: (
    resourceGroupName: string,
    instancename: string,
    resource: InstanceResource,
    options?: InstancesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InstanceResource>, InstanceResource>;
  /** Get a InstanceResource */
  get: (
    resourceGroupName: string,
    instancename: string,
    options?: InstancesGetOptionalParams,
  ) => Promise<InstanceResource>;
}

function _getInstances(context: WeightsAndBiasesContext) {
  return {
    listBySubscription: (options?: InstancesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: InstancesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      instancename: string,
      options?: InstancesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, instancename, options),
    update: (
      resourceGroupName: string,
      instancename: string,
      properties: InstanceResourceUpdate,
      options?: InstancesUpdateOptionalParams,
    ) => update(context, resourceGroupName, instancename, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      instancename: string,
      resource: InstanceResource,
      options?: InstancesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        instancename,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      instancename: string,
      options?: InstancesGetOptionalParams,
    ) => get(context, resourceGroupName, instancename, options),
  };
}

export function _getInstancesOperations(
  context: WeightsAndBiasesContext,
): InstancesOperations {
  return {
    ..._getInstances(context),
  };
}
