// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedNetworkSettingsRule/operations.js";
import type {
  ManagedNetworkSettingsRuleListOptionalParams,
  ManagedNetworkSettingsRuleDeleteOptionalParams,
  ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
  ManagedNetworkSettingsRuleGetOptionalParams,
} from "../../api/managedNetworkSettingsRule/options.js";
import type { OutboundRuleBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedNetworkSettingsRule operations. */
export interface ManagedNetworkSettingsRuleOperations {
  /** Lists the managed network outbound rules for a machine learning workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ManagedNetworkSettingsRuleListOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRuleBasicResource>;
  /** Deletes an outbound rule from the managed network of a machine learning workspace. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    options?: ManagedNetworkSettingsRuleDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    options?: ManagedNetworkSettingsRuleDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    options?: ManagedNetworkSettingsRuleDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an outbound rule in the managed network of a machine learning workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
  ) => Promise<OutboundRuleBasicResource>;
  /** Gets an outbound rule from the managed network of a machine learning workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    options?: ManagedNetworkSettingsRuleGetOptionalParams,
  ) => Promise<OutboundRuleBasicResource>;
}

function _getManagedNetworkSettingsRule(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ManagedNetworkSettingsRuleListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      options?: ManagedNetworkSettingsRuleDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, ruleName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      options?: ManagedNetworkSettingsRuleDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, ruleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      options?: ManagedNetworkSettingsRuleDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, ruleName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, ruleName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        ruleName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        ruleName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      options?: ManagedNetworkSettingsRuleGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, ruleName, options),
  };
}

export function _getManagedNetworkSettingsRuleOperations(
  context: AzureMachineLearningServicesManagementContext,
): ManagedNetworkSettingsRuleOperations {
  return {
    ..._getManagedNetworkSettingsRule(context),
  };
}
