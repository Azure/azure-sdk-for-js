// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listCredential,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/aiManagers/operations.js";
import type {
  AIManagersListCredentialOptionalParams,
  AIManagersListBySubscriptionOptionalParams,
  AIManagersListByResourceGroupOptionalParams,
  AIManagersDeleteOptionalParams,
  AIManagersUpdateOptionalParams,
  AIManagersCreateOrUpdateOptionalParams,
  AIManagersGetOptionalParams,
} from "../../api/aiManagers/options.js";
import type { AIManager, AIManagerPatch, CredentialResults } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AIManagers operations. */
export interface AIManagersOperations {
  /** Lists the credentials of an AI Manager. */
  listCredential: (
    resourceGroupName: string,
    aiManagerName: string,
    options?: AIManagersListCredentialOptionalParams,
  ) => Promise<CredentialResults>;
  /** List AIManager resources by subscription ID */
  listBySubscription: (
    options?: AIManagersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AIManager>;
  /** List AIManager resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AIManagersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AIManager>;
  /** Delete a AIManager */
  delete: (
    resourceGroupName: string,
    aiManagerName: string,
    options?: AIManagersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a AIManager */
  update: (
    resourceGroupName: string,
    aiManagerName: string,
    properties: AIManagerPatch,
    options?: AIManagersUpdateOptionalParams,
  ) => Promise<AIManager>;
  /** Create a AIManager */
  createOrUpdate: (
    resourceGroupName: string,
    aiManagerName: string,
    resource: AIManager,
    options?: AIManagersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AIManager>, AIManager>;
  /** Get a AIManager */
  get: (
    resourceGroupName: string,
    aiManagerName: string,
    options?: AIManagersGetOptionalParams,
  ) => Promise<AIManager>;
}
function _getAIManagers(context: ContainerServiceContext) {
  return {
    listCredential: (
      resourceGroupName: string,
      aiManagerName: string,
      options?: AIManagersListCredentialOptionalParams,
    ) => listCredential(context, resourceGroupName, aiManagerName, options),
    listBySubscription: (options?: AIManagersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AIManagersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      aiManagerName: string,
      options?: AIManagersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiManagerName, options),
    update: (
      resourceGroupName: string,
      aiManagerName: string,
      properties: AIManagerPatch,
      options?: AIManagersUpdateOptionalParams,
    ) => update(context, resourceGroupName, aiManagerName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      aiManagerName: string,
      resource: AIManager,
      options?: AIManagersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, aiManagerName, resource, options),
    get: (
      resourceGroupName: string,
      aiManagerName: string,
      options?: AIManagersGetOptionalParams,
    ) => get(context, resourceGroupName, aiManagerName, options),
  };
}
export function _getAIManagersOperations(context: ContainerServiceContext): AIManagersOperations {
  return {
    ..._getAIManagers(context),
  };
}
