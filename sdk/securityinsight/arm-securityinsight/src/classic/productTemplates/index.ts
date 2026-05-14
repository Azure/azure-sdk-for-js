// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/productTemplates/operations.js";
import { ProductTemplatesListOptionalParams } from "../../api/productTemplates/options.js";
import { ProductTemplateModel } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductTemplates operations. */
export interface ProductTemplatesOperations {
  /** Gets all templates in the catalog. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ProductTemplatesListOptionalParams,
  ) => PagedAsyncIterableIterator<ProductTemplateModel>;
}

function _getProductTemplates(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ProductTemplatesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
  };
}

export function _getProductTemplatesOperations(
  context: SecurityInsightsContext,
): ProductTemplatesOperations {
  return {
    ..._getProductTemplates(context),
  };
}
