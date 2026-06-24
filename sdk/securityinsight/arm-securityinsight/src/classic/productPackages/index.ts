// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/productPackages/operations.js";
import type { ProductPackagesListOptionalParams } from "../../api/productPackages/options.js";
import type { ProductPackageModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductPackages operations. */
export interface ProductPackagesOperations {
  /**
   * Gets all packages from the catalog.
   * Expandable properties:
   * - properties/installed
   * - properties/packagedContent
   */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ProductPackagesListOptionalParams,
  ) => PagedAsyncIterableIterator<ProductPackageModel>;
}

function _getProductPackages(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ProductPackagesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getProductPackagesOperations(
  context: SecurityInsightsContext,
): ProductPackagesOperations {
  return {
    ..._getProductPackages(context),
  };
}
