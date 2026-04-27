// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  listByNamespace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/permissionBindings/operations.js";
import type {
  PermissionBindingsListByNamespaceOptionalParams,
  PermissionBindingsDeleteOptionalParams,
  PermissionBindingsCreateOrUpdateOptionalParams,
  PermissionBindingsGetOptionalParams,
} from "../../api/permissionBindings/options.js";
import type { PermissionBinding } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PermissionBindings operations. */
export interface PermissionBindingsOperations {
  /** Get all the permission bindings under a namespace. */
  listByNamespace: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PermissionBindingsListByNamespaceOptionalParams,
  ) => PagedAsyncIterableIterator<PermissionBinding>;
  /** Delete an existing permission binding. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    options?: PermissionBindingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    options?: PermissionBindingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    options?: PermissionBindingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a permission binding with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    permissionBindingInfo: PermissionBinding,
    options?: PermissionBindingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PermissionBinding>, PermissionBinding>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    permissionBindingInfo: PermissionBinding,
    options?: PermissionBindingsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PermissionBinding>, PermissionBinding>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    permissionBindingInfo: PermissionBinding,
    options?: PermissionBindingsCreateOrUpdateOptionalParams,
  ) => Promise<PermissionBinding>;
  /** Get properties of a permission binding. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    permissionBindingName: string,
    options?: PermissionBindingsGetOptionalParams,
  ) => Promise<PermissionBinding>;
}

function _getPermissionBindings(context: EventGridManagementContext) {
  return {
    listByNamespace: (
      resourceGroupName: string,
      namespaceName: string,
      options?: PermissionBindingsListByNamespaceOptionalParams,
    ) => listByNamespace(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      permissionBindingName: string,
      options?: PermissionBindingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, permissionBindingName, options),
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      permissionBindingName: string,
      options?: PermissionBindingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        namespaceName,
        permissionBindingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      permissionBindingName: string,
      options?: PermissionBindingsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        namespaceName,
        permissionBindingName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      permissionBindingName: string,
      permissionBindingInfo: PermissionBinding,
      options?: PermissionBindingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        permissionBindingName,
        permissionBindingInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      permissionBindingName: string,
      permissionBindingInfo: PermissionBinding,
      options?: PermissionBindingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        permissionBindingName,
        permissionBindingInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      permissionBindingName: string,
      permissionBindingInfo: PermissionBinding,
      options?: PermissionBindingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        permissionBindingName,
        permissionBindingInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      permissionBindingName: string,
      options?: PermissionBindingsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, permissionBindingName, options),
  };
}

export function _getPermissionBindingsOperations(
  context: EventGridManagementContext,
): PermissionBindingsOperations {
  return {
    ..._getPermissionBindings(context),
  };
}
