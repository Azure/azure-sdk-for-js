// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DisconnectedOperationsManagementContext } from "../../api/disconnectedOperationsManagementContext.js";
import {
  listDeploymentManifest,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/disconnectedOperations/operations.js";
import type {
  DisconnectedOperationsListDeploymentManifestOptionalParams,
  DisconnectedOperationsListBySubscriptionOptionalParams,
  DisconnectedOperationsListByResourceGroupOptionalParams,
  DisconnectedOperationsDeleteOptionalParams,
  DisconnectedOperationsUpdateOptionalParams,
  DisconnectedOperationsCreateOrUpdateOptionalParams,
  DisconnectedOperationsGetOptionalParams,
} from "../../api/disconnectedOperations/options.js";
import type {
  DisconnectedOperation,
  DisconnectedOperationCreateOrUpdate,
  DisconnectedOperationUpdate,
  DisconnectedOperationDeploymentManifest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DisconnectedOperations operations. */
export interface DisconnectedOperationsOperations {
  /** get deployment manifest. */
  listDeploymentManifest: (
    resourceGroupName: string,
    name: string,
    options?: DisconnectedOperationsListDeploymentManifestOptionalParams,
  ) => Promise<DisconnectedOperationDeploymentManifest>;
  /** List DisconnectedOperation resources by subscription ID */
  listBySubscription: (
    options?: DisconnectedOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DisconnectedOperation>;
  /** List DisconnectedOperation resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DisconnectedOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DisconnectedOperation>;
  /** Delete a DisconnectedOperation */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    options?: DisconnectedOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a DisconnectedOperation */
  update: (
    resourceGroupName: string,
    name: string,
    properties: DisconnectedOperationUpdate,
    options?: DisconnectedOperationsUpdateOptionalParams,
  ) => Promise<DisconnectedOperation>;
  /** Create a DisconnectedOperationCreateOrUpdate */
  createOrUpdate: (
    resourceGroupName: string,
    name: string,
    resource: DisconnectedOperationCreateOrUpdate,
    options?: DisconnectedOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<DisconnectedOperationCreateOrUpdate>,
    DisconnectedOperationCreateOrUpdate
  >;
  /** Get a DisconnectedOperation */
  get: (
    resourceGroupName: string,
    name: string,
    options?: DisconnectedOperationsGetOptionalParams,
  ) => Promise<DisconnectedOperation>;
}

function _getDisconnectedOperations(context: DisconnectedOperationsManagementContext) {
  return {
    listDeploymentManifest: (
      resourceGroupName: string,
      name: string,
      options?: DisconnectedOperationsListDeploymentManifestOptionalParams,
    ) => listDeploymentManifest(context, resourceGroupName, name, options),
    listBySubscription: (options?: DisconnectedOperationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DisconnectedOperationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      name: string,
      options?: DisconnectedOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, options),
    update: (
      resourceGroupName: string,
      name: string,
      properties: DisconnectedOperationUpdate,
      options?: DisconnectedOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, name, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      name: string,
      resource: DisconnectedOperationCreateOrUpdate,
      options?: DisconnectedOperationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, name, resource, options),
    get: (
      resourceGroupName: string,
      name: string,
      options?: DisconnectedOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, name, options),
  };
}

export function _getDisconnectedOperationsOperations(
  context: DisconnectedOperationsManagementContext,
): DisconnectedOperationsOperations {
  return {
    ..._getDisconnectedOperations(context),
  };
}
