// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/ddosProtectionPlans/operations.js";
import type {
  DdosProtectionPlansListOptionalParams,
  DdosProtectionPlansListByResourceGroupOptionalParams,
  DdosProtectionPlansDeleteOptionalParams,
  DdosProtectionPlansUpdateTagsOptionalParams,
  DdosProtectionPlansCreateOrUpdateOptionalParams,
  DdosProtectionPlansGetOptionalParams,
} from "../../api/ddosProtectionPlans/options.js";
import type { TagsObject, DdosProtectionPlan } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DdosProtectionPlans operations. */
export interface DdosProtectionPlansOperations {
  /** Gets all DDoS protection plans in a subscription. */
  list: (
    options?: DdosProtectionPlansListOptionalParams,
  ) => PagedAsyncIterableIterator<DdosProtectionPlan>;
  /** Gets all the DDoS protection plans in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DdosProtectionPlansListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DdosProtectionPlan>;
  /** Deletes the specified DDoS protection plan. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    options?: DdosProtectionPlansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    options?: DdosProtectionPlansDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    options?: DdosProtectionPlansDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a DDoS protection plan tags. */
  updateTags: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    parameters: TagsObject,
    options?: DdosProtectionPlansUpdateTagsOptionalParams,
  ) => Promise<DdosProtectionPlan>;
  /** Creates or updates a DDoS protection plan. */
  createOrUpdate: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    parameters: DdosProtectionPlan,
    options?: DdosProtectionPlansCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DdosProtectionPlan>, DdosProtectionPlan>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    parameters: DdosProtectionPlan,
    options?: DdosProtectionPlansCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DdosProtectionPlan>, DdosProtectionPlan>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    parameters: DdosProtectionPlan,
    options?: DdosProtectionPlansCreateOrUpdateOptionalParams,
  ) => Promise<DdosProtectionPlan>;
  /** Gets information about the specified DDoS protection plan. */
  get: (
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    options?: DdosProtectionPlansGetOptionalParams,
  ) => Promise<DdosProtectionPlan>;
}

function _getDdosProtectionPlans(context: NetworkManagementContext) {
  return {
    list: (options?: DdosProtectionPlansListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DdosProtectionPlansListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      options?: DdosProtectionPlansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ddosProtectionPlanName, options),
    beginDelete: async (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      options?: DdosProtectionPlansDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, ddosProtectionPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      options?: DdosProtectionPlansDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, ddosProtectionPlanName, options);
    },
    updateTags: (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      parameters: TagsObject,
      options?: DdosProtectionPlansUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, ddosProtectionPlanName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      parameters: DdosProtectionPlan,
      options?: DdosProtectionPlansCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, ddosProtectionPlanName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      parameters: DdosProtectionPlan,
      options?: DdosProtectionPlansCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        ddosProtectionPlanName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      parameters: DdosProtectionPlan,
      options?: DdosProtectionPlansCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        ddosProtectionPlanName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      ddosProtectionPlanName: string,
      options?: DdosProtectionPlansGetOptionalParams,
    ) => get(context, resourceGroupName, ddosProtectionPlanName, options),
  };
}

export function _getDdosProtectionPlansOperations(
  context: NetworkManagementContext,
): DdosProtectionPlansOperations {
  return {
    ..._getDdosProtectionPlans(context),
  };
}
