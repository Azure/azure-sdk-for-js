// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { EmailRecipients, EmailAttachment, EmailAddress } from "./models";

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

/** Message payload for sending an email */
export interface EmailMessage {
  /** Custom email headers to be passed. */
  headers?: { [propertyName: string]: string };
  /** Sender email address from a verified domain. */
  senderAddress: string;
  /** Email content to be sent. */
  content: EmailContent;
  /** Recipients for the email. */
  recipients: EmailRecipients;
  /** List of attachments. Please note that we limit the total size of an email request (which includes attachments) to 10MB. */
  attachments?: EmailAttachment[];
  /** Email addresses where recipients' replies will be sent to. */
  replyTo?: EmailAddress[];
  /** Indicates whether user engagement tracking should be disabled for this request if the resource-level user engagement tracking setting was already enabled in the control plane. */
  disableUserEngagementTracking?: boolean;
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
  EmailSendResponse,
  EmailSendHeaders,
  EmailSendResult,
  EmailSendStatus,
  ErrorDetail,
  ErrorAdditionalInfo,
  KnownEmailSendStatus,
} from "./generated/src/models";
