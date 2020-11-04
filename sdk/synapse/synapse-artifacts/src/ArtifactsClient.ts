// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";

import { ArtifactsClientOptions } from "./models";

import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./tracing";
import { SynapseArtifacts } from "./generated";
import { logger } from "./logger";
import { SDK_VERSION } from "./constants";
import { CanonicalCode } from "@opentelemetry/api";

import * as coreHttp from "@azure/core-http";
import { BigDataPoolsListResponse, BigDataPoolsGetResponse } from "./generated/models";

export class ArtifactsClient {
  /**
   * The base URL to the workspace
   */
  public readonly workspaceEndpoint: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated synapse accesscontrol HTTP client.
   */
  private readonly client: SynapseArtifacts;

  constructor(
    workspaceEndpoint: string,
    credential: TokenCredential,
    pipelineOptions: ArtifactsClientOptions = {}
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
      "https://dev.azuresynapse.net/.default"
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

  public async ListBigDataPools(
    options: coreHttp.OperationOptions = {}
  ): Promise<BigDataPoolsListResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListBigDataPools", options);

    try {
      const response = await this.client.bigDataPools.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async GetBigDataPool(
    bigDataPoolName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<BigDataPoolsGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetBigDataPool", options);

    try {
      const response = await this.client.bigDataPools.get(
        bigDataPoolName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
