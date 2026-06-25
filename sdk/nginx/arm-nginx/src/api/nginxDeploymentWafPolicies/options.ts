// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxDeploymentWafPolicyAnalysisCreateRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NginxDeploymentWafPoliciesAnalysisOptionalParams extends OperationOptions {
  /** The content of the action request */
  body?: NginxDeploymentWafPolicyAnalysisCreateRequest;
}
