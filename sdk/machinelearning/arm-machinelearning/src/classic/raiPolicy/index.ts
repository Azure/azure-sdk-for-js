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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    raiPolicyName: string,
    options?: RaiPolicyDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    raiPolicyName: string,
    options?: RaiPolicyDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    raiPolicyName: string,
    body: RaiPolicyPropertiesBasicResource,
    options?: RaiPolicyCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<RaiPolicyPropertiesBasicResource>,
      RaiPolicyPropertiesBasicResource
    >
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    raiPolicyName: string,
    body: RaiPolicyPropertiesBasicResource,
    options?: RaiPolicyCreateOptionalParams,
  ) => Promise<RaiPolicyPropertiesBasicResource>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      options?: RaiPolicyDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        raiPolicyName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      options?: RaiPolicyDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        raiPolicyName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      body: RaiPolicyPropertiesBasicResource,
      options?: RaiPolicyCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, workspaceName, endpointName, raiPolicyName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      body: RaiPolicyPropertiesBasicResource,
      options?: RaiPolicyCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        raiPolicyName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      endpointName: string,
      raiPolicyName: string,
      body: RaiPolicyPropertiesBasicResource,
      options?: RaiPolicyCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        raiPolicyName,
        body,
        options,
      );
    },
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
