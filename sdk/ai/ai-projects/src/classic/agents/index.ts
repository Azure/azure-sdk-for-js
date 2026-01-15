// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable tsdoc/syntax */

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  streamAgentContainerLogs,
  listAgentVersions,
  deleteAgentVersion,
  getAgentVersion,
  createAgentVersionFromManifest,
  createAgentVersion,
  listAgents,
  deleteAgent,
  updateAgentFromManifest,
  createAgentFromManifest,
  updateAgent,
  createAgent,
  getAgent,
} from "../../api/agents/operations.js";
import {
  AgentsStreamAgentContainerLogsOptionalParams,
  AgentsListAgentVersionsOptionalParams,
  AgentsDeleteAgentVersionOptionalParams,
  AgentsGetAgentVersionOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsGetAgentOptionalParams,
  AgentsCreateAgentOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentVersionOptionalParams,
  AgentsCreateAgentVersionFromManifestOptionalParams,
} from "../../api/agents/options.js";
import {
  Agent,
  AgentVersion,
  AgentDefinitionUnion,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /**
   * Container log entry streamed from the container as text chunks.
   * Each chunk is a UTF-8 string that may be either a plain text log line
   * or a JSON-formatted log entry, depending on the type of container log being streamed.
   * Clients should treat each chunk as opaque text and, if needed, attempt
   * to parse it as JSON based on their logging requirements.
   *
   * For system logs, the format is JSON with the following structure:
   * {"TimeStamp":"2025-12-15T16:51:33Z","Type":"Normal","ContainerAppName":null,"RevisionName":null,"ReplicaName":null,"Msg":"Connecting to the events collector...","Reason":"StartingGettingEvents","EventSource":"ContainerAppController","Count":1}
   * {"TimeStamp":"2025-12-15T16:51:34Z","Type":"Normal","ContainerAppName":null,"RevisionName":null,"ReplicaName":null,"Msg":"Successfully connected to events server","Reason":"ConnectedToEventsServer","EventSource":"ContainerAppController","Count":1}
   *
   * For console logs, the format is plain text as emitted by the container's stdout/stderr.
   * 2025-12-15T08:43:48.72656  Connecting to the container 'agent-container'...
   * 2025-12-15T08:43:48.75451  Successfully Connected to container: 'agent-container' [Revision: 'je90fe655aa742ef9a188b9fd14d6764--7tca06b', Replica: 'je90fe655aa742ef9a188b9fd14d6764--7tca06b-6898b9c89f-mpkjc']
   * 2025-12-15T08:33:59.0671054Z stdout F INFO:     127.0.0.1:42588 - "GET /readiness HTTP/1.1" 200 OK
   * 2025-12-15T08:34:29.0649033Z stdout F INFO:     127.0.0.1:60246 - "GET /readiness HTTP/1.1" 200 OK
   * 2025-12-15T08:34:59.0644467Z stdout F INFO:     127.0.0.1:43994 - "GET /readiness HTTP/1.1" 200 OK
   */
  streamAgentContainerLogs: (
    agentName: string,
    agentVersion: string,
    options?: AgentsStreamAgentContainerLogsOptionalParams,
  ) => Promise<void>;
  /** Returns the list of versions of an agent. */
  listVersions: (
    agentName: string,
    options?: AgentsListAgentVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentVersion>;
  /** Deletes a specific version of an agent. */
  deleteVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsDeleteAgentVersionOptionalParams,
  ) => Promise<DeleteAgentVersionResponse>;
  /** Retrieves a specific version of an agent. */
  getVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsGetAgentVersionOptionalParams,
  ) => Promise<AgentVersion>;
  /** Create a new agent version from a definition. */
  createVersion(
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentVersionOptionalParams,
  ): Promise<AgentVersion>;
  /** Create a new agent version from a manifest. */
  createVersion(
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentVersionFromManifestOptionalParams,
  ): Promise<AgentVersion>;
  /** Returns the list of all agents. */
  list: (options?: AgentsListAgentsOptionalParams) => PagedAsyncIterableIterator<Agent>;
  /** Deletes an agent. */
  delete: (
    agentName: string,
    options?: AgentsDeleteAgentOptionalParams,
  ) => Promise<DeleteAgentResponse>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  update(
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateAgentOptionalParams,
  ): Promise<Agent>;
  /**
   * Updates the agent from a manifest by adding a new version if there are any changes.
   * If no changes, returns the existing agent version.
   */
  update(
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /** Creates an agent from a definition. */
  create(
    name: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentOptionalParams,
  ): Promise<Agent>;
  /** Creates an agent from a manifest. */
  create(
    name: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ): Promise<Agent>;
  /** Retrieves the agent. */
  get: (agentName: string, options?: AgentsGetAgentOptionalParams) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    streamAgentContainerLogs: (
      agentName: string,
      agentVersion: string,
      options?: AgentsStreamAgentContainerLogsOptionalParams,
    ) => streamAgentContainerLogs(context, agentName, agentVersion, options),
    listVersions: (agentName: string, options?: AgentsListAgentVersionsOptionalParams) =>
      listAgentVersions(context, agentName, options),
    deleteVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsDeleteAgentVersionOptionalParams,
    ) => deleteAgentVersion(context, agentName, agentVersion, options),
    getVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsGetAgentVersionOptionalParams,
    ) => getAgentVersion(context, agentName, agentVersion, options),
    createVersion(
      agentName: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsCreateAgentVersionOptionalParams | Record<string, any>,
      options?: AgentsCreateAgentVersionFromManifestOptionalParams,
    ): Promise<AgentVersion> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return createAgentVersionFromManifest(
          context,
          agentName,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, any>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return createAgentVersion(
        context,
        agentName,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsCreateAgentVersionOptionalParams | undefined,
      );
    },
    list: (options?: AgentsListAgentsOptionalParams) => listAgents(context, options),
    delete: (agentName: string, options?: AgentsDeleteAgentOptionalParams) =>
      deleteAgent(context, agentName, options),
    update(
      agentName: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsUpdateAgentOptionalParams | Record<string, any>,
      options?: AgentsUpdateAgentFromManifestOptionalParams,
    ): Promise<Agent> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return updateAgentFromManifest(
          context,
          agentName,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, any>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return updateAgent(
        context,
        agentName,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsUpdateAgentOptionalParams | undefined,
      );
    },
    create(
      name: string,
      definitionOrManifestId: AgentDefinitionUnion | string,
      optionsOrParameterValues?: AgentsCreateAgentOptionalParams | Record<string, any>,
      options?: AgentsCreateAgentFromManifestOptionalParams,
    ): Promise<Agent> {
      // If second param is a string, it's the manifest case (4 params)
      if (typeof definitionOrManifestId === "string") {
        return createAgentFromManifest(
          context,
          name,
          definitionOrManifestId,
          optionsOrParameterValues as Record<string, any>,
          options,
        );
      }
      // Otherwise, it's the definition case (3 params)
      return createAgent(
        context,
        name,
        definitionOrManifestId,
        optionsOrParameterValues as AgentsCreateAgentOptionalParams | undefined,
      );
    },
    get: (agentName: string, options?: AgentsGetAgentOptionalParams) =>
      getAgent(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
