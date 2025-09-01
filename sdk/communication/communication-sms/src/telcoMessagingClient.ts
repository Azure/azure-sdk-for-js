// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import type { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { SmsApiClient } from "./generated/src/smsApiClient.js";
import { logger } from "./logger.js";
import { OptOutsClientImpl, type OptOutsClient } from "./optOutsClient.js";
import { SmsClientImpl, type SmsClient } from "./smsSubClient.js";

import { tracingClient } from "./generated/src/tracing.js";
import { extractOperationOptions } from "./extractOperationOptions.js";

/**
 * Client options used to configure the TelcoMessaging Client.
 */
export interface TelcoMessagingClientOptions extends CommonClientOptions {}

/**
 * Checks whether the type of a value is SmsClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isTelcoMessagingClientOptions = (options: any): options is TelcoMessagingClientOptions =>
  !!options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 * A TelcoMessagingClient represents a Client to the Azure Communication Sms service allowing you
 * to send SMS messages and manage opt-outs.
 */
export class TelcoMessagingClient {
  private readonly api: SmsApiClient;
  /**
   * A OptOutsClient represents a Client to the Azure Communication Sms service allowing you
   * to call Opt Out Management Api methods.
   */
  public optOuts: OptOutsClient;
  /**
   * A SmsClient represents a sub-client to the Azure Communication SMS service allowing you
   * to send SMS messages.
   */
  public sms: SmsClient;

  /**
   * A DeliveryReportsClient represents a sub-client to the Azure Communication SMS service allowing you
   * to get delivery reports for sent messages.
   */
  public deliveryReports: DeliveryReportsClient;

  /**
   * Initializes a new instance of the TelcoMessagingClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: TelcoMessagingClientOptions);

  /**
   * Initializes a new instance of the TelcoMessagingClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: TelcoMessagingClientOptions);

  /**
   * Initializes a new instance of the TelcoMessagingClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: TelcoMessagingClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | TelcoMessagingClientOptions,
    maybeOptions: TelcoMessagingClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isTelcoMessagingClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    this.api = new SmsApiClient(url, internalPipelineOptions);
    this.api.pipeline.addPolicy(authPolicy);
    this.optOuts = new OptOutsClientImpl(this.api);
    this.sms = new SmsClientImpl(this.api);
    this.deliveryReports = new DeliveryReportsClientImpl(this.api);
  }
}

// Re-export SMS-related types and interfaces from smsSubClient
export type {
  SmsClient,
  SmsSendRequest,
  SmsSendOptions,
  SmsSendResult,
  MessagingConnectOptions,
} from "./smsSubClient.js";

// Re-export OptOuts-related types and interfaces from optOutsClient
export type {
  OptOutsClient,
  AddOptions,
  CheckOptions,
  RemoveOptions,
  OptOutCheckResult,
  OptOutAddResult,
  OptOutRemoveResult,
} from "./optOutsClient.js";

// Re-export generated types for convenience
export type { 
  DeliveryAttempt, 
  DeliveryReportDeliveryStatus, 
  KnownDeliveryReportDeliveryStatus 
} from "./generated/src/index.js";
