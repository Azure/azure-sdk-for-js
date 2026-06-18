// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementContext } from "../../api/nginxManagementContext.js";
import { $delete, create, get, list } from "../../api/wafPolicy/operations.js";
import {
  WafPolicyDeleteOptionalParams,
  WafPolicyCreateOptionalParams,
  WafPolicyGetOptionalParams,
  WafPolicyListOptionalParams,
} from "../../api/wafPolicy/options.js";
import { NginxDeploymentWafPolicyMetadata, NginxDeploymentWafPolicy } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WafPolicy operations. */
export interface WafPolicyOperations {
  /** Reset the Nginx Waf Policy of given Nginx deployment to default */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the Nginx Waf Policy for given Nginx deployment */
  create: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyCreateOptionalParams,
  ) => PollerLike<OperationState<NginxDeploymentWafPolicy>, NginxDeploymentWafPolicy>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<NginxDeploymentWafPolicy>, NginxDeploymentWafPolicy>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    wafPolicyName: string,
    options?: WafPolicyCreateOptionalParams,
  ) => Promise<NginxDeploymentWafPolicy>;
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
    beginDelete: async (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, deploymentName, wafPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, deploymentName, wafPolicyName, options);
    },
    create: (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyCreateOptionalParams,
    ) => create(context, resourceGroupName, deploymentName, wafPolicyName, options),
    beginCreate: async (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, deploymentName, wafPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      wafPolicyName: string,
      options?: WafPolicyCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, deploymentName, wafPolicyName, options);
    },
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
