// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/raiPolicies/operations.js";
import type {
  RaiPoliciesListOptionalParams,
  RaiPoliciesDeleteOptionalParams,
  RaiPoliciesCreateOrUpdateOptionalParams,
  RaiPoliciesGetOptionalParams,
} from "../../api/raiPolicies/options.js";
import type { RaiPolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RaiPolicies operations. */
export interface RaiPoliciesOperations {
  /** Gets the content filters associated with the Azure OpenAI account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: RaiPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiPolicy>;
  /** Deletes the specified Content Filters associated with the Azure OpenAI account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    options?: RaiPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    options?: RaiPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    options?: RaiPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified Content Filters associated with the Azure OpenAI account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    raiPolicy: RaiPolicy,
    options?: RaiPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<RaiPolicy>;
  /** Gets the specified Content Filters associated with the Azure OpenAI account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    options?: RaiPoliciesGetOptionalParams,
  ) => Promise<RaiPolicy>;
}

function _getRaiPolicies(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: RaiPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      raiPolicyName: string,
      options?: RaiPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, raiPolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      raiPolicyName: string,
      options?: RaiPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, raiPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      raiPolicyName: string,
      options?: RaiPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, raiPolicyName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      raiPolicyName: string,
      raiPolicy: RaiPolicy,
      options?: RaiPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, raiPolicyName, raiPolicy, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      raiPolicyName: string,
      options?: RaiPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, raiPolicyName, options),
  };
}

export function _getRaiPoliciesOperations(
  context: CognitiveServicesManagementContext,
): RaiPoliciesOperations {
  return {
    ..._getRaiPolicies(context),
  };
}
