// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { get } from "../../api/productPackage/operations.js";
import { ProductPackageGetOptionalParams } from "../../api/productPackage/options.js";
import { ProductPackageModel } from "../../models/models.js";

/** Interface representing a ProductPackage operations. */
export interface ProductPackageOperations {
  /** Gets a package by its identifier from the catalog. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    packageId: string,
    options?: ProductPackageGetOptionalParams,
  ) => Promise<ProductPackageModel>;
}

function _getProductPackage(context: SecurityInsightsContext) {
  return {
    get: (
      resourceGroupName: string,
      workspaceName: string,
      packageId: string,
      options?: ProductPackageGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, packageId, options),
  };
}

export function _getProductPackageOperations(
  context: SecurityInsightsContext,
): ProductPackageOperations {
  return {
    ..._getProductPackage(context),
  };
}
