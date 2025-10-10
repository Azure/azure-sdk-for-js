// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import { $delete, create, get, list } from "../../api/wafPolicy/operations.js";
import type {
  WafPolicyDeleteOptionalParams,
  WafPolicyCreateOptionalParams,
  WafPolicyGetOptionalParams,
  WafPolicyListOptionalParams,
} from "../../api/wafPolicy/options.js";
import type {
  NginxDeploymentWafPolicyMetadata,
  NginxDeploymentWafPolicy,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WafPolicy operations. */
export interface WafPolicyOperations {
  /** Reset the Nginx Waf Policy of given Nginx deployment to default */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update the Nginx Waf Policy for given Nginx deployment */
  create: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyCreateOptionalParams,
  ) => PollerLike<OperationState<NginxDeploymentWafPolicy>, NginxDeploymentWafPolicy>;
  /** Get the Nginx Waf Policy of given Nginx deployment */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyGetOptionalParams,
  ) => Promise<NginxDeploymentWafPolicy>;
  /** List Waf Policies of given Nginx deployment */
  list: (
    resourceGroupName: string,
    deploymentName: string,
    options?: WafPolicyListOptionalParams,
  ) => PagedAsyncIterableIterator<NginxDeploymentWafPolicyMetadata>;
}

function _getWafPolicy(context: NginxManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentName, wafPolicyName, options),
    create: (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyCreateOptionalParams,
    ) => create(context, resourceGroupName, deploymentName, wafPolicyName, options),
    get: (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, wafPolicyName, options),
    list: (
      resourceGroupName: string,
      deploymentName: string,
      options?: WafPolicyListOptionalParams,
    ) => list(context, resourceGroupName, deploymentName, options),
  };
}

export function _getWafPolicyOperations(context: NginxManagementContext): WafPolicyOperations {
  return {
    ..._getWafPolicy(context),
  };
}
