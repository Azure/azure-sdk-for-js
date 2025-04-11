// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Details of the message to send. */
export interface NotificationContentParent {
  /** The Channel Registration ID for the Business Identifier. */
  channelRegistrationId: string;
  /** The native external platform user identifiers of the recipient. */
  to: string[];
  kind: CommunicationMessageKind;
}

/** A request to send a text notification. */
export interface TextNotificationContent extends NotificationContentParent {
  /** Message notification type is text. */
  kind: "text";
  /** Message content. */
  content: string;
}

/** @deprecated A request to send an image notification. */
export interface MediaNotificationContent extends NotificationContentParent {
  /** Message notification type is image. */
  kind: "image_v0";
  /** Optional text content. */
  content?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send an image notification. */
export interface ImageNotificationContent extends NotificationContentParent {
  /** Message notification type is image. */
  kind: "image";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a document notification. */
export interface DocumentNotificationContent extends NotificationContentParent {
  /** Message notification type is document. */
  kind: "document";
  /** Optional text content. */
  caption?: string;
  /** Optional name for the file. */
  fileName?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a video notification. */
export interface VideoNotificationContent extends NotificationContentParent {
  /** Message notification type is video. */
  kind: "video";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send an audio notification. */
export interface AudioNotificationContent extends NotificationContentParent {
  /** Message notification type is audio. */
  kind: "audio";
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a Reaction notification. */
export interface ReactionNotificationContent extends NotificationContentParent {
  /** Message notification type is reaction. */
  kind: "reaction";
  /** emoji content like \uD83D\uDE00. */
  emoji: string;
  /** ID of the previous message you want to reply to. */
  messageId: string;
}

/** A request to send a Sticker notification. */
export interface StickerNotificationContent extends NotificationContentParent {
  /** Message notification type is sticker. */
  kind: "sticker";
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send an Interactive message notification. */
export interface InteractiveNotificationContent
  extends NotificationContentParent {
  /** Message notification type is Interactive. */
  kind: "interactive";
  /** The interactive message content. */
  interactiveMessage: InteractiveMessage;
}

/** The Interactive message content to which user can read and respond. */
export interface InteractiveMessage {
  /** Gets or Sets Header content. Supports the following types:text, images etc. */
  header?: MessageContent;
  /** Gets or Sets Message body content. Emojis, markdown, and links are supported. */
  body: TextMessageContent;
  /** Gets or Sets Message footer content. Emojis, markdown, and links are supported. */
  footer?: TextMessageContent;
  /** The binding object to get or set Action which describes options user have to respond to message. */
  action: ActionBindings;
}

/** The message content object used to create interactive messages components. */
export interface MessageContentParent {
  kind: MessageContentKind;
}

/** The message content of type text information. */
export interface TextMessageContent extends MessageContentParent {
  /** Message content kind is text. */
  kind: "text";
  /** The text value. */
  text: string;
}

/** The message content of type document information. */
export interface DocumentMessageContent extends MessageContentParent {
  /** Message content kind is document. */
  kind: "document";
  /** MediaUri of the media content. */
  mediaUri: string;
}

/** The message content of type image information. */
export interface ImageMessageContent extends MessageContentParent {
  /** Message content kind is image. */
  kind: "image";
  /** MediaUri of the media content. */
  mediaUri: string;
}

/** The message content of type video information. */
export interface VideoMessageContent extends MessageContentParent {
  /** Message content kind is video. */
  kind: "video";
  /** MediaUri of the media content. */
  mediaUri: string;
}

/** The message content of type ButtonSet/ List of buttons information. */
export interface ButtonSetContent extends MessageContentParent {
  /** Message content kind is Button. */
  kind: "buttonSet";
  /** Unique Id of the button content. */
  buttons: Array<ButtonContent>;
}

/** The message content of type Button information. */
export interface ButtonContent {
  /** Unique Id of the button content. */
  id: string;
  /** Title of the button content. */
  title: string;
}

/** The message content of type Url information. */
export interface LinkContent extends MessageContentParent {
  /** Message content kind is url. */
  kind: "url";
  /** Title of the url content. */
  title: string;
  /** The url in the content. */
  url: string;
}

/** The action content of type ActionGroup. */
export interface ActionGroupContent extends MessageContentParent {
  /** Message content kind is actionGroup. */
  kind: "group";
  /** Title of the actionGroup content. */
  title: string;
  /** Set or group of actions. */
  groups: Array<ActionGroup>;
}

/** The Action Group content. */
export interface ActionGroup {
  /** Title of the ActionGroup. */
  title: string;
  /** Array of items in ActionGroup. */
  items: Array<ActionGroupItem>;
}

/** The Action group item in the content. */
export interface ActionGroupItem {
  /** Id of the Item. */
  id: string;
  /** Title of the Item. */
  title: string;
  /** Description of the Item. */
  description: string;
}

/** Binding actions to the interactive message. */
export interface ActionBindingsParent {
  kind: MessageActionBindingKind;
}

/** WhatsApp List Binding actions to the interactive message. */
export interface WhatsAppListActionBindings extends ActionBindingsParent {
  /** Message action binding type is WhatsAppListAction. */
  kind: "whatsAppListAction";
  /** Action content of Interactive message. */
  content: ActionGroupContent;
}

/** WhatsApp Binding actions to the interactive message. */
export interface WhatsAppButtonActionBindings extends ActionBindingsParent {
  /** Message action binding type is WhatsAppButtonAction. */
  kind: "whatsAppButtonAction";
  /** Action content of Interactive message. */
  content: ButtonSetContent;
}

/** WhatsApp Binding actions to the interactive message. */
export interface WhatsAppUrlActionBindings extends ActionBindingsParent {
  /** Message action binding type is WhatsAppUrlAction. */
  kind: "whatsAppUrlAction";
  /** Action content of Interactive message. */
  content: LinkContent;
}

/** A request to send a template notification. */
export interface TemplateNotificationContent extends NotificationContentParent {
  /** Message notification type is template. */
  kind: "template";
  /** The template object used to create templates. */
  template: MessageTemplate;
}

/** The template object used to create templates. */
export interface MessageTemplate {
  /** Name of the template. */
  name: string;
  /** The template's language, in the ISO 639 format, consist of a two-letter language code followed by an optional two-letter country code, e.g., 'en' or 'en_US'. */
  language: string;
  /** The template values. */
  values?: Array<MessageTemplateValue>;
  /** The binding object to link values to the template specific locations */
  bindings?: MessageTemplateBindings;
}

/** The class describes a parameter of a template. */
export interface MessageTemplateValueParent {
  /** Template binding reference name */
  name: string;
  kind: MessageTemplateValueKind;
}

/** The message template's text value information. */
export interface MessageTemplateText extends MessageTemplateValueParent {
  /** Message parameter type is text. */
  kind: "text";
  /** The text value. */
  text: string;
}

/** The message template's image value information. */
export interface MessageTemplateImage extends MessageTemplateValueParent {
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
export interface MessageTemplateDocument extends MessageTemplateValueParent {
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
export interface MessageTemplateVideo extends MessageTemplateValueParent {
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
export interface MessageTemplateLocation extends MessageTemplateValueParent {
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
export interface MessageTemplateQuickAction extends MessageTemplateValueParent {
  /** Message parameter type is quick action. */
  kind: "quickAction";
  /** The [Optional] quick action text */
  text?: string;
  /** The [Optional] quick action payload */
  payload?: string;
}

/** The binding object to link values to the template specific locations */
export interface MessageTemplateBindingsParent {
  kind: MessageTemplateBindingsKind;
}

/** The template bindings for WhatsApp */
export interface WhatsAppMessageTemplateBindings
  extends MessageTemplateBindingsParent {
  /** MessageTemplateBindings is whatsApp */
  kind: "whatsApp";
  /** The header template bindings */
  header?: Array<WhatsAppMessageTemplateBindingsComponent>;
  /** The body template bindings */
  body?: Array<WhatsAppMessageTemplateBindingsComponent>;
  /** The footer template bindings */
  footer?: Array<WhatsAppMessageTemplateBindingsComponent>;
  /** The button template bindings */
  buttons?: Array<WhatsAppMessageTemplateBindingsButton>;
}

/** The template bindings component for WhatsApp */
export interface WhatsAppMessageTemplateBindingsComponent {
  /** The name of the referenced item in the template values. */
  refValue: string;
}

/** The template bindings component button for WhatsApp */
export interface WhatsAppMessageTemplateBindingsButton {
  /**
   * The WhatsApp button sub type
   *
   * Possible values: "quickReply", "url"
   */
  subType: WhatsAppMessageButtonSubType;
  /** The name of the referenced item in the template values. */
  refValue: string;
}

/** Request payload for adding participants to a conversation. */
export interface AddParticipantsOptions {
  /** List of participants to add. */
  participants: Array<ConversationParticipant>;
}

/** Advanced Messaging conversation participant. */
export interface ConversationParticipantParent {
  /** Participant display name. */
  displayName?: string;
  kind: ParticipantKind;
}

/** Internal conversation participant. */
export interface InternalConversationParticipant
  extends ConversationParticipantParent {
  /** Participant type is internal. */
  kind: "internal";
  /** The internal platform identifiers for the participant. */
  contact: Contact;
}

/** Details of an external platform contact. */
export interface ContactParent {
  /** External platform identifier. */
  id: string;
  kind: MessagePlatformKind;
}

/** Communication Contact. */
export interface CommunicationContact extends ContactParent {
  /** Contact type is communication. */
  kind: "communication";
}

/** Bot Contact. */
export interface BotContact extends ContactParent {
  /** Contact type is bot. */
  kind: "bot";
  /** Bot App Id of the Bot Contact. */
  botAppId: string;
}

/** WhatsApp Contact. */
export interface WhatsAppContact extends ContactParent {
  /** Contact type is whatsApp. */
  kind: "whatsApp";
}

/** External conversation participant. */
export interface ExternalConversationParticipant
  extends ConversationParticipantParent {
  /** Participant type is external. */
  kind: "external";
  /** List of external platform identifiers for the participant. */
  contacts: Array<Contact>;
}

/** Request payload for removing participants from a conversation. */
export interface RemoveParticipantsOptions {
  /** The participant IDs to remove. */
  participantIds: string[];
}

/** A conversation. */
export interface Conversation {
  /** The conversation topic. */
  topic?: string;
  /** List of delivery channel IDs. */
  deliveryChannelIds?: string[];
  /**
   * Outbound delivery strategy for the conversation.
   *
   * Possible values: "internalOnly", "allParticipants"
   */
  outboundDeliveryStrategy?: OutboundDeliveryStrategyKind;
  /** List of participants involved in the conversation. */
  participants?: Array<ConversationParticipant>;
}

/** Details of the conversation message content. */
export interface ConversationMessageContentParent {
  kind: CommunicationMessageKind;
}

/** A request to send a text conversation message. */
export interface TextConversationMessageContent
  extends ConversationMessageContentParent {
  /** Message notification type is text. */
  kind: "text";
  /** Message content. */
  content: string;
}

/** A request to send an image conversation message. */
export interface ImageConversationMessageContent
  extends ConversationMessageContentParent {
  /** Message notification type is image. */
  kind: "image";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a document conversation message. */
export interface DocumentConversationMessageContent
  extends ConversationMessageContentParent {
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
export interface VideoConversationMessageContent
  extends ConversationMessageContentParent {
  /** Message notification type is video. */
  kind: "video";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send an audio conversation message. */
export interface AudioConversationMessageContent
  extends ConversationMessageContentParent {
  /** Message notification type is audio. */
  kind: "audio";
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

/** A request to send a template conversation message. */
export interface TemplateConversationMessageContent
  extends ConversationMessageContentParent {
  /** Message notification type is template. */
  kind: "template";
  /** The template object used to create templates. */
  template: MessageTemplate;
}

/** Request payload for sending a conversation message. */
export interface SendConversationMessageOptions {
  /** Details of a send conversation message request. */
  request: ConversationMessageContent;
  /**
   * The options of the outbound delivery strategy for messages sent by participants in a conversation.
   * Supports internalOnly, allChannels.
   *
   * Possible values: "internalOnly", "allParticipants"
   */
  outboundDeliveryStrategy?: OutboundDeliveryStrategyKind;
}

/** Request payload for creating a conversation. */
export interface CreateConversationRequest {
  /** The conversation details. */
  conversation: Conversation;
  /** An initial message within the conversation. */
  initialMessage?: Message;
}

/** Details of a message. */
export interface Message {
  /** Content of the message. */
  content: string;
}

/** Details of the message to send. */
export type NotificationContent =
  | NotificationContentParent
  | TextNotificationContent
  | MediaNotificationContent
  | ImageNotificationContent
  | DocumentNotificationContent
  | VideoNotificationContent
  | AudioNotificationContent
  | ReactionNotificationContent
  | StickerNotificationContent
  | InteractiveNotificationContent
  | TemplateNotificationContent;
/** The message content object used to create interactive messages components. */
export type MessageContent =
  | MessageContentParent
  | TextMessageContent
  | DocumentMessageContent
  | ImageMessageContent
  | VideoMessageContent
  | ButtonSetContent
  | LinkContent
  | ActionGroupContent;
/** Binding actions to the interactive message. */
export type ActionBindings =
  | ActionBindingsParent
  | WhatsAppListActionBindings
  | WhatsAppButtonActionBindings
  | WhatsAppUrlActionBindings;
/** The class describes a parameter of a template. */
export type MessageTemplateValue =
  | MessageTemplateValueParent
  | MessageTemplateText
  | MessageTemplateImage
  | MessageTemplateDocument
  | MessageTemplateVideo
  | MessageTemplateLocation
  | MessageTemplateQuickAction;
/** The binding object to link values to the template specific locations */
export type MessageTemplateBindings =
  | MessageTemplateBindingsParent
  | WhatsAppMessageTemplateBindings;
/** Advanced Messaging conversation participant. */
export type ConversationParticipant =
  | ConversationParticipantParent
  | InternalConversationParticipant
  | ExternalConversationParticipant;
/** Details of an external platform contact. */
export type Contact =
  | ContactParent
  | CommunicationContact
  | BotContact
  | WhatsAppContact;
/** Details of the conversation message content. */
export type ConversationMessageContent =
  | ConversationMessageContentParent
  | TextConversationMessageContent
  | ImageConversationMessageContent
  | DocumentConversationMessageContent
  | VideoConversationMessageContent
  | AudioConversationMessageContent
  | TemplateConversationMessageContent;
/** Alias for CommunicationMessageKind */
export type CommunicationMessageKind = string;
/** Alias for MessageContentKind */
export type MessageContentKind = string;
/** Alias for MessageActionBindingKind */
export type MessageActionBindingKind = string;
/** Alias for MessageTemplateValueKind */
export type MessageTemplateValueKind = string;
/** Alias for MessageTemplateBindingsKind */
export type MessageTemplateBindingsKind = string;
/** Alias for WhatsAppMessageButtonSubType */
export type WhatsAppMessageButtonSubType = string;
/** Alias for ParticipantKind */
export type ParticipantKind = string;
/** Alias for MessagePlatformKind */
export type MessagePlatformKind = string;
/** Alias for OutboundDeliveryStrategyKind */
export type OutboundDeliveryStrategyKind = string;
