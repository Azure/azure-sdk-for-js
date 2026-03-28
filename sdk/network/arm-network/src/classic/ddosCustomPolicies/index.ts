// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/ddosCustomPolicies/operations.js";
import type {
  DdosCustomPoliciesDeleteOptionalParams,
  DdosCustomPoliciesUpdateTagsOptionalParams,
  DdosCustomPoliciesCreateOrUpdateOptionalParams,
  DdosCustomPoliciesGetOptionalParams,
} from "../../api/ddosCustomPolicies/options.js";
import type { TagsObject, DdosCustomPolicy } from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DdosCustomPolicies operations. */
export interface DdosCustomPoliciesOperations {
  /** Deletes the specified DDoS custom policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    options?: DdosCustomPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    options?: DdosCustomPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    options?: DdosCustomPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a DDoS custom policy tags. */
  updateTags: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    parameters: TagsObject,
    options?: DdosCustomPoliciesUpdateTagsOptionalParams,
  ) => Promise<DdosCustomPolicy>;
  /** Creates or updates a DDoS custom policy. */
  createOrUpdate: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    parameters: DdosCustomPolicy,
    options?: DdosCustomPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DdosCustomPolicy>, DdosCustomPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    parameters: DdosCustomPolicy,
    options?: DdosCustomPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DdosCustomPolicy>, DdosCustomPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    parameters: DdosCustomPolicy,
    options?: DdosCustomPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<DdosCustomPolicy>;
  /** Gets information about the specified DDoS custom policy. */
  get: (
    resourceGroupName: string,
    ddosCustomPolicyName: string,
    options?: DdosCustomPoliciesGetOptionalParams,
  ) => Promise<DdosCustomPolicy>;
}

function _getDdosCustomPolicies(context: NetworkManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      options?: DdosCustomPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ddosCustomPolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      options?: DdosCustomPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ddosCustomPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      options?: DdosCustomPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ddosCustomPolicyName, options);
    },
    updateTags: (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      parameters: TagsObject,
      options?: DdosCustomPoliciesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, ddosCustomPolicyName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      parameters: DdosCustomPolicy,
      options?: DdosCustomPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ddosCustomPolicyName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      parameters: DdosCustomPolicy,
      options?: DdosCustomPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        ddosCustomPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      parameters: DdosCustomPolicy,
      options?: DdosCustomPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        ddosCustomPolicyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      ddosCustomPolicyName: string,
      options?: DdosCustomPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, ddosCustomPolicyName, options),
  };
}

export function _getDdosCustomPoliciesOperations(
  context: NetworkManagementContext,
): DdosCustomPoliciesOperations {
  return {
    ..._getDdosCustomPolicies(context),
  };
}
