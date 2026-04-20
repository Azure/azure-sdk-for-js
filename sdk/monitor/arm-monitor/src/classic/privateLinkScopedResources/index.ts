// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  listByPrivateLinkScope,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateLinkScopedResources/operations.js";
import type {
  PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
  PrivateLinkScopedResourcesDeleteOptionalParams,
  PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  PrivateLinkScopedResourcesGetOptionalParams,
} from "../../api/privateLinkScopedResources/options.js";
import type { MicrosoftPrivateLinkScopesScopedResource } from "../../models/microsoft/privateLinkScopes/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateLinkScopedResources operations. */
export interface PrivateLinkScopedResourcesOperations {
  /** Gets all scoped resources on a private link scope. */
  listByPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftPrivateLinkScopesScopedResource>;
  /** Deletes an Azure monitor scoped resource with a given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    scopeName: string,
    name: string,
    options?: PrivateLinkScopedResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    scopeName: string,
    name: string,
    options?: PrivateLinkScopedResourcesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    scopeName: string,
    name: string,
    options?: PrivateLinkScopedResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Add an Azure monitor scoped resource in the private link scope. */
  createOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    name: string,
    parameters: MicrosoftPrivateLinkScopesScopedResource,
    options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<MicrosoftPrivateLinkScopesScopedResource>,
    MicrosoftPrivateLinkScopesScopedResource
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    scopeName: string,
    name: string,
    parameters: MicrosoftPrivateLinkScopesScopedResource,
    options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MicrosoftPrivateLinkScopesScopedResource>,
      MicrosoftPrivateLinkScopesScopedResource
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    scopeName: string,
    name: string,
    parameters: MicrosoftPrivateLinkScopesScopedResource,
    options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftPrivateLinkScopesScopedResource>;
  /** Gets a scoped resource in a private link scope. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    name: string,
    options?: PrivateLinkScopedResourcesGetOptionalParams,
  ) => Promise<MicrosoftPrivateLinkScopesScopedResource>;
}

function _getPrivateLinkScopedResources(context: MonitorContext) {
  return {
    listByPrivateLinkScope: (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
    ) => listByPrivateLinkScope(context, resourceGroupName, scopeName, options),
    delete: (
      resourceGroupName: string,
      scopeName: string,
      name: string,
      options?: PrivateLinkScopedResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, scopeName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      scopeName: string,
      name: string,
      options?: PrivateLinkScopedResourcesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, scopeName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      scopeName: string,
      name: string,
      options?: PrivateLinkScopedResourcesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, scopeName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      scopeName: string,
      name: string,
      parameters: MicrosoftPrivateLinkScopesScopedResource,
      options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, scopeName, name, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      scopeName: string,
      name: string,
      parameters: MicrosoftPrivateLinkScopesScopedResource,
      options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        scopeName,
        name,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      scopeName: string,
      name: string,
      parameters: MicrosoftPrivateLinkScopesScopedResource,
      options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, scopeName, name, parameters, options);
    },
    get: (
      resourceGroupName: string,
      scopeName: string,
      name: string,
      options?: PrivateLinkScopedResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, scopeName, name, options),
  };
}

export function _getPrivateLinkScopedResourcesOperations(
  context: MonitorContext,
): PrivateLinkScopedResourcesOperations {
  return {
    ..._getPrivateLinkScopedResources(context),
  };
}
