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
import { extractOperationOptions } from "./extractOperationOptions.js";
import { generateSendMessageRequest } from "./utils/smsUtils.js";
import { logger } from "./logger.js";
import { tracingClient } from "./generated/src/tracing.js";
import { OptOutsClient as OptOutsClientImpl } from "./optOutsClient.js";

/**
 * Client options used to configure SMS Client API requests.
 */
export interface SmsClientOptions extends CommonClientOptions {}

/**
 * Values used to configure Sms message
 */
export interface SmsSendRequest {
  /**
   * The sender's phone number in E.164 format that is owned by the authenticated account.
   */
  from: string;
  /**
   * The list of recipient's phone number in E.164 format.
   */
  to: string[];
  /**
   * The contents of the message that will be sent to the recipient. The allowable content is
   * defined by RFC 5724.
   */
  message: string;
}

/**
 * Options to configure Sms requests.
 */
export interface SmsSendOptions extends OperationOptions {
  /**
   * Enable this flag to receive a delivery report for this message on the Azure Resource
   * EventGrid. Default value: false.
   */
  enableDeliveryReport?: boolean;
  /**
   * Use this field to provide metadata that will then be sent back in the corresponding Delivery
   * Report.
   */
  tag?: string;
  /** Time to wait for a delivery report. After this time a delivery report with timeout error code is generated. */
  deliveryReportTimeoutInSeconds?: number;

  /** Defines optional parameters for connecting with the Messaging Connect Partner to deliver SMS. */
  messagingConnect?: MessagingConnectOptions;
}

/** Defines optional parameters for connecting with the Messaging Connect Partner to deliver SMS. */
export interface MessagingConnectOptions {
  /** Represents the API key associated with the customer's account in the Messaging Connect Partner portal. */
  apiKey: string;
  /** Specifies the partner associated with the API key. */
  partner: string;
}

/**
 * The result of Sms send request.
 */
export interface SmsSendResult {
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * The identifier of the outgoing Sms message. Only present if message processed.
   */
  messageId?: string;
  /**
   * HTTP Status code.
   */
  httpStatusCode: number;
  /**
   * Indicates if the message is processed successfully or not.
   */
  successful: boolean;
  /**
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string;
}

/**
 * A OptOutsClient represents a Client to the Azure Communication Sms service allowing you
 * to call Opt Out Management Api methods.
 */
export interface OptOutsClient {
  /**
   * Adds phone numbers to the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  add(from: string, to: string[], options?: AddOptions): Promise<OptOutAddResult[]>;
  /**
   * Checks if phone numbers are in the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  check(from: string, to: string[], options?: CheckOptions): Promise<OptOutCheckResult[]>;
  /**
   * Removes phone numbers from the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  remove(from: string, to: string[], options?: RemoveOptions): Promise<OptOutRemoveResult[]>;
}

/**
 * Client options used to configure OptOuts Client API Add requests.
 */
export interface AddOptions extends OperationOptions {}

/**
 * Client options used to configure OptOuts Client API Check requests.
 */
export interface CheckOptions extends OperationOptions {}

/**
 * Client options used to configure OptOuts Client API Remove requests.
 */
export interface RemoveOptions extends OperationOptions {}

/**
 * The result of Opt Out Check request.
 */
export interface OptOutCheckResult {
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * Indicates if the recipient's phone number in opted out from receiving messages or not.
   */
  isOptedOut: boolean;
  /**
   * HTTP Status code.
   */
  httpStatusCode: number;
  /**
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string;
}

/**
 * The result of Opt Out Add request.
 */
export interface OptOutAddResult {
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * HTTP Status code.
   */
  httpStatusCode: number;
  /**
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string;
}

/**
 * The result of Opt Out Remove request.
 */
export interface OptOutRemoveResult {
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * HTTP Status code.
   */
  httpStatusCode: number;
  /**
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string;
}

/**
 * Checks whether the type of a value is SmsClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSmsClientOptions = (options: any): options is SmsClientOptions =>
  !!options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 * A SmsClient represents a Client to the Azure Communication Sms service allowing you
 * to send SMS messages.
 */
export class SmsClient {
  private readonly api: SmsApiClient;
  /**
   * A OptOutsClient represents a Client to the Azure Communication Sms service allowing you
   * to call Opt Out Management Api methods.
   */
  public optOuts: OptOutsClient;

  /**
   * Initializes a new instance of the SmsClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: SmsClientOptions);

  /**
   * Initializes a new instance of the SmsClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: SmsClientOptions);

  /**
   * Initializes a new instance of the SmsClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: SmsClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | SmsClientOptions,
    maybeOptions: SmsClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isSmsClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;

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
  }

  /**
   * Sends an SMS from a phone number that is acquired by the authenticated account, to another phone number.
   *
   * @param sendRequest - Provides the sender's and recipient's phone numbers, and the contents of the message
   * @param options - Additional request options
   */
  public async send(
    sendRequest: SmsSendRequest,
    options: SmsSendOptions = { enableDeliveryReport: false },
  ): Promise<SmsSendResult[]> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("SmsClient-Send", operationOptions, async (updatedOptions) => {
      const response = await this.api.sms.send(
        generateSendMessageRequest(sendRequest, restOptions),
        updatedOptions,
      );
      return response.value;
    });
  }
}
