// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import { analysis } from "../../api/nginxDeploymentWafPolicies/operations.js";
import type { NginxDeploymentWafPoliciesAnalysisOptionalParams } from "../../api/nginxDeploymentWafPolicies/options.js";
import type { NginxDeploymentWafPolicyAnalysisResponse } from "../../models/models.js";

/** Interface representing a NginxDeploymentWafPolicies operations. */
export interface NginxDeploymentWafPoliciesOperations {
  /** Analyze an Nginx Waf Policy */
  analysis: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: NginxDeploymentWafPoliciesAnalysisOptionalParams,
  ) => Promise<NginxDeploymentWafPolicyAnalysisResponse>;
}

function _getNginxDeploymentWafPolicies(context: NginxManagementContext) {
  return {
    analysis: (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: NginxDeploymentWafPoliciesAnalysisOptionalParams,
    ) => analysis(context, resourceGroupName, deploymentName, wafPolicyName, options),
  };
}

export function _getNginxDeploymentWafPoliciesOperations(
  context: NginxManagementContext,
): NginxDeploymentWafPoliciesOperations {
  return {
    ..._getNginxDeploymentWafPolicies(context),
  };
}
