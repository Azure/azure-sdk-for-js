// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridConnectivityManagementAPIContext } from "../../api/hybridConnectivityManagementAPIContext.js";
import { post } from "../../api/generateGcpTemplate/operations.js";
import type { GenerateGcpTemplatePostOptionalParams } from "../../api/generateGcpTemplate/options.js";
import type {
  GenerateGcpTemplateRequest,
  GenerateGcpTemplateResponse,
} from "../../models/models.js";

/** Interface representing a GenerateGcpTemplate operations. */
export interface GenerateGcpTemplateOperations {
  /** Retrieve GCP Access Control template */
  post: (
    generateGcpTemplateRequest: GenerateGcpTemplateRequest,
    options?: GenerateGcpTemplatePostOptionalParams,
  ) => Promise<GenerateGcpTemplateResponse>;
}

function _getGenerateGcpTemplate(context: HybridConnectivityManagementAPIContext) {
  return {
    post: (
      generateGcpTemplateRequest: GenerateGcpTemplateRequest,
      options?: GenerateGcpTemplatePostOptionalParams,
    ) => post(context, generateGcpTemplateRequest, options),
  };
}

export function _getGenerateGcpTemplateOperations(
  context: HybridConnectivityManagementAPIContext,
): GenerateGcpTemplateOperations {
  return {
    ..._getGenerateGcpTemplate(context),
  };
}
