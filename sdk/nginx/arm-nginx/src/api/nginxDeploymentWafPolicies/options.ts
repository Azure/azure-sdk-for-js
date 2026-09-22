// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxDeploymentWafPolicyAnalysisCreateRequest } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NginxDeploymentWafPoliciesAnalysisOptionalParams extends OperationOptions {
  /** The content of the action request */
  body?: NginxDeploymentWafPolicyAnalysisCreateRequest;
}
