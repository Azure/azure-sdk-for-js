// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, get } from "../../api/platformUpdates/operations.js";
import type {
  PlatformUpdatesListOptionalParams,
  PlatformUpdatesGetOptionalParams,
} from "../../api/platformUpdates/options.js";
import type { PlatformUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PlatformUpdates operations. */
export interface PlatformUpdatesOperations {
  /** List all platform updates. */
  list: (
    location: string,
    options?: PlatformUpdatesListOptionalParams,
  ) => PagedAsyncIterableIterator<PlatformUpdate>;
  /** Get a platform update. */
  get: (
    location: string,
    platformUpdateName: string,
    options?: PlatformUpdatesGetOptionalParams,
  ) => Promise<PlatformUpdate>;
}

function _getPlatformUpdates(context: AzureStackHCIContext) {
  return {
    list: (location: string, options?: PlatformUpdatesListOptionalParams) =>
      list(context, location, options),
    get: (
      location: string,
      platformUpdateName: string,
      options?: PlatformUpdatesGetOptionalParams,
    ) => get(context, location, platformUpdateName, options),
  };
}

export function _getPlatformUpdatesOperations(
  context: AzureStackHCIContext,
): PlatformUpdatesOperations {
  return {
    ..._getPlatformUpdates(context),
  };
}
