// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  triggerInventoryUpload,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/neuroShieldProtectedResources/operations.js";
import type {
  NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams,
  NeuroShieldProtectedResourcesListOptionalParams,
  NeuroShieldProtectedResourcesDeleteOptionalParams,
  NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams,
  NeuroShieldProtectedResourcesGetOptionalParams,
} from "../../api/neuroShieldProtectedResources/options.js";
import type {
  NeuroShieldProtectedResource,
  NeuroShieldInventoryUploadRequestResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NeuroShieldProtectedResources operations. */
export interface NeuroShieldProtectedResourcesOperations {
  /** Requests a fresh inventory upload from the Neuron agents associated with a protected resource. */
  triggerInventoryUpload: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    options?: NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams,
  ) => Promise<NeuroShieldInventoryUploadRequestResult>;
  /** Lists all protected resources under a NeuroShield resource. */
  list: (
    resourceGroupName: string,
    neuroShieldName: string,
    options?: NeuroShieldProtectedResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldProtectedResource>;
  /** Deletes a protected resource under a NeuroShield resource. */
  delete: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    options?: NeuroShieldProtectedResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a protected resource under a NeuroShield resource. */
  createOrUpdate: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    resource: NeuroShieldProtectedResource,
    options?: NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NeuroShieldProtectedResource>, NeuroShieldProtectedResource>;
  /** Gets a protected resource under a NeuroShield resource. */
  get: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    options?: NeuroShieldProtectedResourcesGetOptionalParams,
  ) => Promise<NeuroShieldProtectedResource>;
}

function _getNeuroShieldProtectedResources(context: NetworkSecurityManagementContext) {
  return {
    triggerInventoryUpload: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      options?: NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams,
    ) =>
      triggerInventoryUpload(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        options,
      ),
    list: (
      resourceGroupName: string,
      neuroShieldName: string,
      options?: NeuroShieldProtectedResourcesListOptionalParams,
    ) => list(context, resourceGroupName, neuroShieldName, options),
    delete: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      options?: NeuroShieldProtectedResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, neuroShieldName, protectedResourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      resource: NeuroShieldProtectedResource,
      options?: NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      options?: NeuroShieldProtectedResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, neuroShieldName, protectedResourceName, options),
  };
}

export function _getNeuroShieldProtectedResourcesOperations(
  context: NetworkSecurityManagementContext,
): NeuroShieldProtectedResourcesOperations {
  return {
    ..._getNeuroShieldProtectedResources(context),
  };
}
