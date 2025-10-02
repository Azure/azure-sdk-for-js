// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAgents,
  AgentsContext,
  AgentsClientOptionalParams,
} from "./api/index.js";
import {
  listAgentVersionContainerOperations,
  listAgentContainerOperations,
  getAgentContainerOperation,
  getAgentContainer,
  deleteAgentContainer,
  stopAgentContainer,
  updateAgentContainer,
  startAgentContainer,
  deleteAgentEventHandler,
  listAgentEventHandlers,
  getAgentEventHandler,
  createOrUpdateAgentEventHandler,
  listAgentVersions,
  deleteAgentVersion,
  getAgentVersion,
  createAgentVersion,
  listAgents,
  deleteAgent,
  updateAgent,
  createAgent,
  getAgent,
} from "./api/operations.js";
import {
  ListAgentVersionContainerOperationsOptionalParams,
  ListAgentContainerOperationsOptionalParams,
  GetAgentContainerOperationOptionalParams,
  GetAgentContainerOptionalParams,
  DeleteAgentContainerOptionalParams,
  StopAgentContainerOptionalParams,
  UpdateAgentContainerOptionalParams,
  StartAgentContainerOptionalParams,
  DeleteAgentEventHandlerOptionalParams,
  ListAgentEventHandlersOptionalParams,
  GetAgentEventHandlerOptionalParams,
  CreateOrUpdateAgentEventHandlerOptionalParams,
  ListAgentVersionsOptionalParams,
  DeleteAgentVersionOptionalParams,
  GetAgentVersionOptionalParams,
  CreateAgentVersionOptionalParams,
  ListAgentsOptionalParams,
  DeleteAgentOptionalParams,
  UpdateAgentOptionalParams,
  CreateAgentOptionalParams,
  GetAgentOptionalParams,
} from "./api/options.js";
import {
  ConversationsOperations,
  _getConversationsOperations,
} from "./classic/conversations/index.js";
import {
  ResponsesOperations,
  _getResponsesOperations,
} from "./classic/responses/index.js";
import {
  AgentObject,
  AgentVersionObject,
  AgentDefinitionUnion,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
  AgentEventHandlerDestinationUnion,
  AgentEventType,
  AgentEventHandlerObject,
  DeleteAgentEventHandlerResponse,
  AgentContainerOperationObject,
  AgentContainerObject,
  AgentsPagedResultAgentContainerOperationObject,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { AgentsClientOptionalParams } from "./api/agentsContext.js";

export class AgentsClient {
  private _client: AgentsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: AgentsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAgents(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.responses = _getResponsesOperations(this._client);
    this.conversations = _getConversationsOperations(this._client);
  }

  /** List container operations for a specific version of an agent. */
  listAgentVersionContainerOperations(
    agentName: string,
    agentVersion: string,
    options: ListAgentVersionContainerOperationsOptionalParams = {
      requestOptions: {},
    },
  ): Promise<AgentsPagedResultAgentContainerOperationObject> {
    return listAgentVersionContainerOperations(
      this._client,
      agentName,
      agentVersion,
      options,
    );
  }

  /** List container operations for an agent. */
  listAgentContainerOperations(
    agentName: string,
    options: ListAgentContainerOperationsOptionalParams = {
      requestOptions: {},
    },
  ): Promise<AgentsPagedResultAgentContainerOperationObject> {
    return listAgentContainerOperations(this._client, agentName, options);
  }

  /** Get the status of a container operation for an agent. */
  getAgentContainerOperation(
    agentName: string,
    operationId: string,
    options: GetAgentContainerOperationOptionalParams = { requestOptions: {} },
  ): Promise<AgentContainerOperationObject> {
    return getAgentContainerOperation(
      this._client,
      agentName,
      operationId,
      options,
    );
  }

  /** Get a container for a specific version of an agent. */
  getAgentContainer(
    agentName: string,
    agentVersion: string,
    options: GetAgentContainerOptionalParams = { requestOptions: {} },
  ): Promise<AgentContainerObject> {
    return getAgentContainer(this._client, agentName, agentVersion, options);
  }

  /**
   * Delete a container for a specific version of an agent. If the container doesn't exist, the operation will be no-op.
   * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
   * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
   */
  deleteAgentContainer(
    agentName: string,
    agentVersion: string,
    options: DeleteAgentContainerOptionalParams = { requestOptions: {} },
  ): Promise<AgentContainerOperationObject> {
    return deleteAgentContainer(this._client, agentName, agentVersion, options);
  }

  /**
   * Stop a container for a specific version of an agent. If the container is not running, or already stopped, the operation will be no-op.
   * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
   * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
   */
  stopAgentContainer(
    agentName: string,
    agentVersion: string,
    options: StopAgentContainerOptionalParams = { requestOptions: {} },
  ): Promise<AgentContainerOperationObject> {
    return stopAgentContainer(this._client, agentName, agentVersion, options);
  }

  /**
   * Update a container for a specific version of an agent. If the container is not running, the operation will be no-op.
   * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
   * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
   */
  updateAgentContainer(
    agentName: string,
    agentVersion: string,
    options: UpdateAgentContainerOptionalParams = { requestOptions: {} },
  ): Promise<AgentContainerOperationObject> {
    return updateAgentContainer(this._client, agentName, agentVersion, options);
  }

  /**
   * Start a container for a specific version of an agent. If the container is already running, the operation will be no-op.
   * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
   * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
   */
  startAgentContainer(
    agentName: string,
    agentVersion: string,
    options: StartAgentContainerOptionalParams = { requestOptions: {} },
  ): Promise<AgentContainerOperationObject> {
    return startAgentContainer(this._client, agentName, agentVersion, options);
  }

  /** Deletes an event handler of an agent. */
  deleteAgentEventHandler(
    agentName: string,
    eventHandlerName: string,
    options: DeleteAgentEventHandlerOptionalParams = { requestOptions: {} },
  ): Promise<DeleteAgentEventHandlerResponse> {
    return deleteAgentEventHandler(
      this._client,
      agentName,
      eventHandlerName,
      options,
    );
  }

  /** Returns the list of event handlers of an agent. */
  listAgentEventHandlers(
    agentName: string,
    options: ListAgentEventHandlersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<AgentEventHandlerObject> {
    return listAgentEventHandlers(this._client, agentName, options);
  }

  /** Retrieves a specific event handler of an agent. */
  getAgentEventHandler(
    agentName: string,
    eventHandlerName: string,
    options: GetAgentEventHandlerOptionalParams = { requestOptions: {} },
  ): Promise<AgentEventHandlerObject> {
    return getAgentEventHandler(
      this._client,
      agentName,
      eventHandlerName,
      options,
    );
  }

  /** Create/Update/Remove an event handler for an agent. */
  createOrUpdateAgentEventHandler(
    agentName: string,
    eventHandlerName: string,
    name: string,
    eventTypes: AgentEventType[],
    destination: AgentEventHandlerDestinationUnion,
    options: CreateOrUpdateAgentEventHandlerOptionalParams = {
      requestOptions: {},
    },
  ): Promise<AgentEventHandlerObject> {
    return createOrUpdateAgentEventHandler(
      this._client,
      agentName,
      eventHandlerName,
      name,
      eventTypes,
      destination,
      options,
    );
  }

  /** Returns the list of versions of an agent. */
  listAgentVersions(
    agentName: string,
    options: ListAgentVersionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<AgentVersionObject> {
    return listAgentVersions(this._client, agentName, options);
  }

  /** Deletes a specific version of an agent. */
  deleteAgentVersion(
    agentName: string,
    agentVersion: string,
    options: DeleteAgentVersionOptionalParams = { requestOptions: {} },
  ): Promise<DeleteAgentVersionResponse> {
    return deleteAgentVersion(this._client, agentName, agentVersion, options);
  }

  /** Retrieves a specific version of an agent. */
  getAgentVersion(
    agentName: string,
    agentVersion: string,
    options: GetAgentVersionOptionalParams = { requestOptions: {} },
  ): Promise<AgentVersionObject> {
    return getAgentVersion(this._client, agentName, agentVersion, options);
  }

  /** Create a new agent version. */
  createAgentVersion(
    agentName: string,
    definition: AgentDefinitionUnion,
    options: CreateAgentVersionOptionalParams = { requestOptions: {} },
  ): Promise<AgentVersionObject> {
    return createAgentVersion(this._client, agentName, definition, options);
  }

  /** Returns the list of all agents. */
  listAgents(
    options: ListAgentsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<AgentObject> {
    return listAgents(this._client, options);
  }

  /** Deletes an agent. */
  deleteAgent(
    agentName: string,
    options: DeleteAgentOptionalParams = { requestOptions: {} },
  ): Promise<DeleteAgentResponse> {
    return deleteAgent(this._client, agentName, options);
  }

  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateAgent(
    agentName: string,
    definition: AgentDefinitionUnion,
    options: UpdateAgentOptionalParams = { requestOptions: {} },
  ): Promise<AgentObject> {
    return updateAgent(this._client, agentName, definition, options);
  }

  /** Creates the agent. */
  createAgent(
    name: string,
    definition: AgentDefinitionUnion,
    options: CreateAgentOptionalParams = { requestOptions: {} },
  ): Promise<AgentObject> {
    return createAgent(this._client, name, definition, options);
  }

  /** Retrieves the agent. */
  getAgent(
    agentName: string,
    options: GetAgentOptionalParams = { requestOptions: {} },
  ): Promise<AgentObject> {
    return getAgent(this._client, agentName, options);
  }

  /** The operation groups for responses */
  public readonly responses: ResponsesOperations;
  /** The operation groups for conversations */
  public readonly conversations: ConversationsOperations;
}
