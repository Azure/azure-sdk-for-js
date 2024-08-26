// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />
import {
  DynamicAlphaIdConfiguration,
  GetConfigurationOptions,
  UpsertConfigurationOptions,
  ListAlphaIdsOptions,
  GetDynamicAlphaIdCountriesOptions,
  GetPreRegisteredAlphaIdCountriesOptions,
  AlphaId,
  SupportedCountries,
} from "./models";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { AlphaIDsClient as AlphaIDsGeneratedClient } from "./generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { createAlphaIDsPagingPolicy } from "./utils/customPipelinePolicies";

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
    options?: AlphaIdsClientOptions,
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | AlphaIdsClientOptions,
    maybeOptions: AlphaIdsClientOptions = {},
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
    // This policy is a temporary workarounds to address compatibility issues with Azure Core V2.
    const alphaIDsPagingPolicy = createAlphaIDsPagingPolicy(url);
    this.client.pipeline.addPolicy(alphaIDsPagingPolicy);
  }

  public getDynamicAlphaIdConfiguration(
    options: GetConfigurationOptions = {},
  ): Promise<DynamicAlphaIdConfiguration> {
    return tracingClient.withSpan(
      "AlphaIdsClient-getConfiguration",
      options,
      async (updatedOptions) => {
        return this.client.alphaIds.getDynamicAlphaIdConfiguration(updatedOptions);
      },
    );
  }

  public upsertDynamicAlphaIdConfiguration(
    enabled: boolean,
    options: UpsertConfigurationOptions = {},
  ): Promise<DynamicAlphaIdConfiguration> {
    return tracingClient.withSpan(
      "AlphaIdsClient-upsertConfiguration",
      options,
      async (updatedOptions) => {
        return this.client.alphaIds.upsertDynamicAlphaIdConfiguration(enabled, updatedOptions);
      },
    );
  }

  public getAlphaIds(options: ListAlphaIdsOptions = {}): PagedAsyncIterableIterator<AlphaId> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "AlphaIdsClient-listAlphaIds",
      options,
    );
    try {
      return this.client.alphaIds.listAlphaIds(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public getDynamicAlphaIdCountries(
    options: GetDynamicAlphaIdCountriesOptions = {},
  ): Promise<SupportedCountries> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "AlphaIdsClient-getDynamicAlphaIdCountries",
      options,
    );
    try {
      return this.client.alphaIds.getDynamicAlphaIdCountries(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public getPreRegisteredAlphaIdCountries(
    options: GetPreRegisteredAlphaIdCountriesOptions = {},
  ): Promise<SupportedCountries> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "AlphaIdsClient-getPreRegisteredAlphaIdCountries",
      options,
    );
    try {
      return this.client.alphaIds.getPreRegisteredAlphaIdCountries(updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
