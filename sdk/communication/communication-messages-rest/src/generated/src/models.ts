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
  /** Message notification type is image. */
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
  /** Message notification type is image. */
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

/** Details of the message to send. */
export type NotificationContent =
  | NotificationContentParent
  | TextNotificationContent
  | MediaNotificationContent
  | ImageNotificationContent
  | DocumentNotificationContent
  | VideoNotificationContent
  | AudioNotificationContent
  | TemplateNotificationContent;
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
/** Alias for CommunicationMessageKind */
export type CommunicationMessageKind = string;
/** Alias for MessageTemplateValueKind */
export type MessageTemplateValueKind = string;
/** Alias for MessageTemplateBindingsKind */
export type MessageTemplateBindingsKind = string;
/** Alias for WhatsAppMessageButtonSubType */
export type WhatsAppMessageButtonSubType = string;
