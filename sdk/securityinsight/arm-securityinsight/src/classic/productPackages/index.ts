// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/productPackages/operations.js";
import { ProductPackagesListOptionalParams } from "../../api/productPackages/options.js";
import { ProductPackageModel } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
