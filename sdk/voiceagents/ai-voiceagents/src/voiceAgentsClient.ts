// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import {
  VoiceAgentsClient as GeneratedVoiceAgentsClient,
  type VoiceAgentsClientOptionalParams,
} from "./generated/index.js";
import {
  VoiceAgentStreamingClient,
  type VoiceAgentStreamingClientOptions,
} from "./streaming/voiceAgentStreamingClient.js";

/** Options for the Voice Agents client. */
export interface VoiceAgentsClientOptions extends VoiceAgentsClientOptionalParams {
  /** Options applied to the streaming operation group. */
  streamingOptions?: VoiceAgentStreamingClientOptions;
}

/**
 * Root client for managing voice agents and establishing live streaming connections.
 */
export class VoiceAgentsClient extends GeneratedVoiceAgentsClient {
  /** Operations for establishing live voice-agent connections. */
  public readonly streaming: VoiceAgentStreamingClient;

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options: VoiceAgentsClientOptions = {},
  ) {
    const { streamingOptions, ...managementOptions } = options;
    super(endpoint, credential, managementOptions);

    this.streaming = new VoiceAgentStreamingClient(
      managementOptions.endpoint ?? endpoint,
      credential,
      {
        ...streamingOptions,
        apiVersion: streamingOptions?.apiVersion ?? managementOptions.apiVersion,
        credentialScopes:
          streamingOptions?.credentialScopes ?? managementOptions.credentials?.scopes,
        userAgentPrefix:
          streamingOptions?.userAgentPrefix ?? managementOptions.userAgentOptions?.userAgentPrefix,
      },
    );
  }
}
