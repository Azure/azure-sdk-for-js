// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  rotateKeys,
  listAccessKeys,
  listCredential,
  listByAIManager,
  $delete,
  createOrUpdate,
  get,
} from "../../api/aiManagerNamespaces/operations.js";
import type {
  AIManagerNamespacesRotateKeysOptionalParams,
  AIManagerNamespacesListAccessKeysOptionalParams,
  AIManagerNamespacesListCredentialOptionalParams,
  AIManagerNamespacesListByAIManagerOptionalParams,
  AIManagerNamespacesDeleteOptionalParams,
  AIManagerNamespacesCreateOrUpdateOptionalParams,
  AIManagerNamespacesGetOptionalParams,
} from "../../api/aiManagerNamespaces/options.js";
import type {
  CredentialResults,
  AIManagerNamespace,
  NamespaceAccessInfo,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AIManagerNamespaces operations. */
export interface AIManagerNamespacesOperations {
  /** Rotates the namespace-scoped LLM gateway API keys. A new key is generated and installed as `primaryKey`, and the previous `primaryKey` overwrites `secondaryKey` so clients can roll over without downtime. Returns the updated access info. */
  rotateKeys: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    options?: AIManagerNamespacesRotateKeysOptionalParams,
  ) => Promise<NamespaceAccessInfo>;
  /** Returns the namespace-scoped LLM gateway endpoint and the current API keys. */
  listAccessKeys: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    options?: AIManagerNamespacesListAccessKeysOptionalParams,
  ) => Promise<NamespaceAccessInfo>;
  /** Lists the credentials of an AI Manager namespace. */
  listCredential: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    options?: AIManagerNamespacesListCredentialOptionalParams,
  ) => Promise<CredentialResults>;
  /** List AIManagerNamespace resources by AIManager */
  listByAIManager: (
    resourceGroupName: string,
    aiManagerName: string,
    options?: AIManagerNamespacesListByAIManagerOptionalParams,
  ) => PagedAsyncIterableIterator<AIManagerNamespace>;
  /** Delete a AIManagerNamespace */
  delete: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    options?: AIManagerNamespacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a AIManagerNamespace */
  createOrUpdate: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    resource: AIManagerNamespace,
    options?: AIManagerNamespacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AIManagerNamespace>, AIManagerNamespace>;
  /** Get a AIManagerNamespace */
  get: (
    resourceGroupName: string,
    aiManagerName: string,
    namespaceName: string,
    options?: AIManagerNamespacesGetOptionalParams,
  ) => Promise<AIManagerNamespace>;
}
function _getAIManagerNamespaces(context: ContainerServiceContext) {
  return {
    rotateKeys: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      options?: AIManagerNamespacesRotateKeysOptionalParams,
    ) => rotateKeys(context, resourceGroupName, aiManagerName, namespaceName, options),
    listAccessKeys: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      options?: AIManagerNamespacesListAccessKeysOptionalParams,
    ) => listAccessKeys(context, resourceGroupName, aiManagerName, namespaceName, options),
    listCredential: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      options?: AIManagerNamespacesListCredentialOptionalParams,
    ) => listCredential(context, resourceGroupName, aiManagerName, namespaceName, options),
    listByAIManager: (
      resourceGroupName: string,
      aiManagerName: string,
      options?: AIManagerNamespacesListByAIManagerOptionalParams,
    ) => listByAIManager(context, resourceGroupName, aiManagerName, options),
    delete: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      options?: AIManagerNamespacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, aiManagerName, namespaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      resource: AIManagerNamespace,
      options?: AIManagerNamespacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, aiManagerName, namespaceName, resource, options),
    get: (
      resourceGroupName: string,
      aiManagerName: string,
      namespaceName: string,
      options?: AIManagerNamespacesGetOptionalParams,
    ) => get(context, resourceGroupName, aiManagerName, namespaceName, options),
  };
}
export function _getAIManagerNamespacesOperations(
  context: ContainerServiceContext,
): AIManagerNamespacesOperations {
  return {
    ..._getAIManagerNamespaces(context),
  };
}
