// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { $delete, create, get } from "../../api/connectionRaiPolicy/operations.js";
import type {
  ConnectionRaiPolicyDeleteOptionalParams,
  ConnectionRaiPolicyCreateOptionalParams,
  ConnectionRaiPolicyGetOptionalParams,
} from "../../api/connectionRaiPolicy/options.js";
import type { RaiPolicyPropertiesBasicResource } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectionRaiPolicy operations. */
export interface ConnectionRaiPolicyOperations {
  /** Deletes the specified Content Filters associated with the Azure OpenAI connection. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiPolicyName: string,
    options?: ConnectionRaiPolicyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified Content Filters associated with the Azure OpenAI connection. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiPolicyName: string,
    body: RaiPolicyPropertiesBasicResource,
    options?: ConnectionRaiPolicyCreateOptionalParams,
  ) => PollerLike<
    OperationState<RaiPolicyPropertiesBasicResource>,
    RaiPolicyPropertiesBasicResource
  >;
  /** Gets the specified Content Filters associated with the Azure OpenAI connection. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiPolicyName: string,
    options?: ConnectionRaiPolicyGetOptionalParams,
  ) => Promise<RaiPolicyPropertiesBasicResource>;
}

function _getConnectionRaiPolicy(context: AzureMachineLearningServicesManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiPolicyName: string,
      options?: ConnectionRaiPolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, connectionName, raiPolicyName, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiPolicyName: string,
      body: RaiPolicyPropertiesBasicResource,
      options?: ConnectionRaiPolicyCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiPolicyName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiPolicyName: string,
      options?: ConnectionRaiPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, connectionName, raiPolicyName, options),
  };
}

export function _getConnectionRaiPolicyOperations(
  context: AzureMachineLearningServicesManagementContext,
): ConnectionRaiPolicyOperations {
  return {
    ..._getConnectionRaiPolicy(context),
  };
}
