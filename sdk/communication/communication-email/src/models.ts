// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions } from "@azure/core-client";

/**
 * Client options used to configure SMS Client API requests.
 */
export interface EmailClientOptions extends CommonClientOptions {}

/**
 * Results of a sent email.
 */
export interface SendEmailResult {
  /**
   * MessageId of the sent email.
   */
  messageId: string;
}

export {
  EmailMessage,
  EmailContent,
  EmailRecipients,
  EmailAddress,
  EmailAttachment,
  SendStatus,
  SendStatusResult,
} from "./generated/src/models";
