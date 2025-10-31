// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  migrate,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/namespaces/operations.js";
import type {
  NamespacesMigrateOptionalParams,
  NamespacesListBySubscriptionOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
  NamespacesDeleteOptionalParams,
  NamespacesUpdateOptionalParams,
  NamespacesCreateOrReplaceOptionalParams,
  NamespacesGetOptionalParams,
} from "../../api/namespaces/options.js";
import type { Namespace, NamespaceUpdate, NamespaceMigrateRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Namespaces operations. */
export interface NamespacesOperations {
  /** Migrate the resources into Namespace */
  migrate: (
    resourceGroupName: string,
    namespaceName: string,
    body: NamespaceMigrateRequest,
    options?: NamespacesMigrateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Namespace resources by subscription ID */
  listBySubscription: (
    options?: NamespacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Namespace>;
  /** List Namespace resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NamespacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Namespace>;
  /** Delete a Namespace */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Namespace */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    properties: NamespaceUpdate,
    options?: NamespacesUpdateOptionalParams,
  ) => PollerLike<OperationState<Namespace>, Namespace>;
  /** Create a Namespace */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    resource: Namespace,
    options?: NamespacesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<Namespace>, Namespace>;
  /** Get a Namespace */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetOptionalParams,
  ) => Promise<Namespace>;
}

function _getNamespaces(context: DeviceRegistryManagementContext) {
  return {
    migrate: (
      resourceGroupName: string,
      namespaceName: string,
      body: NamespaceMigrateRequest,
      options?: NamespacesMigrateOptionalParams,
    ) => migrate(context, resourceGroupName, namespaceName, body, options),
    listBySubscription: (options?: NamespacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NamespacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      properties: NamespaceUpdate,
      options?: NamespacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      resource: Namespace,
      options?: NamespacesCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, namespaceName, resource, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, options),
  };
}

export function _getNamespacesOperations(
  context: DeviceRegistryManagementContext,
): NamespacesOperations {
  return {
    ..._getNamespaces(context),
  };
}
