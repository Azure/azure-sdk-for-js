// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { TokenCredential, createPipelineFromOptions, bearerTokenAuthenticationPolicy } from "@azure/core-http";
import { SynapseArtifacts } from "./synapseArtifacts";
import { AuthenticationClientOptions } from "./models";
import { logger } from "./utils/logger";
import { SDK_VERSION, DEFAULT_SYNAPSE_SCOPE } from "./utils/constants";

export class AuthenticationClient {
  /**
   * The base URL to the workspace
   */
  public readonly workspaceEndpoint: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated synapse accesscontrol HTTP client.
   */
  protected readonly client: SynapseArtifacts;

  constructor(
    workspaceEndpoint: string,
    credential: TokenCredential,
    pipelineOptions: AuthenticationClientOptions = {}
  ) {
    this.workspaceEndpoint = workspaceEndpoint;

    const libInfo = `azsdk-js-synapse-artifacts/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      ...pipelineOptions.userAgentOptions,
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = bearerTokenAuthenticationPolicy(
      credential,
      DEFAULT_SYNAPSE_SCOPE
    );

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new SynapseArtifacts(credential, workspaceEndpoint, pipeline);
  }
}
