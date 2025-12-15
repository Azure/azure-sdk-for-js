// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import { post } from "../../api/generateAwsTemplate/operations.js";
import type { GenerateAwsTemplatePostOptionalParams } from "../../api/generateAwsTemplate/options.js";
import type {
  GenerateAwsTemplateRequest,
  GenerateAwsTemplateResponse,
} from "../../models/models.js";

/** Interface representing a GenerateAwsTemplate operations. */
export interface GenerateAwsTemplateOperations {
  /** Retrieve AWS Cloud Formation template */
  post: (
    generateAwsTemplateRequest: GenerateAwsTemplateRequest,
    options?: GenerateAwsTemplatePostOptionalParams,
  ) => Promise<GenerateAwsTemplateResponse>;
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
