// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import { listCapabilities, listCachedImages, listUsage } from "../../api/location/operations.js";
import type {
  LocationListCapabilitiesOptionalParams,
  LocationListCachedImagesOptionalParams,
  LocationListUsageOptionalParams,
} from "../../api/location/options.js";
import type { Usage, CachedImages, Capabilities } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Location operations. */
export interface LocationOperations {
  /** Get the list of CPU/memory/GPU capabilities of a region. */
  listCapabilities: (
    location: string,
    options?: LocationListCapabilitiesOptionalParams,
  ) => PagedAsyncIterableIterator<Capabilities>;
  /** Get the list of cached images on specific OS type for a subscription in a region. */
  listCachedImages: (
    location: string,
    options?: LocationListCachedImagesOptionalParams,
  ) => PagedAsyncIterableIterator<CachedImages>;
  /** Get the usage for a subscription */
  listUsage: (
    location: string,
    options?: LocationListUsageOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getLocation(context: ContainerInstanceManagementContext) {
  return {
    listCapabilities: (location: string, options?: LocationListCapabilitiesOptionalParams) =>
      listCapabilities(context, location, options),
    listCachedImages: (location: string, options?: LocationListCachedImagesOptionalParams) =>
      listCachedImages(context, location, options),
    listUsage: (location: string, options?: LocationListUsageOptionalParams) =>
      listUsage(context, location, options),
  };
}

export function _getLocationOperations(
  context: ContainerInstanceManagementContext,
): LocationOperations {
  return {
    ..._getLocation(context),
  };
}
