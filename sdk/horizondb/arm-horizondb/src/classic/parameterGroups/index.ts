// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  listConnections,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/parameterGroups/operations.js";
import type {
  ParameterGroupsListConnectionsOptionalParams,
  ParameterGroupsListBySubscriptionOptionalParams,
  ParameterGroupsListByResourceGroupOptionalParams,
  ParameterGroupsDeleteOptionalParams,
  ParameterGroupsUpdateOptionalParams,
  ParameterGroupsCreateOrReplaceOptionalParams,
  ParameterGroupsGetOptionalParams,
} from "../../api/parameterGroups/options.js";
import type {
  ParameterGroup,
  ParameterGroupConnectionProperties,
  ParameterGroupCreateOrUpdate,
  ParameterGroupForPatchUpdateUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ParameterGroups operations. */
export interface ParameterGroupsOperations {
  /** Gets all connections to a parameter group. */
  listConnections: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: ParameterGroupsListConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<ParameterGroupConnectionProperties>;
  /** Lists all HorizonDB parameter groups in a subscription. */
  listBySubscription: (
    options?: ParameterGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ParameterGroup>;
  /** Lists all HorizonDB parameter groups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ParameterGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ParameterGroup>;
  /** Deletes a HorizonDB parameter group. Deletion fails with a conflict when the parameter group is associated with one or more pools. */
  delete: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: ParameterGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: ParameterGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: ParameterGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing HorizonDB parameter group. Each connected pool's applyMethod setting controls whether dynamic parameter changes become effective immediately or remain pending until a customer-initiated pool Restart. Static parameter changes always remain pending until a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply pending changes. The operation fails with a conflict while a previous update to this parameter group is still being processed. */
  update: (
    resourceGroupName: string,
    parameterGroupName: string,
    properties: ParameterGroupForPatchUpdateUpdate,
    options?: ParameterGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<ParameterGroup>, ParameterGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    parameterGroupName: string,
    properties: ParameterGroupForPatchUpdateUpdate,
    options?: ParameterGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ParameterGroup>, ParameterGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    parameterGroupName: string,
    properties: ParameterGroupForPatchUpdateUpdate,
    options?: ParameterGroupsUpdateOptionalParams,
  ) => Promise<ParameterGroup>;
  /** Creates a new HorizonDB parameter group or replaces an existing parameter group. */
  createOrReplace: (
    resourceGroupName: string,
    parameterGroupName: string,
    resource: ParameterGroupCreateOrUpdate,
    options?: ParameterGroupsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<ParameterGroup>, ParameterGroup>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    parameterGroupName: string,
    resource: ParameterGroupCreateOrUpdate,
    options?: ParameterGroupsCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ParameterGroup>, ParameterGroup>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    parameterGroupName: string,
    resource: ParameterGroupCreateOrUpdate,
    options?: ParameterGroupsCreateOrReplaceOptionalParams,
  ) => Promise<ParameterGroup>;
  /** Gets information about a HorizonDB parameter group. */
  get: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: ParameterGroupsGetOptionalParams,
  ) => Promise<ParameterGroup>;
}

function _getParameterGroups(context: HorizonDbContext) {
  return {
    listConnections: (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: ParameterGroupsListConnectionsOptionalParams,
    ) => listConnections(context, resourceGroupName, parameterGroupName, options),
    listBySubscription: (options?: ParameterGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ParameterGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: ParameterGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, parameterGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: ParameterGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, parameterGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: ParameterGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, parameterGroupName, options);
    },
    update: (
      resourceGroupName: string,
      parameterGroupName: string,
      properties: ParameterGroupForPatchUpdateUpdate,
      options?: ParameterGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, parameterGroupName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      parameterGroupName: string,
      properties: ParameterGroupForPatchUpdateUpdate,
      options?: ParameterGroupsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, parameterGroupName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      parameterGroupName: string,
      properties: ParameterGroupForPatchUpdateUpdate,
      options?: ParameterGroupsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, parameterGroupName, properties, options);
    },
    createOrReplace: (
      resourceGroupName: string,
      parameterGroupName: string,
      resource: ParameterGroupCreateOrUpdate,
      options?: ParameterGroupsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, parameterGroupName, resource, options),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      parameterGroupName: string,
      resource: ParameterGroupCreateOrUpdate,
      options?: ParameterGroupsCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
        context,
        resourceGroupName,
        parameterGroupName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      parameterGroupName: string,
      resource: ParameterGroupCreateOrUpdate,
      options?: ParameterGroupsCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
        context,
        resourceGroupName,
        parameterGroupName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: ParameterGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, parameterGroupName, options),
  };
}

export function _getParameterGroupsOperations(
  context: HorizonDbContext,
): ParameterGroupsOperations {
  return {
    ..._getParameterGroups(context),
  };
}
