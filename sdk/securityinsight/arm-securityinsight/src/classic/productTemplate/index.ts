// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { get } from "../../api/productTemplate/operations.js";
import { ProductTemplateGetOptionalParams } from "../../api/productTemplate/options.js";
import { ProductTemplateModel } from "../../models/models.js";

/** Interface representing a ProductTemplate operations. */
export interface ProductTemplateOperations {
  /** Gets a template by its identifier. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    templateId: string,
    options?: ProductTemplateGetOptionalParams,
  ) => Promise<ProductTemplateModel>;
}

function _getProductTemplate(context: SecurityInsightsContext) {
  return {
    get: (
      resourceGroupName: string,
      workspaceName: string,
      templateId: string,
      options?: ProductTemplateGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, templateId, options),
  };
}

export function _getProductTemplateOperations(
  context: SecurityInsightsContext,
): ProductTemplateOperations {
  return {
    ..._getProductTemplate(context),
  };
}
