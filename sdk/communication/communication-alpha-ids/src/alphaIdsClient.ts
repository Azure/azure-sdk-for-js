// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import {
  AlphaIdConfiguration,
  GetConfigurationOptions,
  UpsertConfigurationOptions,
} from "./models";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createSpan, logger } from "./utils";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { AlphaIDsClient as AlphaIDsGeneratedClient } from "./generated/src";
import { SpanStatusCode } from "@azure/core-tracing";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
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
    const { span, updatedOptions } = createSpan("AlphaIdsClient-getConfiguration", options);
    try {
      return this.client.alphaIds.getConfiguration(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public upsertConfiguration(
    enabled: boolean,
    options: UpsertConfigurationOptions = {}
  ): Promise<AlphaIdConfiguration> {
    const { span, updatedOptions } = createSpan("AlphaIdsClient-upsertConfiguration", options);
    try {
      return this.client.alphaIds.upsertConfiguration(enabled, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
