// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { $delete, create, get } from "../../api/connectionRaiBlocklist/operations.js";
import type {
  ConnectionRaiBlocklistDeleteOptionalParams,
  ConnectionRaiBlocklistCreateOptionalParams,
  ConnectionRaiBlocklistGetOptionalParams,
} from "../../api/connectionRaiBlocklist/options.js";
import type { RaiBlocklistPropertiesBasicResource } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectionRaiBlocklist operations. */
export interface ConnectionRaiBlocklistOperations {
  /** Deletes the specified custom blocklist associated with the Azure OpenAI connection. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    options?: ConnectionRaiBlocklistDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    options?: ConnectionRaiBlocklistDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    options?: ConnectionRaiBlocklistDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified blocklist associated with the Azure OpenAI connection. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    body: RaiBlocklistPropertiesBasicResource,
    options?: ConnectionRaiBlocklistCreateOptionalParams,
  ) => PollerLike<
    OperationState<RaiBlocklistPropertiesBasicResource>,
    RaiBlocklistPropertiesBasicResource
  >;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    body: RaiBlocklistPropertiesBasicResource,
    options?: ConnectionRaiBlocklistCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<RaiBlocklistPropertiesBasicResource>,
      RaiBlocklistPropertiesBasicResource
    >
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    body: RaiBlocklistPropertiesBasicResource,
    options?: ConnectionRaiBlocklistCreateOptionalParams,
  ) => Promise<RaiBlocklistPropertiesBasicResource>;
  /** Gets the specified custom blocklist associated with the Azure OpenAI connection. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    raiBlocklistName: string,
    options?: ConnectionRaiBlocklistGetOptionalParams,
  ) => Promise<RaiBlocklistPropertiesBasicResource>;
}

function _getConnectionRaiBlocklist(context: AzureMachineLearningServicesManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      options?: ConnectionRaiBlocklistDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, workspaceName, connectionName, raiBlocklistName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      options?: ConnectionRaiBlocklistDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      options?: ConnectionRaiBlocklistDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      body: RaiBlocklistPropertiesBasicResource,
      options?: ConnectionRaiBlocklistCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        body,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      body: RaiBlocklistPropertiesBasicResource,
      options?: ConnectionRaiBlocklistCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
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
      raiBlocklistName: string,
      body: RaiBlocklistPropertiesBasicResource,
      options?: ConnectionRaiBlocklistCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      raiBlocklistName: string,
      options?: ConnectionRaiBlocklistGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, connectionName, raiBlocklistName, options),
  };
}

export function _getConnectionRaiBlocklistOperations(
  context: AzureMachineLearningServicesManagementContext,
): ConnectionRaiBlocklistOperations {
  return {
    ..._getConnectionRaiBlocklist(context),
  };
}
