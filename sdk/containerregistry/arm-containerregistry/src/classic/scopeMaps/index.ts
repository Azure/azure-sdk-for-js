// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/scopeMaps/operations.js";
import type {
  ScopeMapsListOptionalParams,
  ScopeMapsDeleteOptionalParams,
  ScopeMapsUpdateOptionalParams,
  ScopeMapsCreateOptionalParams,
  ScopeMapsGetOptionalParams,
} from "../../api/scopeMaps/options.js";
import type { ScopeMap, ScopeMapUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ScopeMaps operations. */
export interface ScopeMapsOperations {
  /** Lists all the scope maps for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: ScopeMapsListOptionalParams,
  ) => PagedAsyncIterableIterator<ScopeMap>;
  /** Deletes a scope map from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    scopeMapName: string,
    options?: ScopeMapsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a scope map with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    scopeMapName: string,
    scopeMapUpdateParameters: ScopeMapUpdateParameters,
    options?: ScopeMapsUpdateOptionalParams,
  ) => PollerLike<OperationState<ScopeMap>, ScopeMap>;
  /** Creates a scope map for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    scopeMapName: string,
    scopeMapCreateParameters: ScopeMap,
    options?: ScopeMapsCreateOptionalParams,
  ) => PollerLike<OperationState<ScopeMap>, ScopeMap>;
  /** Gets the properties of the specified scope map. */
  get: (
    resourceGroupName: string,
    registryName: string,
    scopeMapName: string,
    options?: ScopeMapsGetOptionalParams,
  ) => Promise<ScopeMap>;
}

function _getScopeMaps(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: ScopeMapsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      scopeMapName: string,
      options?: ScopeMapsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, scopeMapName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      scopeMapName: string,
      scopeMapUpdateParameters: ScopeMapUpdateParameters,
      options?: ScopeMapsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        registryName,
        scopeMapName,
        scopeMapUpdateParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      registryName: string,
      scopeMapName: string,
      scopeMapCreateParameters: ScopeMap,
      options?: ScopeMapsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        scopeMapName,
        scopeMapCreateParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      registryName: string,
      scopeMapName: string,
      options?: ScopeMapsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, scopeMapName, options),
  };
}

export function _getScopeMapsOperations(
  context: ContainerRegistryManagementContext,
): ScopeMapsOperations {
  return {
    ..._getScopeMaps(context),
  };
}
