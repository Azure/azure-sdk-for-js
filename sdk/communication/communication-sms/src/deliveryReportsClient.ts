// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { tracingClient } from "./generated/src/tracing.js";
import type { 
  DeliveryAttempt,
  DeliveryReportDeliveryStatus,
} from "./generated/src/index.js";
import type { SmsApiClient } from "./generated/src/smsApiClient.js";
import { extractOperationOptions } from "./extractOperationOptions.js";
import type { OperationOptions } from "@azure/core-client";

/**
 * The result of Delivery Report Get request.
 */
export interface DeliveryReportGetResult {
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
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string | null;
}

/**
 * Client options used to configure DeliveryReports Client API Get requests.
 */
export interface DeliveryReportGetOptions extends OperationOptions {}

/**
 * A DeliveryReportsClient represents a Client to the Azure Communication SMS service allowing you
 * to get delivery reports for sent messages.
 */
export interface DeliveryReportsClient {
  /**
   * Gets delivery report for a specific outgoing message.
   *
   * @param messageId - The identifier of the outgoing message
   * @param options - Additional request options
   */
  get(messageId: string, options?: DeliveryReportGetOptions): Promise<DeliveryReportGetResult>;
}

/**
 * A DeliveryReportsClient represents a Client to the Azure Communication SMS service allowing you
 * to get delivery reports for sent messages.
 */
export class DeliveryReportsClientImpl implements DeliveryReportsClient {
  private readonly api: SmsApiClient;

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(api: SmsApiClient) {
    this.api = api;
  }

  /**
   * Gets delivery report for a specific outgoing message.
   *
   * @param messageId - The identifier of the outgoing message
   * @param options - Additional request options
   */
  public async get(
    messageId: string,
    options: DeliveryReportGetOptions = {},
  ): Promise<DeliveryReportGetResult> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("DeliveryReports-Get", operationOptions, async (updatedOptions) => {
      const response = await this.api.deliveryReports.get(messageId, updatedOptions);

      // Check if the response contains error information
      const httpStatusCode = (response as any).httpStatusCode || 200;
      const errorMessage = (response as any).errorMessage || null;

      return {
        deliveryStatus: response.deliveryStatus,
        deliveryStatusDetails: response.deliveryStatusDetails,
        deliveryAttempts: response.deliveryAttempts,
        receivedTimestamp: response.receivedTimestamp,
        tag: response.tag,
        messageId: response.messageId,
        from: response.from,
        to: response.to,
        httpStatusCode,
        errorMessage,
      };
    });
  }
}
