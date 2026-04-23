// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listCredential,
  listByManagedCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedNamespaces/operations.js";
import type {
  ManagedNamespacesListCredentialOptionalParams,
  ManagedNamespacesListByManagedClusterOptionalParams,
  ManagedNamespacesDeleteOptionalParams,
  ManagedNamespacesUpdateOptionalParams,
  ManagedNamespacesCreateOrUpdateOptionalParams,
  ManagedNamespacesGetOptionalParams,
} from "../../api/managedNamespaces/options.js";
import type { TagsObject, CredentialResults, ManagedNamespace } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedNamespaces operations. */
export interface ManagedNamespacesOperations {
  /** Lists the credentials of a namespace. */
  listCredential: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    options?: ManagedNamespacesListCredentialOptionalParams,
  ) => Promise<CredentialResults>;
  /** Gets a list of managed namespaces in the specified managed cluster. */
  listByManagedCluster: (
    resourceGroupName: string,
    resourceName: string,
    options?: ManagedNamespacesListByManagedClusterOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedNamespace>;
  /** Deletes a namespace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    options?: ManagedNamespacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    options?: ManagedNamespacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    options?: ManagedNamespacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags on a managed namespace. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    parameters: TagsObject,
    options?: ManagedNamespacesUpdateOptionalParams,
  ) => Promise<ManagedNamespace>;
  /** Creates or updates a namespace managed by ARM for the specified managed cluster. Users can configure aspects like resource quotas, network ingress/egress policies, and more. See aka.ms/aks/managed-namespaces for more details. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    parameters: ManagedNamespace,
    options?: ManagedNamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedNamespace>, ManagedNamespace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    parameters: ManagedNamespace,
    options?: ManagedNamespacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedNamespace>, ManagedNamespace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    parameters: ManagedNamespace,
    options?: ManagedNamespacesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedNamespace>;
  /** Gets the specified namespace of a managed cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    managedNamespaceName: string,
    options?: ManagedNamespacesGetOptionalParams,
  ) => Promise<ManagedNamespace>;
}

function _getManagedNamespaces(context: ContainerServiceContext) {
  return {
    listCredential: (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      options?: ManagedNamespacesListCredentialOptionalParams,
    ) => listCredential(context, resourceGroupName, resourceName, managedNamespaceName, options),
    listByManagedCluster: (
      resourceGroupName: string,
      resourceName: string,
      options?: ManagedNamespacesListByManagedClusterOptionalParams,
    ) => listByManagedCluster(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      options?: ManagedNamespacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, managedNamespaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      options?: ManagedNamespacesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        managedNamespaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      options?: ManagedNamespacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, managedNamespaceName, options);
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      parameters: TagsObject,
      options?: ManagedNamespacesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, resourceName, managedNamespaceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      parameters: ManagedNamespace,
      options?: ManagedNamespacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        managedNamespaceName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      parameters: ManagedNamespace,
      options?: ManagedNamespacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        managedNamespaceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      parameters: ManagedNamespace,
      options?: ManagedNamespacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        managedNamespaceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      managedNamespaceName: string,
      options?: ManagedNamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, managedNamespaceName, options),
  };
}

export function _getManagedNamespacesOperations(
  context: ContainerServiceContext,
): ManagedNamespacesOperations {
  return {
    ..._getManagedNamespaces(context),
  };
}
