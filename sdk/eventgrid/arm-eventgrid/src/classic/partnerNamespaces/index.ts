// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  regenerateKey,
  listSharedAccessKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/partnerNamespaces/operations.js";
import type {
  PartnerNamespacesRegenerateKeyOptionalParams,
  PartnerNamespacesListSharedAccessKeysOptionalParams,
  PartnerNamespacesListBySubscriptionOptionalParams,
  PartnerNamespacesListByResourceGroupOptionalParams,
  PartnerNamespacesDeleteOptionalParams,
  PartnerNamespacesUpdateOptionalParams,
  PartnerNamespacesCreateOrUpdateOptionalParams,
  PartnerNamespacesGetOptionalParams,
} from "../../api/partnerNamespaces/options.js";
import type {
  PartnerNamespace,
  PartnerNamespaceUpdateParameters,
  PartnerNamespaceSharedAccessKeys,
  PartnerNamespaceRegenerateKeyRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PartnerNamespaces operations. */
export interface PartnerNamespacesOperations {
  /** Regenerate a shared access key for a partner namespace. */
  regenerateKey: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    regenerateKeyRequest: PartnerNamespaceRegenerateKeyRequest,
    options?: PartnerNamespacesRegenerateKeyOptionalParams,
  ) => Promise<PartnerNamespaceSharedAccessKeys>;
  /** List the two keys used to publish to a partner namespace. */
  listSharedAccessKeys: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    options?: PartnerNamespacesListSharedAccessKeysOptionalParams,
  ) => Promise<PartnerNamespaceSharedAccessKeys>;
  /** List all the partner namespaces under an Azure subscription. */
  listBySubscription: (
    options?: PartnerNamespacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerNamespace>;
  /** List all the partner namespaces under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PartnerNamespacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerNamespace>;
  /** Delete existing partner namespace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    options?: PartnerNamespacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    options?: PartnerNamespacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    options?: PartnerNamespacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a partner namespace with the specified parameters. */
  update: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
    options?: PartnerNamespacesUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerNamespace>, PartnerNamespace>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
    options?: PartnerNamespacesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerNamespace>, PartnerNamespace>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
    options?: PartnerNamespacesUpdateOptionalParams,
  ) => Promise<PartnerNamespace>;
  /** Asynchronously creates a new partner namespace with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    partnerNamespaceInfo: PartnerNamespace,
    options?: PartnerNamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PartnerNamespace>, PartnerNamespace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    partnerNamespaceInfo: PartnerNamespace,
    options?: PartnerNamespacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PartnerNamespace>, PartnerNamespace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    partnerNamespaceInfo: PartnerNamespace,
    options?: PartnerNamespacesCreateOrUpdateOptionalParams,
  ) => Promise<PartnerNamespace>;
  /** Get properties of a partner namespace. */
  get: (
    resourceGroupName: string,
    partnerNamespaceName: string,
    options?: PartnerNamespacesGetOptionalParams,
  ) => Promise<PartnerNamespace>;
}

function _getPartnerNamespaces(context: EventGridManagementContext) {
  return {
    regenerateKey: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      regenerateKeyRequest: PartnerNamespaceRegenerateKeyRequest,
      options?: PartnerNamespacesRegenerateKeyOptionalParams,
    ) =>
      regenerateKey(
        context,
        resourceGroupName,
        partnerNamespaceName,
        regenerateKeyRequest,
        options,
      ),
    listSharedAccessKeys: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      options?: PartnerNamespacesListSharedAccessKeysOptionalParams,
    ) => listSharedAccessKeys(context, resourceGroupName, partnerNamespaceName, options),
    listBySubscription: (options?: PartnerNamespacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PartnerNamespacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      options?: PartnerNamespacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, partnerNamespaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      options?: PartnerNamespacesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, partnerNamespaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      options?: PartnerNamespacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, partnerNamespaceName, options);
    },
    update: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
      options?: PartnerNamespacesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceUpdateParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
      options?: PartnerNamespacesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
      options?: PartnerNamespacesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      partnerNamespaceInfo: PartnerNamespace,
      options?: PartnerNamespacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceInfo,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      partnerNamespaceInfo: PartnerNamespace,
      options?: PartnerNamespacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      partnerNamespaceName: string,
      partnerNamespaceInfo: PartnerNamespace,
      options?: PartnerNamespacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      partnerNamespaceName: string,
      options?: PartnerNamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, partnerNamespaceName, options),
  };
}

export function _getPartnerNamespacesOperations(
  context: EventGridManagementContext,
): PartnerNamespacesOperations {
  return {
    ..._getPartnerNamespaces(context),
  };
}
