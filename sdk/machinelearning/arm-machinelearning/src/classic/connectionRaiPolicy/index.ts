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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiPolicyName: string,
    options?: ConnectionRaiPolicyDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiPolicyName: string,
    options?: ConnectionRaiPolicyDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiPolicyName: string,
    body: RaiPolicyPropertiesBasicResource,
    options?: ConnectionRaiPolicyCreateOptionalParams,
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
    connectionName: string,
    raiPolicyName: string,
    body: RaiPolicyPropertiesBasicResource,
    options?: ConnectionRaiPolicyCreateOptionalParams,
  ) => Promise<RaiPolicyPropertiesBasicResource>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiPolicyName: string,
      options?: ConnectionRaiPolicyDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiPolicyName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiPolicyName: string,
      options?: ConnectionRaiPolicyDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiPolicyName,
        options,
      );
    },
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
    beginCreate: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiPolicyName: string,
      body: RaiPolicyPropertiesBasicResource,
      options?: ConnectionRaiPolicyCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
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
      connectionName: string,
      raiPolicyName: string,
      body: RaiPolicyPropertiesBasicResource,
      options?: ConnectionRaiPolicyCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiPolicyName,
        body,
        options,
      );
    },
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
