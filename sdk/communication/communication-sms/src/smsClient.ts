// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy,
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase,
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { SmsApiClient } from "./generated/src/smsApiClient";
import { SDK_VERSION } from "./constants";
import { createSpan } from "./tracing";
import { logger } from "./logger";
import { extractOperationOptions } from "./extractOperationOptions";
import { generateSendMessageRequest } from "./utils/smsUtils";

/**
 * Client options used to configure SMS Client API requests.
 */
export interface SmsClientOptions extends PipelineOptions {}

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
 * Options to configure Sms requests
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
}

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
 * Checks whether the type of a value is SmsClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSmsClientOptions = (options: any): options is SmsClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * A SmsClient represents a Client to the Azure Communication Sms service allowing you
 * to send SMS messages.
 */
export class SmsClient {
  private readonly api: SmsApiClient;

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
    maybeOptions: SmsClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isSmsClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
    const libInfo = `azsdk-js-communication-sms/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.api = new SmsApiClient(url, pipeline);
  }

  /**
   * Sends an SMS from a phone number that is acquired by the authenticated account, to another phone number.
   *
   * @param sendRequest - Provides the sender's and recipient's phone numbers, and the contents of the message
   * @param options - Additional request options
   */
  public async send(
    sendRequest: SmsSendRequest,
    options: SmsSendOptions = { enableDeliveryReport: false }
  ): Promise<SmsSendResult[]> {
    const { operationOptions, restOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SmsClient-Send", operationOptions);

    try {
      const response = await this.api.sms.send(
        generateSendMessageRequest(sendRequest, restOptions),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response.value;
    } catch (e) {
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
