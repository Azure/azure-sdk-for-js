// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import {
  listVersions,
  listConnections,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/horizonDbParameterGroups/operations.js";
import type {
  HorizonDbParameterGroupsListVersionsOptionalParams,
  HorizonDbParameterGroupsListConnectionsOptionalParams,
  HorizonDbParameterGroupsListBySubscriptionOptionalParams,
  HorizonDbParameterGroupsListByResourceGroupOptionalParams,
  HorizonDbParameterGroupsDeleteOptionalParams,
  HorizonDbParameterGroupsUpdateOptionalParams,
  HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
  HorizonDbParameterGroupsGetOptionalParams,
} from "../../api/horizonDbParameterGroups/options.js";
import type {
  HorizonDbParameterGroup,
  HorizonDbParameterGroupForPatchUpdate,
  HorizonDbParameterGroupConnectionProperties,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HorizonDbParameterGroups operations. */
export interface HorizonDbParameterGroupsOperations {
  /** Lists parameter groups filtered by version number. */
  listVersions: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: HorizonDbParameterGroupsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbParameterGroup>;
  /** Gets all connections to a parameter group. */
  listConnections: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: HorizonDbParameterGroupsListConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbParameterGroupConnectionProperties>;
  /** Lists all HorizonDb parameter groups in a subscription. */
  listBySubscription: (
    options?: HorizonDbParameterGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbParameterGroup>;
  /** Lists all HorizonDb parameter groups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: HorizonDbParameterGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbParameterGroup>;
  /** Deletes a HorizonDb parameter group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: HorizonDbParameterGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: HorizonDbParameterGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: HorizonDbParameterGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing HorizonDb parameter group. */
  update: (
    resourceGroupName: string,
    parameterGroupName: string,
    properties: HorizonDbParameterGroupForPatchUpdate,
    options?: HorizonDbParameterGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    parameterGroupName: string,
    properties: HorizonDbParameterGroupForPatchUpdate,
    options?: HorizonDbParameterGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    parameterGroupName: string,
    properties: HorizonDbParameterGroupForPatchUpdate,
    options?: HorizonDbParameterGroupsUpdateOptionalParams,
  ) => Promise<HorizonDbParameterGroup>;
  /** Creates a new HorizonDb parameter group or updates an existing parameter group. */
  createOrUpdate: (
    resourceGroupName: string,
    parameterGroupName: string,
    resource: HorizonDbParameterGroup,
    options?: HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    parameterGroupName: string,
    resource: HorizonDbParameterGroup,
    options?: HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    parameterGroupName: string,
    resource: HorizonDbParameterGroup,
    options?: HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
  ) => Promise<HorizonDbParameterGroup>;
  /** Gets information about a HorizonDb parameter group. */
  get: (
    resourceGroupName: string,
    parameterGroupName: string,
    options?: HorizonDbParameterGroupsGetOptionalParams,
  ) => Promise<HorizonDbParameterGroup>;
}

function _getHorizonDbParameterGroups(context: HorizonDbContext) {
  return {
    listVersions: (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: HorizonDbParameterGroupsListVersionsOptionalParams,
    ) => listVersions(context, resourceGroupName, parameterGroupName, options),
    listConnections: (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: HorizonDbParameterGroupsListConnectionsOptionalParams,
    ) => listConnections(context, resourceGroupName, parameterGroupName, options),
    listBySubscription: (options?: HorizonDbParameterGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: HorizonDbParameterGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: HorizonDbParameterGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, parameterGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: HorizonDbParameterGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, parameterGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      parameterGroupName: string,
      options?: HorizonDbParameterGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, parameterGroupName, options);
    },
    update: (
      resourceGroupName: string,
      parameterGroupName: string,
      properties: HorizonDbParameterGroupForPatchUpdate,
      options?: HorizonDbParameterGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, parameterGroupName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      parameterGroupName: string,
      properties: HorizonDbParameterGroupForPatchUpdate,
      options?: HorizonDbParameterGroupsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, parameterGroupName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      parameterGroupName: string,
      properties: HorizonDbParameterGroupForPatchUpdate,
      options?: HorizonDbParameterGroupsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, parameterGroupName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      parameterGroupName: string,
      resource: HorizonDbParameterGroup,
      options?: HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, parameterGroupName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      parameterGroupName: string,
      resource: HorizonDbParameterGroup,
      options?: HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        parameterGroupName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      parameterGroupName: string,
      resource: HorizonDbParameterGroup,
      options?: HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
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
      options?: HorizonDbParameterGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, parameterGroupName, options),
  };
}

export function _getHorizonDbParameterGroupsOperations(
  context: HorizonDbContext,
): HorizonDbParameterGroupsOperations {
  return {
    ..._getHorizonDbParameterGroups(context),
  };
}
