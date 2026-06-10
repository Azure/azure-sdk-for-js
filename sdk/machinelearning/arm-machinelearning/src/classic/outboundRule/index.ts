// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/outboundRule/operations.js";
import type {
  OutboundRuleListOptionalParams,
  OutboundRuleDeleteOptionalParams,
  OutboundRuleCreateOrUpdateOptionalParams,
  OutboundRuleGetOptionalParams,
} from "../../api/outboundRule/options.js";
import type { OutboundRuleBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OutboundRule operations. */
export interface OutboundRuleOperations {
  /** The GET API for retrieveing the list of outbound rules of the managed network associated with the machine learning workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    options?: OutboundRuleListOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRuleBasicResource>;
  /** The DELETE API for deleting a single outbound rule of the managed network associated with the machine learning workspace. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    ruleName: string,
    options?: OutboundRuleDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a OutboundRuleBasicResource */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: OutboundRuleCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource>;
  /** The GET API for retrieveing a single outbound rule of the managed network associated with the machine learning workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    ruleName: string,
    options?: OutboundRuleGetOptionalParams,
  ) => Promise<OutboundRuleBasicResource>;
}

function _getOutboundRule(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      options?: OutboundRuleListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, managedNetworkName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      ruleName: string,
      options?: OutboundRuleDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, managedNetworkName, ruleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: OutboundRuleCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        managedNetworkName,
        ruleName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      ruleName: string,
      options?: OutboundRuleGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, managedNetworkName, ruleName, options),
  };
}

export function _getOutboundRuleOperations(
  context: AzureMachineLearningServicesManagementContext,
): OutboundRuleOperations {
  return {
    ..._getOutboundRule(context),
  };
}
