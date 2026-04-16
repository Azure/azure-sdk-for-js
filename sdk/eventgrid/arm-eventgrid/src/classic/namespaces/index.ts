// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import {
  validateCustomDomainOwnership,
  regenerateKey,
  listSharedAccessKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/namespaces/operations.js";
import type {
  NamespacesValidateCustomDomainOwnershipOptionalParams,
  NamespacesRegenerateKeyOptionalParams,
  NamespacesListSharedAccessKeysOptionalParams,
  NamespacesListBySubscriptionOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
  NamespacesDeleteOptionalParams,
  NamespacesUpdateOptionalParams,
  NamespacesCreateOrUpdateOptionalParams,
  NamespacesGetOptionalParams,
} from "../../api/namespaces/options.js";
import type {
  Namespace,
  NamespaceUpdateParameters,
  NamespaceSharedAccessKeys,
  NamespaceRegenerateKeyRequest,
  CustomDomainOwnershipValidationResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Namespaces operations. */
export interface NamespacesOperations {
  /** Performs ownership validation via checking TXT records for all custom domains in a namespace. */
  validateCustomDomainOwnership: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesValidateCustomDomainOwnershipOptionalParams,
  ) => PollerLike<
    OperationState<CustomDomainOwnershipValidationResult>,
    CustomDomainOwnershipValidationResult
  >;
  /** @deprecated use validateCustomDomainOwnership instead */
  beginValidateCustomDomainOwnership: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesValidateCustomDomainOwnershipOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CustomDomainOwnershipValidationResult>,
      CustomDomainOwnershipValidationResult
    >
  >;
  /** @deprecated use validateCustomDomainOwnership instead */
  beginValidateCustomDomainOwnershipAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesValidateCustomDomainOwnershipOptionalParams,
  ) => Promise<CustomDomainOwnershipValidationResult>;
  /** Regenerate a shared access key for a namespace. */
  regenerateKey: (
    resourceGroupName: string,
    namespaceName: string,
    regenerateKeyRequest: NamespaceRegenerateKeyRequest,
    options?: NamespacesRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<NamespaceSharedAccessKeys>, NamespaceSharedAccessKeys>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKey: (
    resourceGroupName: string,
    namespaceName: string,
    regenerateKeyRequest: NamespaceRegenerateKeyRequest,
    options?: NamespacesRegenerateKeyOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NamespaceSharedAccessKeys>, NamespaceSharedAccessKeys>
  >;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKeyAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    regenerateKeyRequest: NamespaceRegenerateKeyRequest,
    options?: NamespacesRegenerateKeyOptionalParams,
  ) => Promise<NamespaceSharedAccessKeys>;
  /** List the two keys used to publish to a namespace. */
  listSharedAccessKeys: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesListSharedAccessKeysOptionalParams,
  ) => Promise<NamespaceSharedAccessKeys>;
  /** List all the namespaces under an Azure subscription. */
  listBySubscription: (
    options?: NamespacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Namespace>;
  /** List all the namespaces under a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NamespacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Namespace>;
  /** Delete existing namespace. */
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Asynchronously updates a namespace with the specified parameters. */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    namespaceUpdateParameters: NamespaceUpdateParameters,
    options?: NamespacesUpdateOptionalParams,
  ) => PollerLike<OperationState<Namespace>, Namespace>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    namespaceUpdateParameters: NamespaceUpdateParameters,
    options?: NamespacesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Namespace>, Namespace>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    namespaceUpdateParameters: NamespaceUpdateParameters,
    options?: NamespacesUpdateOptionalParams,
  ) => Promise<Namespace>;
  /** Asynchronously creates or updates a new namespace with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    namespaceInfo: Namespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Namespace>, Namespace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    namespaceInfo: Namespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Namespace>, Namespace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    namespaceName: string,
    namespaceInfo: Namespace,
    options?: NamespacesCreateOrUpdateOptionalParams,
  ) => Promise<Namespace>;
  /** Get properties of a namespace. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespacesGetOptionalParams,
  ) => Promise<Namespace>;
}

function _getNamespaces(context: EventGridManagementContext) {
  return {
    validateCustomDomainOwnership: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesValidateCustomDomainOwnershipOptionalParams,
    ) => validateCustomDomainOwnership(context, resourceGroupName, namespaceName, options),
    beginValidateCustomDomainOwnership: async (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesValidateCustomDomainOwnershipOptionalParams,
    ) => {
      const poller = validateCustomDomainOwnership(
        context,
        resourceGroupName,
        namespaceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateCustomDomainOwnershipAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesValidateCustomDomainOwnershipOptionalParams,
    ) => {
      return await validateCustomDomainOwnership(
        context,
        resourceGroupName,
        namespaceName,
        options,
      );
    },
    regenerateKey: (
      resourceGroupName: string,
      namespaceName: string,
      regenerateKeyRequest: NamespaceRegenerateKeyRequest,
      options?: NamespacesRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, namespaceName, regenerateKeyRequest, options),
    beginRegenerateKey: async (
      resourceGroupName: string,
      namespaceName: string,
      regenerateKeyRequest: NamespaceRegenerateKeyRequest,
      options?: NamespacesRegenerateKeyOptionalParams,
    ) => {
      const poller = regenerateKey(
        context,
        resourceGroupName,
        namespaceName,
        regenerateKeyRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateKeyAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      regenerateKeyRequest: NamespaceRegenerateKeyRequest,
      options?: NamespacesRegenerateKeyOptionalParams,
    ) => {
      return await regenerateKey(
        context,
        resourceGroupName,
        namespaceName,
        regenerateKeyRequest,
        options,
      );
    },
    listSharedAccessKeys: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesListSharedAccessKeysOptionalParams,
    ) => listSharedAccessKeys(context, resourceGroupName, namespaceName, options),
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
    beginDelete: async (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, namespaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, namespaceName, options);
    },
    update: (
      resourceGroupName: string,
      namespaceName: string,
      namespaceUpdateParameters: NamespaceUpdateParameters,
      options?: NamespacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, namespaceUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      namespaceUpdateParameters: NamespaceUpdateParameters,
      options?: NamespacesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        namespaceName,
        namespaceUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      namespaceUpdateParameters: NamespaceUpdateParameters,
      options?: NamespacesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        namespaceName,
        namespaceUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      namespaceInfo: Namespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, namespaceInfo, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      namespaceName: string,
      namespaceInfo: Namespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        namespaceInfo,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      namespaceName: string,
      namespaceInfo: Namespace,
      options?: NamespacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        namespaceName,
        namespaceInfo,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, options),
  };
}

export function _getNamespacesOperations(
  context: EventGridManagementContext,
): NamespacesOperations {
  return {
    ..._getNamespaces(context),
  };
}
