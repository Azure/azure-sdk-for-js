// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VoiceAgentsContext,
  VoiceAgentsClientOptionalParams,
  createVoiceAgents,
} from "./api/index.js";
import {
  AgentEndpointConversationsOperations,
  _getAgentEndpointConversationsOperations,
} from "./classic/agentEndpointConversations/index.js";
import {
  VoiceAgentWebSocketOperations,
  _getVoiceAgentWebSocketOperations,
} from "./classic/voiceAgentWebSocket/index.js";
import { VoiceAgentsOperations, _getVoiceAgentsOperations } from "./classic/voiceAgents/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { VoiceAgentsClientOptionalParams } from "./api/voiceAgentsContext.js";

export class VoiceAgentsClient {
  private _client: VoiceAgentsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: VoiceAgentsClientOptionalParams = {},
  ) {
    this._client = createVoiceAgents(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
    this.voiceAgents = _getVoiceAgentsOperations(this._client);
    this.agentEndpointConversations = _getAgentEndpointConversationsOperations(this._client);
    this.voiceAgentWebSocket = _getVoiceAgentWebSocketOperations(this._client);
  }

  /** The operation groups for voiceAgents */
  public readonly voiceAgents: VoiceAgentsOperations;
  /** The operation groups for agentEndpointConversations */
  public readonly agentEndpointConversations: AgentEndpointConversationsOperations;
  /** The operation groups for voiceAgentWebSocket */
  public readonly voiceAgentWebSocket: VoiceAgentWebSocketOperations;
}
