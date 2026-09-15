// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext } from "../../api/appContext.js";
import {
  listAllSecrets,
  listSecrets,
  listByAgentSpace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/agentSpacesConnectors/operations.js";
import type {
  AgentSpacesConnectorsListAllSecretsOptionalParams,
  AgentSpacesConnectorsListSecretsOptionalParams,
  AgentSpacesConnectorsListByAgentSpaceOptionalParams,
  AgentSpacesConnectorsDeleteOptionalParams,
  AgentSpacesConnectorsCreateOrUpdateOptionalParams,
  AgentSpacesConnectorsGetOptionalParams,
} from "../../api/agentSpacesConnectors/options.js";
import type { AgentSpaceConnector, AgentSpaceConnectorCollection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentSpacesConnectors operations. */
export interface AgentSpacesConnectorsOperations {
  /** List all secrets for AgentSpace Connectors */
  listAllSecrets: (
    resourceGroupName: string,
    agentSpaceName: string,
    options?: AgentSpacesConnectorsListAllSecretsOptionalParams,
  ) => Promise<AgentSpaceConnectorCollection>;
  /** List secrets for an Agent Space Connector */
  listSecrets: (
    resourceGroupName: string,
    agentSpaceName: string,
    connectorName: string,
    options?: AgentSpacesConnectorsListSecretsOptionalParams,
  ) => Promise<AgentSpaceConnector>;
  /** Get all the connectors for an Agent Space */
  listByAgentSpace: (
    resourceGroupName: string,
    agentSpaceName: string,
    options?: AgentSpacesConnectorsListByAgentSpaceOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSpaceConnector>;
  /** Delete an Agent Space Connector */
  delete: (
    resourceGroupName: string,
    agentSpaceName: string,
    connectorName: string,
    options?: AgentSpacesConnectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an Agent Space Connector */
  createOrUpdate: (
    resourceGroupName: string,
    agentSpaceName: string,
    connectorName: string,
    resource: AgentSpaceConnector,
    options?: AgentSpacesConnectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentSpaceConnector>, AgentSpaceConnector>;
  /** Get the properties of an Agent Space Connector */
  get: (
    resourceGroupName: string,
    agentSpaceName: string,
    connectorName: string,
    options?: AgentSpacesConnectorsGetOptionalParams,
  ) => Promise<AgentSpaceConnector>;
}

function _getAgentSpacesConnectors(context: AppContext) {
  return {
    listAllSecrets: (
      resourceGroupName: string,
      agentSpaceName: string,
      options?: AgentSpacesConnectorsListAllSecretsOptionalParams,
    ) => listAllSecrets(context, resourceGroupName, agentSpaceName, options),
    listSecrets: (
      resourceGroupName: string,
      agentSpaceName: string,
      connectorName: string,
      options?: AgentSpacesConnectorsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, agentSpaceName, connectorName, options),
    listByAgentSpace: (
      resourceGroupName: string,
      agentSpaceName: string,
      options?: AgentSpacesConnectorsListByAgentSpaceOptionalParams,
    ) => listByAgentSpace(context, resourceGroupName, agentSpaceName, options),
    delete: (
      resourceGroupName: string,
      agentSpaceName: string,
      connectorName: string,
      options?: AgentSpacesConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, agentSpaceName, connectorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      agentSpaceName: string,
      connectorName: string,
      resource: AgentSpaceConnector,
      options?: AgentSpacesConnectorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, agentSpaceName, connectorName, resource, options),
    get: (
      resourceGroupName: string,
      agentSpaceName: string,
      connectorName: string,
      options?: AgentSpacesConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, agentSpaceName, connectorName, options),
  };
}

export function _getAgentSpacesConnectorsOperations(
  context: AppContext,
): AgentSpacesConnectorsOperations {
  return {
    ..._getAgentSpacesConnectors(context),
  };
}
