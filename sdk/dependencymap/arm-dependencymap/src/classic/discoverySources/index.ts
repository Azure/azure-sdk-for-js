// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DependencyMapContext } from "../../api/dependencyMapContext.js";
import { DiscoverySourceResource, DiscoverySourceResourceTagsUpdate } from "../../models/models.js";
import {
  DiscoverySourcesListByMapsResourceOptionalParams,
  DiscoverySourcesDeleteOptionalParams,
  DiscoverySourcesUpdateOptionalParams,
  DiscoverySourcesCreateOrUpdateOptionalParams,
  DiscoverySourcesGetOptionalParams,
} from "../../api/discoverySources/options.js";
import {
  listByMapsResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/discoverySources/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiscoverySources operations. */
export interface DiscoverySourcesOperations {
  /** List DiscoverySourceResource resources by MapsResource */
  listByMapsResource: (
    resourceGroupName: string,
    mapName: string,
    options?: DiscoverySourcesListByMapsResourceOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoverySourceResource>;
  /** Delete a DiscoverySourceResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    mapName: string,
    sourceName: string,
    options?: DiscoverySourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a DiscoverySourceResource */
  update: (
    resourceGroupName: string,
    mapName: string,
    sourceName: string,
    properties: DiscoverySourceResourceTagsUpdate,
    options?: DiscoverySourcesUpdateOptionalParams,
  ) => PollerLike<OperationState<DiscoverySourceResource>, DiscoverySourceResource>;
  /** Create a DiscoverySourceResource */
  createOrUpdate: (
    resourceGroupName: string,
    mapName: string,
    sourceName: string,
    resource: DiscoverySourceResource,
    options?: DiscoverySourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DiscoverySourceResource>, DiscoverySourceResource>;
  /** Get a DiscoverySourceResource */
  get: (
    resourceGroupName: string,
    mapName: string,
    sourceName: string,
    options?: DiscoverySourcesGetOptionalParams,
  ) => Promise<DiscoverySourceResource>;
}

function _getDiscoverySources(context: DependencyMapContext) {
  return {
    listByMapsResource: (
      resourceGroupName: string,
      mapName: string,
      options?: DiscoverySourcesListByMapsResourceOptionalParams,
    ) => listByMapsResource(context, resourceGroupName, mapName, options),
    delete: (
      resourceGroupName: string,
      mapName: string,
      sourceName: string,
      options?: DiscoverySourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, mapName, sourceName, options),
    update: (
      resourceGroupName: string,
      mapName: string,
      sourceName: string,
      properties: DiscoverySourceResourceTagsUpdate,
      options?: DiscoverySourcesUpdateOptionalParams,
    ) => update(context, resourceGroupName, mapName, sourceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      mapName: string,
      sourceName: string,
      resource: DiscoverySourceResource,
      options?: DiscoverySourcesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, mapName, sourceName, resource, options),
    get: (
      resourceGroupName: string,
      mapName: string,
      sourceName: string,
      options?: DiscoverySourcesGetOptionalParams,
    ) => get(context, resourceGroupName, mapName, sourceName, options),
  };
}

export function _getDiscoverySourcesOperations(
  context: DependencyMapContext,
): DiscoverySourcesOperations {
  return {
    ..._getDiscoverySources(context),
  };
}
