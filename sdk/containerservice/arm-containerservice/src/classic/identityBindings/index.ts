// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listByManagedCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/identityBindings/operations.js";
import type {
  IdentityBindingsListByManagedClusterOptionalParams,
  IdentityBindingsDeleteOptionalParams,
  IdentityBindingsCreateOrUpdateOptionalParams,
  IdentityBindingsGetOptionalParams,
} from "../../api/identityBindings/options.js";
import type { IdentityBinding } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IdentityBindings operations. */
export interface IdentityBindingsOperations {
  /** Gets a list of identity bindings in the specified managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: IdentityBindingsListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<IdentityBinding>;
  /** Deletes an identity binding in the specified managed cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    identityBindingName: string,
    options?: IdentityBindingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    identityBindingName: string,
    options?: IdentityBindingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    identityBindingName: string,
    options?: IdentityBindingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an identity binding in the specified managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    identityBindingName: string,
    parameters: IdentityBinding,
    options?: IdentityBindingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IdentityBinding>, IdentityBinding>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    identityBindingName: string,
    parameters: IdentityBinding,
    options?: IdentityBindingsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IdentityBinding>, IdentityBinding>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    identityBindingName: string,
    parameters: IdentityBinding,
    options?: IdentityBindingsCreateOrUpdateOptionalParams,
  ) => Promise<IdentityBinding>;
  /** Gets the specified Identity Binding. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    identityBindingName: string,
    options?: IdentityBindingsGetOptionalParams,
  ) => Promise<IdentityBinding>;
}

function _getIdentityBindings(context: ContainerServiceContext) {
  return {
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: IdentityBindingsListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      identityBindingName: string,
      options?: IdentityBindingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, identityBindingName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      identityBindingName: string,
      options?: IdentityBindingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        identityBindingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      identityBindingName: string,
      options?: IdentityBindingsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, identityBindingName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      identityBindingName: string,
      parameters: IdentityBinding,
      options?: IdentityBindingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        identityBindingName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      identityBindingName: string,
      parameters: IdentityBinding,
      options?: IdentityBindingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        identityBindingName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      identityBindingName: string,
      parameters: IdentityBinding,
      options?: IdentityBindingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        identityBindingName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      identityBindingName: string,
      options?: IdentityBindingsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, identityBindingName, options),
  };
}

export function _getIdentityBindingsOperations(
  context: ContainerServiceContext,
): IdentityBindingsOperations {
  return {
    ..._getIdentityBindings(context),
  };
}
