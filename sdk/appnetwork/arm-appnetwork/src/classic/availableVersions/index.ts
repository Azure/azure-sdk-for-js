// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppLinkContext } from "../../api/appLinkContext.js";
import { listByLocation } from "../../api/availableVersions/operations.js";
import type { AvailableVersionsListByLocationOptionalParams } from "../../api/availableVersions/options.js";
import type { AvailableVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableVersions operations. */
export interface AvailableVersionsOperations {
  /** List AvailableVersion resources by location. */
  listByLocation: (
    location: string,
    options?: AvailableVersionsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<AvailableVersion>;
}

function _getAvailableVersions(context: AppLinkContext) {
  return {
    listByLocation: (location: string, options?: AvailableVersionsListByLocationOptionalParams) =>
      listByLocation(context, location, options),
  };
}

export function _getAvailableVersionsOperations(
  context: AppLinkContext,
): AvailableVersionsOperations {
  return {
    ..._getAvailableVersions(context),
  };
}
