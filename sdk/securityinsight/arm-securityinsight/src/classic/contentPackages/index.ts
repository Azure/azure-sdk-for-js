// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, get } from "../../api/contentPackages/operations.js";
import type {
  ContentPackagesListOptionalParams,
  ContentPackagesGetOptionalParams,
} from "../../api/contentPackages/options.js";
import type { PackageModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContentPackages operations. */
export interface ContentPackagesOperations {
  /** Gets all installed packages. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ContentPackagesListOptionalParams,
  ) => PagedAsyncIterableIterator<PackageModel>;
  /** Gets an installed packages by its id. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    packageId: string,
    options?: ContentPackagesGetOptionalParams,
  ) => Promise<PackageModel>;
}

function _getContentPackages(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ContentPackagesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      packageId: string,
      options?: ContentPackagesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, packageId, options),
  };
}

export function _getContentPackagesOperations(
  context: SecurityInsightsContext,
): ContentPackagesOperations {
  return {
    ..._getContentPackages(context),
  };
}
