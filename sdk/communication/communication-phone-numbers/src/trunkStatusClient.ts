// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  GetTrunkStatusOptions,
  GetTrunksStatusOptions,
  TrunkOverallStatus,
  TrunkStatus,
  TrunksStatus,
  TrunkStatusPing,
  TrunkStatusTls,
} from "./models";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { createSpan, logger } from "./utils";
import { CommonClientOptions } from "@azure/core-client";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { SpanStatusCode } from "@azure/core-tracing";
import { TrunkStatusClient as TrunkStatusGeneratedClient } from "./generated/src/trunkstatus";
import { createPhoneNumbersPagingPolicy } from "./utils/customPipelinePolicies";

/**
 * Client options used to configure the PhoneNumbersClient API requests.
 */
export interface TrunkStatusClientOptions extends CommonClientOptions {}

const isPhoneNumbersClientOptions = (options: any): options is TrunkStatusClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

/**
 * Client class for interacting with Azure Communication Services Phone Number Administration.
 */
export class TrunkStatusClient {
  /**
   * A reference to the auto-generated PhoneNumber HTTP client.
   */
  private readonly client: TrunkStatusGeneratedClient;

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using a connection string.
   *
   * @param connectionString - Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: TrunkStatusClientOptions);

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using an Azure KeyCredential.
   *
   * @param endpoint - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: TrunkStatusClientOptions
  );

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: TrunkStatusClientOptions
  );

  public constructor(
    connectionStringOrEndpoint: string,
    credentialOrOptions?: KeyCredential | TokenCredential | TrunkStatusClientOptions,
    maybeOptions: TrunkStatusClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(
      connectionStringOrEndpoint,
      credentialOrOptions
    );
    const options = isPhoneNumbersClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new TrunkStatusGeneratedClient(url, {
      endpoint: url,
      ...internalPipelineOptions,
    });
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);

    // This policy is temporary workarounds to address compatibility issues with Azure Core V2.
    const phoneNumbersPagingPolicy = createPhoneNumbersPagingPolicy(url);
    this.client.pipeline.addPolicy(phoneNumbersPagingPolicy);
  }

  /**
   * Returns list of the statuses of configured SIP trunks.
   *
   * Status of all configured SIP trunks.
   *
   * @param options - The optional parameters.
   */
  public getTrunksStatus(options: GetTrunksStatusOptions = {}): Promise<TrunksStatus> {
    const { span, updatedOptions } = createSpan("TrunkStatusClient-getTrunksStatus", options);
    const trunks = this.client.getTrunksStatus(updatedOptions);
    span.end();
    return trunks as Promise<TrunksStatus>;
  }

  /**
   * Gets status of specified SIP trunk.
   *
   * @param fqdn - Fully qualified domain name of a SIP trunk.
   * @param options - Additional request options.
   */
  public async getTrunkStatus(
    fqdn: string,
    options: GetTrunkStatusOptions = {}
  ): Promise<TrunkStatus> {
    const { span, updatedOptions } = createSpan("TrunkStatusClient-getTrunkStatus", options);
    try {
      const ret = await this.client.getTrunkStatus(fqdn, updatedOptions);
      return {
        fqdn: ret.fqdn,
        tls: ret.tls as TrunkStatusTls,
        ping: ret.ping as TrunkStatusPing,
        trunkOverallStatus: ret.trunkOverallStatus as TrunkOverallStatus,
        lastUpdateTime: new Date(ret.lastUpdateTime),
      };
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
