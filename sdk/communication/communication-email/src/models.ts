// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

/**
 * Client options used to configure SMS Client API requests.
 */
export interface EmailClientOptions extends PipelineOptions {}

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
  EmailCustomHeader,
  EmailContent,
  EmailImportance,
  EmailRecipients,
  EmailAddress,
  EmailAttachment,
  EmailAttachmentType,
  SendStatus,
  SendStatusResult,
} from "./generated/src/models";
