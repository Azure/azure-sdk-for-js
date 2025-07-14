// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import { GenerateAwsTemplateRequest } from "../../models/models.js";
import { GenerateAwsTemplatePostOptionalParams } from "../../api/generateAwsTemplate/options.js";
import { post } from "../../api/generateAwsTemplate/operations.js";

/** Interface representing a GenerateAwsTemplate operations. */
export interface GenerateAwsTemplateOperations {
  /** Retrieve AWS Cloud Formation template */
  post: (
    generateAwsTemplateRequest: GenerateAwsTemplateRequest,
    options?: GenerateAwsTemplatePostOptionalParams,
  ) => Promise<Record<string, any>>;
}

function _getGenerateAwsTemplate(context: HybridConnectivityManagementAPIContext) {
  return {
    post: (
      generateAwsTemplateRequest: GenerateAwsTemplateRequest,
      options?: GenerateAwsTemplatePostOptionalParams,
    ) => post(context, generateAwsTemplateRequest, options),
  };
}

export function _getGenerateAwsTemplateOperations(
  context: HybridConnectivityManagementAPIContext,
): GenerateAwsTemplateOperations {
  return {
    ..._getGenerateAwsTemplate(context),
  };
}
