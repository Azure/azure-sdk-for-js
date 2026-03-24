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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    options?: ManagedNetworkSettingsRuleDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an outbound rule in the managed network of a machine learning workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource>;
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
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: ManagedNetworkSettingsRuleCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, ruleName, body, options),
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
