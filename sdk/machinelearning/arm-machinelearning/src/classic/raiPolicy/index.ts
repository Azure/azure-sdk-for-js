// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { $delete, create, get } from "../../api/raiPolicy/operations.js";
import type {
  RaiPolicyDeleteOptionalParams,
  RaiPolicyCreateOptionalParams,
  RaiPolicyGetOptionalParams,
} from "../../api/raiPolicy/options.js";
import type { RaiPolicyPropertiesBasicResource } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RaiPolicy operations. */
export interface RaiPolicyOperations {
  /** Deletes the specified Content Filters associated with the Azure OpenAI account. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    raiPolicyName: string,
    options?: RaiPolicyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified Content Filters associated with the Azure OpenAI account. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    raiPolicyName: string,
    body: RaiPolicyPropertiesBasicResource,
    options?: RaiPolicyCreateOptionalParams,
  ) => PollerLike<
    OperationState<RaiPolicyPropertiesBasicResource>,
    RaiPolicyPropertiesBasicResource
  >;
  /** Gets the specified Content Filters associated with the Azure OpenAI account. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    raiPolicyName: string,
    options?: RaiPolicyGetOptionalParams,
  ) => Promise<RaiPolicyPropertiesBasicResource>;
}

function _getRaiPolicy(context: AzureMachineLearningServicesManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      options?: RaiPolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, endpointName, raiPolicyName, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      body: RaiPolicyPropertiesBasicResource,
      options?: RaiPolicyCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, workspaceName, endpointName, raiPolicyName, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      options?: RaiPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, endpointName, raiPolicyName, options),
  };
}

export function _getRaiPolicyOperations(
  context: AzureMachineLearningServicesManagementContext,
): RaiPolicyOperations {
  return {
    ..._getRaiPolicy(context),
  };
}
