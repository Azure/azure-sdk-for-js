// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Client options used to configure Email Client API requests.
 */
export interface EmailClientOptions extends CommonClientOptions {}

/** Content of the email. */
export type EmailContent = HtmlEmailContent | PlainTextEmailContent;

/** Content of the email with a required html property. */
export interface HtmlEmailContent {
  /** Subject of the email message */
  subject: string;
  /** Plain text version of the email message. */
  plainText?: string;
  /** Html version of the email message. */
  html: string;
}

/** Content of the email with a required plainText property. */
export interface PlainTextEmailContent {
  /** Subject of the email message */
  subject: string;
  /** Plain text version of the email message. */
  plainText: string;
  /** Html version of the email message. */
  html?: string;
}

/** Optional parameters for the beginSend method. */
export interface EmailSendOptionalParams extends OperationOptions {
  /** This is the ID used by the status monitor for this long running operation. */
  operationId?: string;
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}

export {
  EmailRecipients,
  EmailAddress,
  EmailAttachment,
  EmailMessage,
  EmailSendResponse,
  EmailSendHeaders,
  EmailSendResult,
  EmailSendStatus,
  ErrorDetail,
  ErrorAdditionalInfo,
  KnownEmailSendStatus,
} from "./generated/src/models";
