// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext } from "../../api/resourceManagementContext.js";
import {
  getAtTenantScope,
  get,
  list,
  register,
  providerPermissions,
  registerAtManagementGroupScope,
  unregister,
  listAtTenantScope,
} from "../../api/providers/operations.js";
import {
  ProvidersGetAtTenantScopeOptionalParams,
  ProvidersGetOptionalParams,
  ProvidersListOptionalParams,
  ProvidersRegisterOptionalParams,
  ProvidersProviderPermissionsOptionalParams,
  ProvidersRegisterAtManagementGroupScopeOptionalParams,
  ProvidersUnregisterOptionalParams,
  ProvidersListAtTenantScopeOptionalParams,
} from "../../api/providers/options.js";
import { Provider, ProviderPermissionListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Providers operations. */
export interface ProvidersOperations {
  /** Gets the specified resource provider at the tenant level. */
  getAtTenantScope: (
    resourceProviderNamespace: string,
    options?: ProvidersGetAtTenantScopeOptionalParams,
  ) => Promise<Provider>;
  /** Gets the specified resource provider. */
  get: (
    resourceProviderNamespace: string,
    options?: ProvidersGetOptionalParams,
  ) => Promise<Provider>;
  /** Gets all resource providers for a subscription. */
  list: (options?: ProvidersListOptionalParams) => PagedAsyncIterableIterator<Provider>;
  /** Registers a subscription with a resource provider. */
  register: (
    resourceProviderNamespace: string,
    options?: ProvidersRegisterOptionalParams,
  ) => Promise<Provider>;
  /** Get the provider permissions. */
  providerPermissions: (
    resourceProviderNamespace: string,
    options?: ProvidersProviderPermissionsOptionalParams,
  ) => Promise<ProviderPermissionListResult>;
  /** Registers a management group with a resource provider. Use this operation to register a resource provider with resource types that can be deployed at the management group scope. It does not recursively register subscriptions within the management group. Instead, you must register subscriptions individually. */
  registerAtManagementGroupScope: (
    resourceProviderNamespace: string,
    groupId: string,
    options?: ProvidersRegisterAtManagementGroupScopeOptionalParams,
  ) => Promise<void>;
  /** Unregisters a subscription from a resource provider. */
  unregister: (
    resourceProviderNamespace: string,
    options?: ProvidersUnregisterOptionalParams,
  ) => Promise<Provider>;
  /** Gets all resource providers for the tenant. */
  listAtTenantScope: (
    options?: ProvidersListAtTenantScopeOptionalParams,
  ) => PagedAsyncIterableIterator<Provider>;
}

function _getProviders(context: ResourceManagementContext) {
  return {
    getAtTenantScope: (
      resourceProviderNamespace: string,
      options?: ProvidersGetAtTenantScopeOptionalParams,
    ) => getAtTenantScope(context, resourceProviderNamespace, options),
    get: (resourceProviderNamespace: string, options?: ProvidersGetOptionalParams) =>
      get(context, resourceProviderNamespace, options),
    list: (options?: ProvidersListOptionalParams) => list(context, options),
    register: (resourceProviderNamespace: string, options?: ProvidersRegisterOptionalParams) =>
      register(context, resourceProviderNamespace, options),
    providerPermissions: (
      resourceProviderNamespace: string,
      options?: ProvidersProviderPermissionsOptionalParams,
    ) => providerPermissions(context, resourceProviderNamespace, options),
    registerAtManagementGroupScope: (
      resourceProviderNamespace: string,
      groupId: string,
      options?: ProvidersRegisterAtManagementGroupScopeOptionalParams,
    ) => registerAtManagementGroupScope(context, resourceProviderNamespace, groupId, options),
    unregister: (resourceProviderNamespace: string, options?: ProvidersUnregisterOptionalParams) =>
      unregister(context, resourceProviderNamespace, options),
    listAtTenantScope: (options?: ProvidersListAtTenantScopeOptionalParams) =>
      listAtTenantScope(context, options),
  };
}

export function _getProvidersOperations(context: ResourceManagementContext): ProvidersOperations {
  return {
    ..._getProviders(context),
  };
}
