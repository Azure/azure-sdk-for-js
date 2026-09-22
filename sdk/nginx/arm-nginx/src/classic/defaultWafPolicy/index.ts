// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import { list } from "../../api/defaultWafPolicy/operations.js";
import type { DefaultWafPolicyListOptionalParams } from "../../api/defaultWafPolicy/options.js";
import type { NginxDeploymentDefaultWafPolicyListResponse } from "../../models/models.js";

/** Interface representing a DefaultWafPolicy operations. */
export interface DefaultWafPolicyOperations {
  /** Get the Nginx Waf Policy of given Nginx deployment */
  list: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DefaultWafPolicyListOptionalParams,
  ) => Promise<NginxDeploymentDefaultWafPolicyListResponse>;
}

function _getDefaultWafPolicy(context: NginxManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DefaultWafPolicyListOptionalParams,
    ) => list(context, resourceGroupName, deploymentName, options),
  };
}

export function _getDefaultWafPolicyOperations(
  context: NginxManagementContext,
): DefaultWafPolicyOperations {
  return {
    ..._getDefaultWafPolicy(context),
  };
}
