// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import {
  AlphaIdConfiguration,
  GetConfigurationOptions,
  UpsertConfigurationOptions,
} from "./models";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { AlphaIDsClient as AlphaIDsGeneratedClient } from "./generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";
/**
 * Client options used to configure the AlphaIdsClient API requests.
 */
export interface AlphaIdsClientOptions extends CommonClientOptions {}

const isAlphaIdsClientOptions = (options: any): options is AlphaIdsClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

export class AlphaIdsClient {
  /**
   * A reference to the auto-generated AlphaIDs HTTP client.
   */
  private readonly client: AlphaIDsGeneratedClient;

  public constructor(connectionString: string, options?: AlphaIdsClientOptions);

  public constructor(endpoint: string, credential: KeyCredential, options?: AlphaIdsClientOptions);

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: AlphaIdsClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | AlphaIdsClientOptions,
    maybeOptions: AlphaIdsClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isAlphaIdsClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new AlphaIDsGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  public getConfiguration(options: GetConfigurationOptions = {}): Promise<AlphaIdConfiguration> {
    return tracingClient.withSpan(
      "AlphaIdsClient-getConfiguration",
      options,
      async (updatedOptions) => {
        return this.client.alphaIds.getConfiguration(updatedOptions);
      }
    );
  }

  public upsertConfiguration(
    enabled: boolean,
    options: UpsertConfigurationOptions = {}
  ): Promise<AlphaIdConfiguration> {
    return tracingClient.withSpan(
      "AlphaIdsClient-upsertConfiguration",
      options,
      async (updatedOptions) => {
        return this.client.alphaIds.upsertConfiguration(enabled, updatedOptions);
      }
    );
  }
}
