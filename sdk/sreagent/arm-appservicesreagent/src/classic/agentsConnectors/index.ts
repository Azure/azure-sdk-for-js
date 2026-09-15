// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext } from "../../api/appContext.js";
import {
  listWithSecretsByAgent,
  listSecrets,
  listByAgent,
  $delete,
  createOrUpdate,
  get,
} from "../../api/agentsConnectors/operations.js";
import type {
  AgentsConnectorsListWithSecretsByAgentOptionalParams,
  AgentsConnectorsListSecretsOptionalParams,
  AgentsConnectorsListByAgentOptionalParams,
  AgentsConnectorsDeleteOptionalParams,
  AgentsConnectorsCreateOrUpdateOptionalParams,
  AgentsConnectorsGetOptionalParams,
} from "../../api/agentsConnectors/options.js";
import type { AgentConnector, AgentConnectorCollection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentsConnectors operations. */
export interface AgentsConnectorsOperations {
  /** List all Data Connectors with secrets from an Agent */
  listWithSecretsByAgent: (
    resourceGroupName: string,
    agentName: string,
    options?: AgentsConnectorsListWithSecretsByAgentOptionalParams,
  ) => Promise<AgentConnectorCollection>;
  /** Get a Data Connector with secrets from an Agent */
  listSecrets: (
    resourceGroupName: string,
    agentName: string,
    connectorName: string,
    options?: AgentsConnectorsListSecretsOptionalParams,
  ) => Promise<AgentConnector>;
  /** Get all the connectors for an Agent */
  listByAgent: (
    resourceGroupName: string,
    agentName: string,
    options?: AgentsConnectorsListByAgentOptionalParams,
  ) => PagedAsyncIterableIterator<AgentConnector>;
  /** Delete an Agent Connector */
  delete: (
    resourceGroupName: string,
    agentName: string,
    connectorName: string,
    options?: AgentsConnectorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an Agent Connector */
  createOrUpdate: (
    resourceGroupName: string,
    agentName: string,
    connectorName: string,
    resource: AgentConnector,
    options?: AgentsConnectorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentConnector>, AgentConnector>;
  /** Get the properties of an Agent Connector */
  get: (
    resourceGroupName: string,
    agentName: string,
    connectorName: string,
    options?: AgentsConnectorsGetOptionalParams,
  ) => Promise<AgentConnector>;
}

function _getAgentsConnectors(context: AppContext) {
  return {
    listWithSecretsByAgent: (
      resourceGroupName: string,
      agentName: string,
      options?: AgentsConnectorsListWithSecretsByAgentOptionalParams,
    ) => listWithSecretsByAgent(context, resourceGroupName, agentName, options),
    listSecrets: (
      resourceGroupName: string,
      agentName: string,
      connectorName: string,
      options?: AgentsConnectorsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, agentName, connectorName, options),
    listByAgent: (
      resourceGroupName: string,
      agentName: string,
      options?: AgentsConnectorsListByAgentOptionalParams,
    ) => listByAgent(context, resourceGroupName, agentName, options),
    delete: (
      resourceGroupName: string,
      agentName: string,
      connectorName: string,
      options?: AgentsConnectorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, agentName, connectorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      agentName: string,
      connectorName: string,
      resource: AgentConnector,
      options?: AgentsConnectorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, agentName, connectorName, resource, options),
    get: (
      resourceGroupName: string,
      agentName: string,
      connectorName: string,
      options?: AgentsConnectorsGetOptionalParams,
    ) => get(context, resourceGroupName, agentName, connectorName, options),
  };
}

export function _getAgentsConnectorsOperations(context: AppContext): AgentsConnectorsOperations {
  return {
    ..._getAgentsConnectors(context),
  };
}
