// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CustomLocationsManagementContext } from "../../api/customLocationsManagementContext.js";
import {
  listByCustomLocationID,
  $delete,
  createOrUpdate,
  get,
  update,
} from "../../api/resourceSyncRules/operations.js";
import type {
  ResourceSyncRulesListByCustomLocationIDOptionalParams,
  ResourceSyncRulesDeleteOptionalParams,
  ResourceSyncRulesCreateOrUpdateOptionalParams,
  ResourceSyncRulesGetOptionalParams,
  ResourceSyncRulesUpdateOptionalParams,
} from "../../api/resourceSyncRules/options.js";
import type { ResourceSyncRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ResourceSyncRules operations. */
export interface ResourceSyncRulesOperations {
  /** Gets a list of Resource Sync Rules in the specified subscription. The operation returns properties of each Resource Sync Rule */
  listByCustomLocationID: (
    resourceGroupName: string,
    resourceName: string,
    options?: ResourceSyncRulesListByCustomLocationIDOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceSyncRule>;
  /** Deletes the Resource Sync Rule with the specified Resource Sync Rule Name, Custom Location Resource Name, Resource Group, and Subscription Id. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    options?: ResourceSyncRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Resource Sync Rule in the parent Custom Location, Subscription Id and Resource Group */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    parameters: ResourceSyncRule,
    options?: ResourceSyncRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    parameters: ResourceSyncRule,
    options?: ResourceSyncRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    parameters: ResourceSyncRule,
    options?: ResourceSyncRulesCreateOrUpdateOptionalParams,
  ) => Promise<ResourceSyncRule>;
  /** Gets the details of the resourceSyncRule with a specified resource group, subscription id Custom Location resource name and Resource Sync Rule name. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    options?: ResourceSyncRulesGetOptionalParams,
  ) => Promise<ResourceSyncRule>;
  update: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    options?: ResourceSyncRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    options?: ResourceSyncRulesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    childResourceName: string,
    options?: ResourceSyncRulesUpdateOptionalParams,
  ) => Promise<ResourceSyncRule>;
}

function _getResourceSyncRules(context: CustomLocationsManagementContext) {
  return {
    listByCustomLocationID: (
      resourceGroupName: string,
      resourceName: string,
      options?: ResourceSyncRulesListByCustomLocationIDOptionalParams,
    ) => listByCustomLocationID(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      options?: ResourceSyncRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, childResourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      parameters: ResourceSyncRule,
      options?: ResourceSyncRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        childResourceName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      parameters: ResourceSyncRule,
      options?: ResourceSyncRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        childResourceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      parameters: ResourceSyncRule,
      options?: ResourceSyncRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        childResourceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      options?: ResourceSyncRulesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, childResourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      options?: ResourceSyncRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, childResourceName, options),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      options?: ResourceSyncRulesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, resourceName, childResourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      childResourceName: string,
      options?: ResourceSyncRulesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, resourceName, childResourceName, options);
    },
  };
}

export function _getResourceSyncRulesOperations(
  context: CustomLocationsManagementContext,
): ResourceSyncRulesOperations {
  return {
    ..._getResourceSyncRules(context),
  };
}
