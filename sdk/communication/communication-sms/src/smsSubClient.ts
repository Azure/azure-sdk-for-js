// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { tracingClient } from "./generated/src/tracing.js";
import type { SmsApiClient } from "./generated/src/smsApiClient.js";
import { extractOperationOptions } from "./extractOperationOptions.js";
import { generateSendMessageRequest } from "./utils/smsUtils.js";
import type { OperationOptions } from "@azure/core-client";

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
 * A SmsClient represents a sub-client to the Azure Communication SMS service allowing you
 * to send SMS messages.
 */
export interface SmsClient {
  /**
   * Sends an SMS from a phone number that is acquired by the authenticated account, to another phone number.
   *
   * @param sendRequest - Provides the sender's and recipient's phone numbers, and the contents of the message
   * @param options - Additional request options
   */
  send(sendRequest: SmsSendRequest, options?: SmsSendOptions): Promise<SmsSendResult[]>;
}

/**
 * Implementation of the SmsClient interface for sending SMS messages.
 */
export class SmsClientImpl {
  private readonly api: SmsApiClient;

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(api: SmsApiClient) {
    this.api = api;
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
