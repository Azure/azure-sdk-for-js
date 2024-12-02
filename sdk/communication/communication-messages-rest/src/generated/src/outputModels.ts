// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Paged } from "@azure/core-paging";

/** Result of the send message operation. */
export interface SendMessageResultOutput {
  /** Receipts of the send message operation. */
  receipts: Array<MessageReceiptOutput>;
}

/** Receipt of the sending one message. */
export interface MessageReceiptOutput {
  /** The message id. */
  messageId: string;
  /** The native external platform user identifier of the recipient. */
  to: string;
}

/** The message template as returned from the service. */
export interface MessageTemplateItemOutputParent {
  /** The template's name. */
  readonly name: string;
  /** The template's language, in the ISO 639 format, consist of a two-letter language code followed by an optional two-letter country code, e.g., 'en' or 'en_US'. */
  language: string;
  /**
   * The aggregated template status.
   *
   * Possible values: "approved", "rejected", "pending", "paused"
   */
  status: MessageTemplateStatusOutput;
  kind: CommunicationMessagesChannelOutput;
}

/** The WhatsApp-specific template response contract */
export interface WhatsAppMessageTemplateItemOutput
  extends MessageTemplateItemOutputParent {
  /** WhatsApp platform's template content. This is the payload returned from WhatsApp API. */
  content?: any;
  /** Message template response type is whatsApp. */
  kind: "whatsApp";
}

/** The message template as returned from the service. */
export type MessageTemplateItemOutput =
  | MessageTemplateItemOutputParent
  | WhatsAppMessageTemplateItemOutput;
/** Alias for RepeatabilityResultOutput */
export type RepeatabilityResultOutput = "accepted" | "rejected";
/** Paged collection of MessageTemplateItem items */
export type PagedMessageTemplateItemOutput = Paged<MessageTemplateItemOutput>;
/** Alias for MessageTemplateStatusOutput */
export type MessageTemplateStatusOutput = string;
/** Alias for CommunicationMessagesChannelOutput */
export type CommunicationMessagesChannelOutput = string;
