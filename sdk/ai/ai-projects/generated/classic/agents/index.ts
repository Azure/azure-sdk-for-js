// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  deleteSessionFile,
  listSessionFiles,
  downloadSessionFile,
  uploadSessionFile,
  getMicrosoft365PublishDefaults,
  getMicrosoft365Package,
  publishToMicrosoft365,
  replaceTelephonyTransferTargets,
  getTelephonyTransferTargets,
  endTelephonyCall,
  transferTelephonyCall,
  getTelephonyCall,
  listTelephonyCalls,
  deleteTelephonyBinding,
  updateTelephonyBinding,
  getTelephonyBinding,
  listTelephonyBindings,
  createTelephonyBinding,
  getSessionLogStream,
  listSessions,
  stopSession,
  deleteSession,
  getSession,
  createSession,
  disable,
  enable,
  downloadAgentCode,
  createVersionFromCode,
  patchAgentObject,
  listVersions,
  deleteVersion,
  getVersion,
  createAgentVersionFromManifest,
  createVersion,
  list,
  $delete,
  updateAgentFromManifest,
  createAgentFromManifest,
  updateAgent,
  generateAgent,
  createAgent,
  get,
} from "../../api/agents/operations.js";
import {
  AgentsDeleteSessionFileOptionalParams,
  AgentsListSessionFilesOptionalParams,
  AgentsDownloadSessionFileOptionalParams,
  AgentsUploadSessionFileOptionalParams,
  GetMicrosoft365PublishDefaultsOptionalParams,
  GetMicrosoft365PackageOptionalParams,
  PublishToMicrosoft365OptionalParams,
  AgentsReplaceTelephonyTransferTargetsOptionalParams,
  AgentsGetTelephonyTransferTargetsOptionalParams,
  AgentsEndTelephonyCallOptionalParams,
  AgentsTransferTelephonyCallOptionalParams,
  AgentsGetTelephonyCallOptionalParams,
  AgentsListTelephonyCallsOptionalParams,
  AgentsDeleteTelephonyBindingOptionalParams,
  AgentsUpdateTelephonyBindingOptionalParams,
  AgentsGetTelephonyBindingOptionalParams,
  AgentsListTelephonyBindingsOptionalParams,
  AgentsCreateTelephonyBindingOptionalParams,
  AgentsGetSessionLogStreamOptionalParams,
  AgentsListSessionsOptionalParams,
  AgentsStopSessionOptionalParams,
  AgentsDeleteSessionOptionalParams,
  AgentsGetSessionOptionalParams,
  AgentsCreateSessionOptionalParams,
  AgentsDisableOptionalParams,
  AgentsEnableOptionalParams,
  AgentsDownloadAgentCodeOptionalParams,
  AgentsCreateVersionFromCodeOptionalParams,
  AgentsPatchAgentObjectOptionalParams,
  AgentsListVersionsOptionalParams,
  AgentsDeleteVersionOptionalParams,
  AgentsGetVersionOptionalParams,
  AgentsCreateAgentVersionFromManifestOptionalParams,
  AgentsCreateVersionOptionalParams,
  AgentsListOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsGenerateAgentOptionalParams,
  AgentsCreateAgentOptionalParams,
  AgentsGetOptionalParams,
} from "../../api/agents/options.js";
import {
  Agent,
  AgentVersion,
  AgentDefinitionUnion,
  DeleteAgentResponse,
  DeleteAgentVersionResponse,
  CreateAgentVersionFromCodeContent,
  VersionIndicatorUnion,
  AgentSessionResource,
  SessionLogEvent,
  TelephonyBindingListItem,
  UpdateTelephonyBindingRequest,
  TelephonyCallSummary,
  TelephonyCallRecord,
  TelephonyTransferTargets,
  TelephonyTransferTarget,
  Microsoft365PublishScope,
  Microsoft365PublishResponse,
  Microsoft365PublishDefaults,
  SessionFileWriteResponse,
  SessionDirectoryEntry,
  GenerateAgentRequest,
  CreateTelephonyBindingRequest,
  AgentsDownloadSessionFileResponse,
  GetMicrosoft365PackageResponse,
  AgentsUpdateTelephonyBindingResponse,
  AgentsGetTelephonyBindingResponse,
  AgentsCreateTelephonyBindingResponse,
  AgentsDownloadAgentCodeResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /**
   * Deletes the specified file or directory from the session sandbox.
   * When `recursive` is false, deleting a non-empty directory returns 409 Conflict.
   */
  deleteSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    options?: AgentsDeleteSessionFileOptionalParams,
  ) => Promise<void>;
  /**
   * Returns files and directories at the specified path in the session sandbox.
   * The response includes only the immediate children of the target directory and defaults to the session home directory when no path is supplied.
   */
  listSessionFiles: (
    agentName: string,
    agentSessionId: string,
    options?: AgentsListSessionFilesOptionalParams,
  ) => PagedAsyncIterableIterator<SessionDirectoryEntry>;
  /**
   * Downloads the file at the specified sandbox path as a binary stream.
   * The path is resolved relative to the session home directory.
   */
  downloadSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    options?: AgentsDownloadSessionFileOptionalParams,
  ) => Promise<AgentsDownloadSessionFileResponse>;
  /**
   * Uploads binary file content to the specified path in the session sandbox.
   * The service stores the file relative to the session home directory and rejects payloads larger than 50 MB.
   */
  uploadSessionFile: (
    agentName: string,
    agentSessionId: string,
    path: string,
    content: Uint8Array,
    options?: AgentsUploadSessionFileOptionalParams,
  ) => Promise<SessionFileWriteResponse>;
  /**
   * Returns default and previously-published values used to pre-populate a Microsoft 365 publish
   * request for a Foundry agent.
   */
  getMicrosoft365PublishDefaults: (
    agentName: string,
    options?: GetMicrosoft365PublishDefaultsOptionalParams,
  ) => Promise<Microsoft365PublishDefaults>;
  /**
   * Generates the Microsoft Teams app package (zip) for a Foundry agent from the supplied publish
   * request, without publishing it. Returns the app package as `application/zip`.
   */
  getMicrosoft365Package: (
    agentName: string,
    publishScope: Microsoft365PublishScope,
    options?: GetMicrosoft365PackageOptionalParams,
  ) => Promise<GetMicrosoft365PackageResponse>;
  /**
   * Publishes a Foundry agent to Microsoft 365 / Microsoft Teams and returns the published title and
   * Teams app ids.
   */
  publishToMicrosoft365: (
    agentName: string,
    publishScope: Microsoft365PublishScope,
    options?: PublishToMicrosoft365OptionalParams,
  ) => Promise<Microsoft365PublishResponse>;
  /** Replaces all transfer targets configured for the voice agent named in the path. */
  replaceTelephonyTransferTargets: (
    agentName: string,
    ifMatch: string,
    transferTargets: TelephonyTransferTarget[],
    options?: AgentsReplaceTelephonyTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Returns all transfer targets configured for the voice agent named in the path. */
  getTelephonyTransferTargets: (
    agentName: string,
    options?: AgentsGetTelephonyTransferTargetsOptionalParams,
  ) => Promise<TelephonyTransferTargets>;
  /** Ends an active inbound call owned by the voice agent named in the path. */
  endTelephonyCall: (
    agentName: string,
    callId: string,
    options?: AgentsEndTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Transfers an active inbound call to a configured target for the voice agent named in the path. */
  transferTelephonyCall: (
    agentName: string,
    callId: string,
    target: string,
    options?: AgentsTransferTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Retrieves a durable inbound call record owned by the voice agent named in the path. */
  getTelephonyCall: (
    agentName: string,
    callId: string,
    options?: AgentsGetTelephonyCallOptionalParams,
  ) => Promise<TelephonyCallRecord>;
  /** Returns the durable inbound call history for the voice agent named in the path. */
  listTelephonyCalls: (
    agentName: string,
    options?: AgentsListTelephonyCallsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyCallSummary>;
  /** Deletes a telephony binding owned by the voice agent named in the path. */
  deleteTelephonyBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    options?: AgentsDeleteTelephonyBindingOptionalParams,
  ) => Promise<void>;
  /** Updates a telephony binding owned by the voice agent named in the path. */
  updateTelephonyBinding: (
    agentName: string,
    bindingId: string,
    ifMatch: string,
    body: UpdateTelephonyBindingRequest,
    options?: AgentsUpdateTelephonyBindingOptionalParams,
  ) => Promise<AgentsUpdateTelephonyBindingResponse>;
  /** Retrieves a telephony binding owned by the voice agent named in the path. */
  getTelephonyBinding: (
    agentName: string,
    bindingId: string,
    options?: AgentsGetTelephonyBindingOptionalParams,
  ) => Promise<AgentsGetTelephonyBindingResponse>;
  /** Returns the telephony bindings owned by the voice agent named in the path. */
  listTelephonyBindings: (
    agentName: string,
    options?: AgentsListTelephonyBindingsOptionalParams,
  ) => PagedAsyncIterableIterator<TelephonyBindingListItem>;
  /** Creates a telephony binding for the voice agent named in the path. */
  createTelephonyBinding: (
    agentName: string,
    body: CreateTelephonyBindingRequest,
    options?: AgentsCreateTelephonyBindingOptionalParams,
  ) => Promise<AgentsCreateTelephonyBindingResponse>;
  /**
   * Streams console logs (stdout / stderr) for a specific hosted agent session
   * as a Server-Sent Events (SSE) stream.
   *
   * Each SSE frame contains:
   * - `event`: always `"log"`
   * - `data`: a plain-text log line (currently JSON-formatted, but the schema
   * is not contractual and may include additional keys or change format
   * over time — clients should treat it as an opaque string)
   *
   * Example SSE frames:
   * ```
   * event: log
   * data: {"timestamp":"2026-03-10T09:33:17.121Z","stream":"stdout","message":"Starting FoundryCBAgent server on port 8088"}
   *
   * event: log
   * data: {"timestamp":"2026-03-10T09:33:17.130Z","stream":"stderr","message":"INFO: Application startup complete."}
   *
   * event: log
   * data: {"timestamp":"2026-03-10T09:34:52.714Z","stream":"status","message":"Successfully connected to container"}
   *
   * event: log
   * data: {"timestamp":"2026-03-10T09:35:52.714Z","stream":"status","message":"No logs since last 60 seconds"}
   * ```
   *
   * The stream remains open until the client disconnects or the server
   * terminates the connection. Clients should handle reconnection as needed.
   */
  getSessionLogStream: (
    agentName: string,
    agentVersion: string,
    sessionId: string,
    options?: AgentsGetSessionLogStreamOptionalParams,
  ) => Promise<SessionLogEvent>;
  /** Returns a paged collection of sessions associated with the specified agent endpoint. */
  listSessions: (
    agentName: string,
    options?: AgentsListSessionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentSessionResource>;
  /** Terminates the specified hosted agent session and returns 204 No Content when the request succeeds. */
  stopSession: (
    agentName: string,
    sessionId: string,
    options?: AgentsStopSessionOptionalParams,
  ) => Promise<void>;
  /**
   * Deletes a session synchronously.
   * Returns 204 No Content when the session is deleted or does not exist.
   */
  deleteSession: (
    agentName: string,
    sessionId: string,
    options?: AgentsDeleteSessionOptionalParams,
  ) => Promise<void>;
  /** Retrieves the details of a hosted agent session by agent name and session identifier. */
  getSession: (
    agentName: string,
    sessionId: string,
    options?: AgentsGetSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
  /**
   * Creates a new session for an agent endpoint.
   * The endpoint resolves the backing agent version from `version_indicator` and
   * enforces session ownership using the provided user identity for session-mutating operations.
   */
  createSession: (
    agentName: string,
    versionIndicator: VersionIndicatorUnion,
    options?: AgentsCreateSessionOptionalParams,
  ) => Promise<AgentSessionResource>;
  /**
   * Disables the specified agent, preventing it from accepting new sessions or processing requests.
   * Existing active sessions are allowed to drain gracefully but no new sessions can be created.
   * This operation is idempotent — disabling an already-disabled agent returns success with no side effects.
   */
  disable: (agentName: string, options?: AgentsDisableOptionalParams) => Promise<void>;
  /**
   * Enables the specified agent, allowing it to accept new sessions and process requests.
   * This operation is idempotent — enabling an already-enabled agent returns success with no side effects.
   */
  enable: (agentName: string, options?: AgentsEnableOptionalParams) => Promise<void>;
  /**
   * Downloads the code zip for a code-based hosted agent.
   * Returns the previously-uploaded zip (`application/zip`).
   *
   * If `agent_version` is supplied, returns that version's code zip; otherwise
   * returns the latest version's code zip.
   *
   * The SHA-256 digest of the returned bytes matches the `content_hash` on the
   * resolved version's `code_configuration`.
   */
  downloadAgentCode: (
    agentName: string,
    options?: AgentsDownloadAgentCodeOptionalParams,
  ) => Promise<AgentsDownloadAgentCodeResponse>;
  /**
   * Creates a new agent version from code. Uploads the code zip and creates a new version
   * for an existing agent. The SHA-256 hex digest of the zip is provided in the
   * `x-ms-code-zip-sha256` header for integrity and dedup.
   * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
   * Maximum upload size is 250 MB.
   */
  createVersionFromCode: (
    agentName: string,
    codeZipSha256: string,
    content: CreateAgentVersionFromCodeContent,
    options?: AgentsCreateVersionFromCodeOptionalParams,
  ) => Promise<AgentVersion>;
  /** Applies a merge-patch update to the specified agent endpoint configuration. */
  patchAgentObject: (
    agentName: string,
    options?: AgentsPatchAgentObjectOptionalParams,
  ) => Promise<Agent>;
  /** Returns a paged collection of versions for the specified agent. */
  listVersions: (
    agentName: string,
    options?: AgentsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<AgentVersion>;
  /**
   * Deletes a specific version of an agent. For hosted agents, if the version has active
   * sessions, the request is rejected with HTTP 409 unless `force` is set to true. When
   * force is true, all sessions associated with this version are cascade-deleted.
   */
  deleteVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsDeleteVersionOptionalParams,
  ) => Promise<DeleteAgentVersionResponse>;
  /** Retrieves the specified version of an agent by its agent name and version identifier. */
  getVersion: (
    agentName: string,
    agentVersion: string,
    options?: AgentsGetVersionOptionalParams,
  ) => Promise<AgentVersion>;
  /** Imports the provided manifest to create a new version for the specified agent. */
  createAgentVersionFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentVersionFromManifestOptionalParams,
  ) => Promise<AgentVersion>;
  /** Creates a new version for the specified agent and returns the created version resource. */
  createVersion: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateVersionOptionalParams,
  ) => Promise<AgentVersion>;
  /** Returns a paged collection of agent resources. */
  list: (options?: AgentsListOptionalParams) => PagedAsyncIterableIterator<Agent>;
  /**
   * Deletes an agent. For hosted agents, if any version has active sessions, the request
   * is rejected with HTTP 409 unless `force` is set to true. When force is true, all
   * associated sessions are cascade-deleted along with the agent and its versions.
   */
  delete: (agentName: string, options?: AgentsDeleteOptionalParams) => Promise<DeleteAgentResponse>;
  /**
   * Updates the agent from a manifest by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateAgentFromManifest: (
    agentName: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsUpdateAgentFromManifestOptionalParams,
  ) => Promise<Agent>;
  /** Imports the provided manifest to create an agent and returns the created resource. */
  createAgentFromManifest: (
    name: string,
    manifestId: string,
    parameterValues: Record<string, any>,
    options?: AgentsCreateAgentFromManifestOptionalParams,
  ) => Promise<Agent>;
  /**
   * Updates the agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateAgent: (
    agentName: string,
    definition: AgentDefinitionUnion,
    options?: AgentsUpdateAgentOptionalParams,
  ) => Promise<Agent>;
  /**
   * Generates and creates an agent from kind-specific high-level inputs.
   * The generated definition remains fully editable through the standard agent versioning operations.
   */
  generateAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    body: GenerateAgentRequest,
    options?: AgentsGenerateAgentOptionalParams,
  ) => Promise<Agent>;
  /** Creates a new agent or a new version of an existing agent. */
  createAgent: (
    name: string,
    definition: AgentDefinitionUnion,
    options?: AgentsCreateAgentOptionalParams,
  ) => Promise<Agent>;
  /** Retrieves an agent definition by its unique name. */
  get: (agentName: string, options?: AgentsGetOptionalParams) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    deleteSessionFile: (
      agentName: string,
      agentSessionId: string,
      path: string,
      options?: AgentsDeleteSessionFileOptionalParams,
    ) => deleteSessionFile(context, agentName, agentSessionId, path, options),
    listSessionFiles: (
      agentName: string,
      agentSessionId: string,
      options?: AgentsListSessionFilesOptionalParams,
    ) => listSessionFiles(context, agentName, agentSessionId, options),
    downloadSessionFile: (
      agentName: string,
      agentSessionId: string,
      path: string,
      options?: AgentsDownloadSessionFileOptionalParams,
    ) => downloadSessionFile(context, agentName, agentSessionId, path, options),
    uploadSessionFile: (
      agentName: string,
      agentSessionId: string,
      path: string,
      content: Uint8Array,
      options?: AgentsUploadSessionFileOptionalParams,
    ) => uploadSessionFile(context, agentName, agentSessionId, path, content, options),
    getMicrosoft365PublishDefaults: (
      agentName: string,
      options?: GetMicrosoft365PublishDefaultsOptionalParams,
    ) => getMicrosoft365PublishDefaults(context, agentName, options),
    getMicrosoft365Package: (
      agentName: string,
      publishScope: Microsoft365PublishScope,
      options?: GetMicrosoft365PackageOptionalParams,
    ) => getMicrosoft365Package(context, agentName, publishScope, options),
    publishToMicrosoft365: (
      agentName: string,
      publishScope: Microsoft365PublishScope,
      options?: PublishToMicrosoft365OptionalParams,
    ) => publishToMicrosoft365(context, agentName, publishScope, options),
    replaceTelephonyTransferTargets: (
      agentName: string,
      ifMatch: string,
      transferTargets: TelephonyTransferTarget[],
      options?: AgentsReplaceTelephonyTransferTargetsOptionalParams,
    ) => replaceTelephonyTransferTargets(context, agentName, ifMatch, transferTargets, options),
    getTelephonyTransferTargets: (
      agentName: string,
      options?: AgentsGetTelephonyTransferTargetsOptionalParams,
    ) => getTelephonyTransferTargets(context, agentName, options),
    endTelephonyCall: (
      agentName: string,
      callId: string,
      options?: AgentsEndTelephonyCallOptionalParams,
    ) => endTelephonyCall(context, agentName, callId, options),
    transferTelephonyCall: (
      agentName: string,
      callId: string,
      target: string,
      options?: AgentsTransferTelephonyCallOptionalParams,
    ) => transferTelephonyCall(context, agentName, callId, target, options),
    getTelephonyCall: (
      agentName: string,
      callId: string,
      options?: AgentsGetTelephonyCallOptionalParams,
    ) => getTelephonyCall(context, agentName, callId, options),
    listTelephonyCalls: (agentName: string, options?: AgentsListTelephonyCallsOptionalParams) =>
      listTelephonyCalls(context, agentName, options),
    deleteTelephonyBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      options?: AgentsDeleteTelephonyBindingOptionalParams,
    ) => deleteTelephonyBinding(context, agentName, bindingId, ifMatch, options),
    updateTelephonyBinding: (
      agentName: string,
      bindingId: string,
      ifMatch: string,
      body: UpdateTelephonyBindingRequest,
      options?: AgentsUpdateTelephonyBindingOptionalParams,
    ) => updateTelephonyBinding(context, agentName, bindingId, ifMatch, body, options),
    getTelephonyBinding: (
      agentName: string,
      bindingId: string,
      options?: AgentsGetTelephonyBindingOptionalParams,
    ) => getTelephonyBinding(context, agentName, bindingId, options),
    listTelephonyBindings: (
      agentName: string,
      options?: AgentsListTelephonyBindingsOptionalParams,
    ) => listTelephonyBindings(context, agentName, options),
    createTelephonyBinding: (
      agentName: string,
      body: CreateTelephonyBindingRequest,
      options?: AgentsCreateTelephonyBindingOptionalParams,
    ) => createTelephonyBinding(context, agentName, body, options),
    getSessionLogStream: (
      agentName: string,
      agentVersion: string,
      sessionId: string,
      options?: AgentsGetSessionLogStreamOptionalParams,
    ) => getSessionLogStream(context, agentName, agentVersion, sessionId, options),
    listSessions: (agentName: string, options?: AgentsListSessionsOptionalParams) =>
      listSessions(context, agentName, options),
    stopSession: (
      agentName: string,
      sessionId: string,
      options?: AgentsStopSessionOptionalParams,
    ) => stopSession(context, agentName, sessionId, options),
    deleteSession: (
      agentName: string,
      sessionId: string,
      options?: AgentsDeleteSessionOptionalParams,
    ) => deleteSession(context, agentName, sessionId, options),
    getSession: (agentName: string, sessionId: string, options?: AgentsGetSessionOptionalParams) =>
      getSession(context, agentName, sessionId, options),
    createSession: (
      agentName: string,
      versionIndicator: VersionIndicatorUnion,
      options?: AgentsCreateSessionOptionalParams,
    ) => createSession(context, agentName, versionIndicator, options),
    disable: (agentName: string, options?: AgentsDisableOptionalParams) =>
      disable(context, agentName, options),
    enable: (agentName: string, options?: AgentsEnableOptionalParams) =>
      enable(context, agentName, options),
    downloadAgentCode: (agentName: string, options?: AgentsDownloadAgentCodeOptionalParams) =>
      downloadAgentCode(context, agentName, options),
    createVersionFromCode: (
      agentName: string,
      codeZipSha256: string,
      content: CreateAgentVersionFromCodeContent,
      options?: AgentsCreateVersionFromCodeOptionalParams,
    ) => createVersionFromCode(context, agentName, codeZipSha256, content, options),
    patchAgentObject: (agentName: string, options?: AgentsPatchAgentObjectOptionalParams) =>
      patchAgentObject(context, agentName, options),
    listVersions: (agentName: string, options?: AgentsListVersionsOptionalParams) =>
      listVersions(context, agentName, options),
    deleteVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsDeleteVersionOptionalParams,
    ) => deleteVersion(context, agentName, agentVersion, options),
    getVersion: (
      agentName: string,
      agentVersion: string,
      options?: AgentsGetVersionOptionalParams,
    ) => getVersion(context, agentName, agentVersion, options),
    createAgentVersionFromManifest: (
      agentName: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsCreateAgentVersionFromManifestOptionalParams,
    ) => createAgentVersionFromManifest(context, agentName, manifestId, parameterValues, options),
    createVersion: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateVersionOptionalParams,
    ) => createVersion(context, agentName, definition, options),
    list: (options?: AgentsListOptionalParams) => list(context, options),
    delete: (agentName: string, options?: AgentsDeleteOptionalParams) =>
      $delete(context, agentName, options),
    updateAgentFromManifest: (
      agentName: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsUpdateAgentFromManifestOptionalParams,
    ) => updateAgentFromManifest(context, agentName, manifestId, parameterValues, options),
    createAgentFromManifest: (
      name: string,
      manifestId: string,
      parameterValues: Record<string, any>,
      options?: AgentsCreateAgentFromManifestOptionalParams,
    ) => createAgentFromManifest(context, name, manifestId, parameterValues, options),
    updateAgent: (
      agentName: string,
      definition: AgentDefinitionUnion,
      options?: AgentsUpdateAgentOptionalParams,
    ) => updateAgent(context, agentName, definition, options),
    generateAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      body: GenerateAgentRequest,
      options?: AgentsGenerateAgentOptionalParams,
    ) => generateAgent(context, foundryFeatures, body, options),
    createAgent: (
      name: string,
      definition: AgentDefinitionUnion,
      options?: AgentsCreateAgentOptionalParams,
    ) => createAgent(context, name, definition, options),
    get: (agentName: string, options?: AgentsGetOptionalParams) => get(context, agentName, options),
  };
}

export function _getAgentsOperations(context: AIProjectContext): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
