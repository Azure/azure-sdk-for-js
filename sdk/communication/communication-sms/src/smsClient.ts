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
import { OptOutsClientImpl, type OptOuts } from "./optOutsClient.js";
import { ServiceVersion, DEFAULT_API_VERSION } from "./constants.js";
import type { DeliveryAttempt, DeliveryReportDeliveryStatus } from "./generated/src/index.js";

/**
 * Client options used to configure SMS Client API requests.
 */
export interface SmsClientOptions extends CommonClientOptions {
  /**
   * The API version to use when making requests to the service.
   * Defaults to "2026-01-23" if not specified.
   */
  apiVersion?: ServiceVersion;
}

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
  /**
   * Specifies the partner name for message delivery.
   */
  partner: string;
  /**
   * Partner-specific parameters as key-value pairs. Must contain at least one parameter
   * required by the messaging connect partner (e.g., apiKey, servicePlanId, authToken, etc.).
   */
  partnerParams: Record<string, unknown>;
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
 * The result of Delivery Report Get request.
 */
export interface SmsDeliveryReportResult {
  /**
   * The delivery status of the message.
   */
  deliveryStatus: DeliveryReportDeliveryStatus;
  /**
   * Detailed information about the delivery status.
   */
  deliveryStatusDetails?: string;
  /**
   * Array of delivery attempts made for this message.
   */
  deliveryAttempts?: DeliveryAttempt[];
  /**
   * The timestamp when the delivery report was received.
   */
  receivedTimestamp?: Date;
  /**
   * Custom tag provided when sending the message.
   */
  tag?: string;
  /**
   * The identifier of the outgoing message.
   */
  messageId: string;
  /**
   * The sender's phone number in E.164 format.
   */
  from: string;
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * HTTP Status code.
   */
  httpStatusCode?: number;
  /**
   * Optional messaging connect partner-specific message identifier for tracking across messaging connect partners.
   * This field is populated when messages are sent through messaging connect partners.
   */
  messagingConnectPartnerMessageId?: string;
}

/**
 * Options to configure delivery report requests.
 */
export interface GetDeliveryReportOptions extends OperationOptions {}

/**
 * Checks whether the type of a value is SmsClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSmsClientOptions = (options: any): options is SmsClientOptions =>
  !!options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 * A SmsClient represents a Client to the Azure Communication Sms service allowing you
 * to send SMS messages, retrieve delivery reports, and manage opt-outs.
 */
export class SmsClient {
  private readonly api: SmsApiClient;
  /**
   * A sub-client for managing opt-out operations.
   */
  public optOuts: OptOuts;
  /**
   * The API version being used by this client.
   */
  public readonly apiVersion: ServiceVersion;

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

    // Set the API version, defaulting to the latest version
    this.apiVersion = options.apiVersion ?? DEFAULT_API_VERSION;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    this.api = new SmsApiClient(url, { ...internalPipelineOptions, apiVersion: this.apiVersion });
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

  /**
   * Gets delivery report for a specific outgoing message.
   *
   * @param messageId - The identifier of the outgoing message
   * @param options - Additional request options
   */
  public async getDeliveryReport(
    messageId: string,
    options: GetDeliveryReportOptions = {},
  ): Promise<SmsDeliveryReportResult> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan(
      "SmsClient-GetDeliveryReport",
      operationOptions,
      async (updatedOptions) => {
        const response = await this.api.deliveryReports.get(messageId, updatedOptions);

        return {
          deliveryStatus: response.deliveryStatus,
          deliveryStatusDetails: response.deliveryStatusDetails,
          deliveryAttempts: response.deliveryAttempts,
          receivedTimestamp: response.receivedTimestamp,
          tag: response.tag,
          messageId: response.messageId,
          from: response.from,
          to: response.to,
          messagingConnectPartnerMessageId: response.messagingConnectPartnerMessageId,
          httpStatusCode: 200, // Success case
        };
      },
    );
  }
}
