// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/policies/operations.js";
import type {
  PoliciesListOptionalParams,
  PoliciesDeleteOptionalParams,
  PoliciesUpdateOptionalParams,
  PoliciesCreateOrUpdateOptionalParams,
  PoliciesGetOptionalParams,
} from "../../api/policies/options.js";
import type {
  CdnWebApplicationFirewallPolicy,
  CdnWebApplicationFirewallPolicyPatchParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Policies operations. */
export interface PoliciesOperations {
  /** Lists all of the protection policies within a resource group. */
  list: (
    resourceGroupName: string,
    options?: PoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<CdnWebApplicationFirewallPolicy>;
  /** Deletes Policy */
  delete: (
    resourceGroupName: string,
    policyName: string,
    options?: PoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an existing CdnWebApplicationFirewallPolicy with the specified policy name under the specified subscription and resource group */
  update: (
    resourceGroupName: string,
    policyName: string,
    cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
    options?: PoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<CdnWebApplicationFirewallPolicy>, CdnWebApplicationFirewallPolicy>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    policyName: string,
    cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
    options?: PoliciesUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CdnWebApplicationFirewallPolicy>,
      CdnWebApplicationFirewallPolicy
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    policyName: string,
    cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
    options?: PoliciesUpdateOptionalParams,
  ) => Promise<CdnWebApplicationFirewallPolicy>;
  /** Create or update policy with specified rule set name within a resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    policyName: string,
    cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
    options?: PoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CdnWebApplicationFirewallPolicy>, CdnWebApplicationFirewallPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    policyName: string,
    cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
    options?: PoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CdnWebApplicationFirewallPolicy>,
      CdnWebApplicationFirewallPolicy
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    policyName: string,
    cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
    options?: PoliciesCreateOrUpdateOptionalParams,
  ) => Promise<CdnWebApplicationFirewallPolicy>;
  /** Retrieve protection policy with specified name within a resource group. */
  get: (
    resourceGroupName: string,
    policyName: string,
    options?: PoliciesGetOptionalParams,
  ) => Promise<CdnWebApplicationFirewallPolicy>;
}

function _getPolicies(context: CdnManagementContext) {
  return {
    list: (resourceGroupName: string, options?: PoliciesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      policyName: string,
      options?: PoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, policyName, options),
    update: (
      resourceGroupName: string,
      policyName: string,
      cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
      options?: PoliciesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicyPatchParameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      policyName: string,
      cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
      options?: PoliciesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicyPatchParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      policyName: string,
      cdnWebApplicationFirewallPolicyPatchParameters: CdnWebApplicationFirewallPolicyPatchParameters,
      options?: PoliciesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicyPatchParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      policyName: string,
      cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
      options?: PoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicy,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      policyName: string,
      cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
      options?: PoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicy,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      policyName: string,
      cdnWebApplicationFirewallPolicy: CdnWebApplicationFirewallPolicy,
      options?: PoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        policyName,
        cdnWebApplicationFirewallPolicy,
        options,
      );
    },
    get: (resourceGroupName: string, policyName: string, options?: PoliciesGetOptionalParams) =>
      get(context, resourceGroupName, policyName, options),
  };
}

export function _getPoliciesOperations(context: CdnManagementContext): PoliciesOperations {
  return {
    ..._getPolicies(context),
  };
}
