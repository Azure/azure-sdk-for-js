// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** The template object used to create templates. */
export interface MessageTemplateOutput {
  /** Name of the template. */
  name: string;
  /** The template's language, in the ISO 639 format, consist of a two-letter language code followed by an optional two-letter country code, e.g., 'en' or 'en_US'. */
  language: string;
  /** The template values. */
  values?: Array<MessageTemplateValueOutput>;
  /** The binding object to link values to the template specific locations */
  bindings?: MessageTemplateBindingsOutput;
}

/** The class describes a parameter of a template. */
export interface MessageTemplateValueOutputParent {
  /** Template binding reference name */
  name: string;
  kind: MessageTemplateValueKindOutput;
}

/** The message template's text value information. */
export interface MessageTemplateTextOutput
  extends MessageTemplateValueOutputParent {
  /** Message parameter type is text. */
  kind: "text";
  /** The text value. */
  text: string;
}

/** The message template's image value information. */
export interface MessageTemplateImageOutput
  extends MessageTemplateValueOutputParent {
  /** Message parameter type is image. */
  kind: "image";
  /** The (public) URL of the media. */
  url: string;
  /** The [optional] caption of the media object. */
  caption?: string;
  /** The [optional] filename of the media file. */
  fileName?: string;
}

/** The message template's document value information. */
export interface MessageTemplateDocumentOutput
  extends MessageTemplateValueOutputParent {
  /** Message parameter type is document. */
  kind: "document";
  /** The (public) URL of the media. */
  url: string;
  /** The [optional] caption of the media object. */
  caption?: string;
  /** The [optional] filename of the media file. */
  fileName?: string;
}

/** The message template's video value information. */
export interface MessageTemplateVideoOutput
  extends MessageTemplateValueOutputParent {
  /** Message parameter type is video. */
  kind: "video";
  /** The (public) URL of the media. */
  url: string;
  /** The [optional] caption of the media object. */
  caption?: string;
  /** The [optional] filename of the media file. */
  fileName?: string;
}

/** The message template's location value information. */
export interface MessageTemplateLocationOutput
  extends MessageTemplateValueOutputParent {
  /** Message parameter type is location. */
  kind: "location";
  /** The [Optional] name of the location. */
  locationName?: string;
  /** The [Optional] address of the location. */
  address?: string;
  /** The latitude of the location. */
  latitude: number;
  /** The longitude of the location. */
  longitude: number;
}

/** The message template's quick action value information. */
export interface MessageTemplateQuickActionOutput
  extends MessageTemplateValueOutputParent {
  /** Message parameter type is quick action. */
  kind: "quickAction";
  /** The [Optional] quick action text */
  text?: string;
  /** The [Optional] quick action payload */
  payload?: string;
}

/** The binding object to link values to the template specific locations */
export interface MessageTemplateBindingsOutputParent {
  kind: MessageTemplateBindingsKindOutput;
}

/** The template bindings for WhatsApp */
export interface WhatsAppMessageTemplateBindingsOutput
  extends MessageTemplateBindingsOutputParent {
  /** MessageTemplateBindings is whatsApp */
  kind: "whatsApp";
  /** The header template bindings */
  header?: Array<WhatsAppMessageTemplateBindingsComponentOutput>;
  /** The body template bindings */
  body?: Array<WhatsAppMessageTemplateBindingsComponentOutput>;
  /** The footer template bindings */
  footer?: Array<WhatsAppMessageTemplateBindingsComponentOutput>;
  /** The button template bindings */
  buttons?: Array<WhatsAppMessageTemplateBindingsButtonOutput>;
}

/** The template bindings component for WhatsApp */
export interface WhatsAppMessageTemplateBindingsComponentOutput {
  /** The name of the referenced item in the template values. */
  refValue: string;
}

/** The template bindings component button for WhatsApp */
export interface WhatsAppMessageTemplateBindingsButtonOutput {
  /**
   * The WhatsApp button sub type
   *
   * Possible values: "quickReply", "url"
   */
  subType: WhatsAppMessageButtonSubTypeOutput;
  /** The name of the referenced item in the template values. */
  refValue: string;
}

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

/** Paged collection of MessageTemplateItem items */
export interface PagedMessageTemplateItemOutput {
  /** The MessageTemplateItem items on this page */
  value: Array<MessageTemplateItemOutput>;
  /** The link to the next page of items */
  nextLink?: string;
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

/** Advanced Messaging conversation participant. */
export interface ConversationParticipantOutputParent {
  /** Participant Identifier. */
  readonly id: string;
  /** Participant display name. */
  displayName?: string;
  kind: ParticipantKindOutput;
}

/** Internal conversation participant. */
export interface InternalConversationParticipantOutput
  extends ConversationParticipantOutputParent {
  /** Participant type is internal. */
  kind: "internal";
  /** The internal platform identifiers for the participant. */
  contact: ContactOutput;
}

/** Details of an external platform contact. */
export interface ContactOutputParent {
  /** External platform identifier. */
  id: string;
  kind: MessagePlatformKindOutput;
}

/** Communication Contact. */
export interface CommunicationContactOutput extends ContactOutputParent {
  /** Contact type is communication. */
  kind: "communication";
}

/** Bot Contact. */
export interface BotContactOutput extends ContactOutputParent {
  /** Contact type is bot. */
  kind: "bot";
  /** Bot App Id of the Bot Contact. */
  botAppId: string;
}

/** WhatsApp Contact. */
export interface WhatsAppContactOutput extends ContactOutputParent {
  /** Contact type is whatsApp. */
  kind: "whatsApp";
}

/** External conversation participant. */
export interface ExternalConversationParticipantOutput
  extends ConversationParticipantOutputParent {
  /** Participant type is external. */
  kind: "external";
  /** List of external platform identifiers for the participant. */
  contacts: Array<ContactOutput>;
}

/** Response for the add participants operation. */
export interface AddParticipantsResultOutput {
  /** List of Ids with Errors if failed to be added */
  invalidParticipants: Array<UpdateParticipantsResultOutput>;
}

/** Response for the remove participants operation. */
export interface UpdateParticipantsResultOutput {
  /** Participant User Id. */
  id: string;
  /** Error of the participant operation. */
  error?: ErrorModel;
}

/** Response for the remove participants operation. */
export interface RemoveParticipantsResultOutput {
  /** List of Ids with Errors if failed to be added */
  invalidParticipants: Array<UpdateParticipantsResultOutput>;
}

/** Paged collection of Conversation items */
export interface PagedConversationOutput {
  /** The Conversation items on this page */
  value: Array<ConversationOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** A conversation. */
export interface ConversationOutput {
  /** The conversation ID. */
  readonly id: string;
  /** The conversation topic. */
  topic?: string;
  /** List of delivery channel IDs. */
  deliveryChannelIds?: string[];
  /**
   * Outbound delivery strategy for the conversation.
   *
   * Possible values: "internalOnly", "allParticipants"
   */
  outboundDeliveryStrategy?: OutboundDeliveryStrategyKindOutput;
  /** List of participants involved in the conversation. */
  participants?: Array<ConversationParticipantOutput>;
}

/** Paged collection of ConversationMessageItem items */
export interface PagedConversationMessageItemOutput {
  /** The ConversationMessageItem items on this page */
  value: Array<ConversationMessageItemOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** The conversation message as returned from the service. */
export interface ConversationMessageItemOutput {
  /** Message ID. */
  readonly id: string;
  /** Message sequence ID. */
  sequenceId?: number;
  /** Payload of a threaded conversation message. */
  message: ConversationMessageContentOutput;
  /** The display name of the message sender. */
  senderDisplayName?: string;
  /** The communication identifier of the message sender. */
  senderCommunicationIdentifier: string;
  /** Timestamp when the message is sent. */
  createdOn: string;
}

/** Details of the conversation message content. */
export interface ConversationMessageContentOutputParent {
  kind: CommunicationMessageKindOutput;
}

/** A request to send a text conversation message. */
export interface TextConversationMessageContentOutput
  extends ConversationMessageContentOutputParent {
  /** Message notification type is text. */
  kind: "text";
  /** Message content. */
  content: string;
}

/** A request to send an image conversation message. */
export interface ImageConversationMessageContentOutput
  extends ConversationMessageContentOutputParent {
  /** Message notification type is image. */
  kind: "image";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a document conversation message. */
export interface DocumentConversationMessageContentOutput
  extends ConversationMessageContentOutputParent {
  /** Message notification type is document. */
  kind: "document";
  /** Optional text content. */
  caption?: string;
  /** Optional name for the file. */
  fileName?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a video conversation message. */
export interface VideoConversationMessageContentOutput
  extends ConversationMessageContentOutputParent {
  /** Message notification type is video. */
  kind: "video";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send an audio conversation message. */
export interface AudioConversationMessageContentOutput
  extends ConversationMessageContentOutputParent {
  /** Message notification type is audio. */
  kind: "audio";
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a template conversation message. */
export interface TemplateConversationMessageContentOutput
  extends ConversationMessageContentOutputParent {
  /** Message notification type is template. */
  kind: "template";
  /** The template object used to create templates. */
  template: MessageTemplateOutput;
}

/** Result of the send conversation message operation. */
export interface SendConversationMessageResultOutput {
  /** A server-generated Advanced Messaging conversation message id. */
  messageId: string;
}

/** Result of the get conversation messages AI Analysis operation. */
export interface GetConversationThreadAnalysisResultOutput {
  /** The AI summary of the conversation messages. */
  summary: string;
}

/** The class describes a parameter of a template. */
export type MessageTemplateValueOutput =
  | MessageTemplateValueOutputParent
  | MessageTemplateTextOutput
  | MessageTemplateImageOutput
  | MessageTemplateDocumentOutput
  | MessageTemplateVideoOutput
  | MessageTemplateLocationOutput
  | MessageTemplateQuickActionOutput;
/** The binding object to link values to the template specific locations */
export type MessageTemplateBindingsOutput =
  | MessageTemplateBindingsOutputParent
  | WhatsAppMessageTemplateBindingsOutput;
/** The message template as returned from the service. */
export type MessageTemplateItemOutput =
  | MessageTemplateItemOutputParent
  | WhatsAppMessageTemplateItemOutput;
/** Advanced Messaging conversation participant. */
export type ConversationParticipantOutput =
  | ConversationParticipantOutputParent
  | InternalConversationParticipantOutput
  | ExternalConversationParticipantOutput;
/** Details of an external platform contact. */
export type ContactOutput =
  | ContactOutputParent
  | CommunicationContactOutput
  | BotContactOutput
  | WhatsAppContactOutput;
/** Details of the conversation message content. */
export type ConversationMessageContentOutput =
  | ConversationMessageContentOutputParent
  | TextConversationMessageContentOutput
  | ImageConversationMessageContentOutput
  | DocumentConversationMessageContentOutput
  | VideoConversationMessageContentOutput
  | AudioConversationMessageContentOutput
  | TemplateConversationMessageContentOutput;
/** Alias for CommunicationMessageKindOutput */
export type CommunicationMessageKindOutput = string;
/** Alias for MessageTemplateValueKindOutput */
export type MessageTemplateValueKindOutput = string;
/** Alias for MessageTemplateBindingsKindOutput */
export type MessageTemplateBindingsKindOutput = string;
/** Alias for WhatsAppMessageButtonSubTypeOutput */
export type WhatsAppMessageButtonSubTypeOutput = string;
/** Alias for RepeatabilityResultOutput */
export type RepeatabilityResultOutput = "accepted" | "rejected";
/** Alias for MessageTemplateStatusOutput */
export type MessageTemplateStatusOutput = string;
/** Alias for CommunicationMessagesChannelOutput */
export type CommunicationMessagesChannelOutput = string;
/** Alias for ParticipantKindOutput */
export type ParticipantKindOutput = string;
/** Alias for MessagePlatformKindOutput */
export type MessagePlatformKindOutput = string;
/** Alias for OutboundDeliveryStrategyKindOutput */
export type OutboundDeliveryStrategyKindOutput = string;
