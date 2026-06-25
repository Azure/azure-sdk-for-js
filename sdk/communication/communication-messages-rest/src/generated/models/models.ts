// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeReadableStream } from "#platform/generated/static-helpers/platform-types";
import { ErrorModel } from "@azure-rest/core-client";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Details of the message to send. */
export interface NotificationContent {
  /** The Channel Registration ID for the Business Identifier. */
  channelRegistrationId: string;
  /** The native external platform user identifiers of the recipient. */
  to: string[];
  /** The type discriminator describing a message type. */
  /** The discriminator possible values: text, image_v0, image, document, video, audio, reaction, sticker, interactive, template */
  kind: CommunicationMessageKind;
}

export function notificationContentSerializer(item: NotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
  };
}

/** Alias for NotificationContentUnion */
export type NotificationContentUnion =
  | TextNotificationContent
  | MediaNotificationContent
  | ImageNotificationContent
  | DocumentNotificationContent
  | VideoNotificationContent
  | AudioNotificationContent
  | ReactionNotificationContent
  | StickerNotificationContent
  | InteractiveNotificationContent
  | TemplateNotificationContent
  | NotificationContent;

export function notificationContentUnionSerializer(item: NotificationContentUnion): any {
  switch (item.kind) {
    case "text":
      return textNotificationContentSerializer(item as TextNotificationContent);

    case "image_v0":
      return mediaNotificationContentSerializer(item as MediaNotificationContent);

    case "image":
      return imageNotificationContentSerializer(item as ImageNotificationContent);

    case "document":
      return documentNotificationContentSerializer(item as DocumentNotificationContent);

    case "video":
      return videoNotificationContentSerializer(item as VideoNotificationContent);

    case "audio":
      return audioNotificationContentSerializer(item as AudioNotificationContent);

    case "reaction":
      return reactionNotificationContentSerializer(item as ReactionNotificationContent);

    case "sticker":
      return stickerNotificationContentSerializer(item as StickerNotificationContent);

    case "interactive":
      return interactiveNotificationContentSerializer(item as InteractiveNotificationContent);

    case "template":
      return templateNotificationContentSerializer(item as TemplateNotificationContent);

    default:
      return notificationContentSerializer(item);
  }
}

/** The type of message. */
export type CommunicationMessageKind =
  | "text"
  | "image"
  | "image_v0"
  | "document"
  | "video"
  | "audio"
  | "template"
  | "sticker"
  | "reaction"
  | "interactive";

/** A request to send a text notification. */
export interface TextNotificationContent extends NotificationContent {
  /** Message notification type is text. */
  kind: "text";
  /** Message content. */
  content: string;
}

export function textNotificationContentSerializer(item: TextNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    content: item["content"],
  };
}

/** @deprecated A request to send an image notification. */
export interface MediaNotificationContent extends NotificationContent {
  /** Message notification type is image. */
  kind: "image_v0";
  /** Optional text content. */
  content?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function mediaNotificationContentSerializer(item: MediaNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    content: item["content"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send an image notification. */
export interface ImageNotificationContent extends NotificationContent {
  /** Message notification type is image. */
  kind: "image";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function imageNotificationContentSerializer(item: ImageNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    caption: item["caption"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send a document notification. */
export interface DocumentNotificationContent extends NotificationContent {
  /** Message notification type is document. */
  kind: "document";
  /** Optional text content. */
  caption?: string;
  /** Optional name for the file. */
  fileName?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function documentNotificationContentSerializer(item: DocumentNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    caption: item["caption"],
    fileName: item["fileName"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send a video notification. */
export interface VideoNotificationContent extends NotificationContent {
  /** Message notification type is video. */
  kind: "video";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function videoNotificationContentSerializer(item: VideoNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    caption: item["caption"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send an audio notification. */
export interface AudioNotificationContent extends NotificationContent {
  /** Message notification type is audio. */
  kind: "audio";
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function audioNotificationContentSerializer(item: AudioNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send a Reaction notification. */
export interface ReactionNotificationContent extends NotificationContent {
  /** Message notification type is reaction. */
  kind: "reaction";
  /** emoji content like \uD83D\uDE00. */
  emoji: string;
  /** ID of the previous message you want to reply to. */
  messageId: string;
}

export function reactionNotificationContentSerializer(item: ReactionNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    emoji: item["emoji"],
    messageId: item["messageId"],
  };
}

/** A request to send a Sticker notification. */
export interface StickerNotificationContent extends NotificationContent {
  /** Message notification type is sticker. */
  kind: "sticker";
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function stickerNotificationContentSerializer(item: StickerNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send an Interactive message notification. */
export interface InteractiveNotificationContent extends NotificationContent {
  /** Message notification type is Interactive. */
  kind: "interactive";
  /** The interactive message content. */
  interactiveMessage: InteractiveMessage;
}

export function interactiveNotificationContentSerializer(
  item: InteractiveNotificationContent,
): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    interactiveMessage: interactiveMessageSerializer(item["interactiveMessage"]),
  };
}

/** The Interactive message content to which user can read and respond. */
export interface InteractiveMessage {
  /** Gets or Sets Header content. Supports the following types:text, images etc. */
  header?: MessageContentUnion;
  /** Gets or Sets Message body content. Emojis, markdown, and links are supported. */
  body: TextMessageContent;
  /** Gets or Sets Message footer content. Emojis, markdown, and links are supported. */
  footer?: TextMessageContent;
  /** The binding object to get or set Action which describes options user have to respond to message. */
  action: ActionBindingsUnion;
}

export function interactiveMessageSerializer(item: InteractiveMessage): any {
  return {
    header: !item["header"] ? item["header"] : messageContentUnionSerializer(item["header"]),
    body: textMessageContentSerializer(item["body"]),
    footer: !item["footer"] ? item["footer"] : textMessageContentSerializer(item["footer"]),
    action: actionBindingsUnionSerializer(item["action"]),
  };
}

/** The message content object used to create interactive messages components. */
export interface MessageContent {
  /** Kind of MessageContent. */
  /** The discriminator possible values: text, document, image, video, buttonSet, url, group */
  kind: MessageContentKind;
}

export function messageContentSerializer(item: MessageContent): any {
  return { kind: item["kind"] };
}

/** Alias for MessageContentUnion */
export type MessageContentUnion =
  | TextMessageContent
  | DocumentMessageContent
  | ImageMessageContent
  | VideoMessageContent
  | ButtonSetContent
  | LinkContent
  | ActionGroupContent
  | MessageContent;

export function messageContentUnionSerializer(item: MessageContentUnion): any {
  switch (item.kind) {
    case "text":
      return textMessageContentSerializer(item as TextMessageContent);

    case "document":
      return documentMessageContentSerializer(item as DocumentMessageContent);

    case "image":
      return imageMessageContentSerializer(item as ImageMessageContent);

    case "video":
      return videoMessageContentSerializer(item as VideoMessageContent);

    case "buttonSet":
      return buttonSetContentSerializer(item as ButtonSetContent);

    case "url":
      return linkContentSerializer(item as LinkContent);

    case "group":
      return actionGroupContentSerializer(item as ActionGroupContent);

    default:
      return messageContentSerializer(item);
  }
}

/** The kind of Interactive message content. */
export type MessageContentKind =
  | "text"
  | "image"
  | "video"
  | "document"
  | "group"
  | "buttonSet"
  | "url";

/** The message content of type text information. */
export interface TextMessageContent extends MessageContent {
  /** Message content kind is text. */
  kind: "text";
  /** The text value. */
  text: string;
}

export function textMessageContentSerializer(item: TextMessageContent): any {
  return { kind: item["kind"], text: item["text"] };
}

/** The message content of type document information. */
export interface DocumentMessageContent extends MessageContent {
  /** Message content kind is document. */
  kind: "document";
  /** MediaUri of the media content. */
  mediaUri: string;
}

export function documentMessageContentSerializer(item: DocumentMessageContent): any {
  return { kind: item["kind"], mediaUri: item["mediaUri"] };
}

/** The message content of type image information. */
export interface ImageMessageContent extends MessageContent {
  /** Message content kind is image. */
  kind: "image";
  /** MediaUri of the media content. */
  mediaUri: string;
}

export function imageMessageContentSerializer(item: ImageMessageContent): any {
  return { kind: item["kind"], mediaUri: item["mediaUri"] };
}

/** The message content of type video information. */
export interface VideoMessageContent extends MessageContent {
  /** Message content kind is video. */
  kind: "video";
  /** MediaUri of the media content. */
  mediaUri: string;
}

export function videoMessageContentSerializer(item: VideoMessageContent): any {
  return { kind: item["kind"], mediaUri: item["mediaUri"] };
}

/** The message content of type ButtonSet/ List of buttons information. */
export interface ButtonSetContent extends MessageContent {
  /** Message content kind is Button. */
  kind: "buttonSet";
  /** Unique Id of the button content. */
  buttons: ButtonContent[];
}

export function buttonSetContentSerializer(item: ButtonSetContent): any {
  return { kind: item["kind"], buttons: buttonContentArraySerializer(item["buttons"]) };
}

export function buttonContentArraySerializer(result: Array<ButtonContent>): any[] {
  return result.map((item) => {
    return buttonContentSerializer(item);
  });
}

/** The message content of type Button information. */
export interface ButtonContent {
  /** Unique Id of the button content. */
  id: string;
  /** Title of the button content. */
  title: string;
}

export function buttonContentSerializer(item: ButtonContent): any {
  return { id: item["id"], title: item["title"] };
}

/** The message content of type Url information. */
export interface LinkContent extends MessageContent {
  /** Message content kind is url. */
  kind: "url";
  /** Title of the url content. */
  title: string;
  /** The url in the content. */
  url: string;
}

export function linkContentSerializer(item: LinkContent): any {
  return { kind: item["kind"], title: item["title"], url: item["url"] };
}

/** The action content of type ActionGroup. */
export interface ActionGroupContent extends MessageContent {
  /** Message content kind is actionGroup. */
  kind: "group";
  /** Title of the actionGroup content. */
  title: string;
  /** Set or group of actions. */
  groups: ActionGroup[];
}

export function actionGroupContentSerializer(item: ActionGroupContent): any {
  return {
    kind: item["kind"],
    title: item["title"],
    groups: actionGroupArraySerializer(item["groups"]),
  };
}

export function actionGroupArraySerializer(result: Array<ActionGroup>): any[] {
  return result.map((item) => {
    return actionGroupSerializer(item);
  });
}

/** The Action Group content. */
export interface ActionGroup {
  /** Title of the ActionGroup. */
  title: string;
  /** Array of items in ActionGroup. */
  items: ActionGroupItem[];
}

export function actionGroupSerializer(item: ActionGroup): any {
  return { title: item["title"], items: actionGroupItemArraySerializer(item["items"]) };
}

export function actionGroupItemArraySerializer(result: Array<ActionGroupItem>): any[] {
  return result.map((item) => {
    return actionGroupItemSerializer(item);
  });
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

export function actionGroupItemSerializer(item: ActionGroupItem): any {
  return { id: item["id"], title: item["title"], description: item["description"] };
}

/** Binding actions to the interactive message. */
export interface ActionBindings {
  /** Kind of the MessageActionBinding. */
  /** The discriminator possible values: whatsAppListAction, whatsAppButtonAction, whatsAppUrlAction */
  kind: MessageActionBindingKind;
}

export function actionBindingsSerializer(item: ActionBindings): any {
  return { kind: item["kind"] };
}

/** Alias for ActionBindingsUnion */
export type ActionBindingsUnion =
  | WhatsAppListActionBindings
  | WhatsAppButtonActionBindings
  | WhatsAppUrlActionBindings
  | ActionBindings;

export function actionBindingsUnionSerializer(item: ActionBindingsUnion): any {
  switch (item.kind) {
    case "whatsAppListAction":
      return whatsAppListActionBindingsSerializer(item as WhatsAppListActionBindings);

    case "whatsAppButtonAction":
      return whatsAppButtonActionBindingsSerializer(item as WhatsAppButtonActionBindings);

    case "whatsAppUrlAction":
      return whatsAppUrlActionBindingsSerializer(item as WhatsAppUrlActionBindings);

    default:
      return actionBindingsSerializer(item);
  }
}

/** The Kind of interactive message channel action binding like WhatsAppListAction. */
export type MessageActionBindingKind =
  | "whatsAppListAction"
  | "whatsAppButtonAction"
  | "whatsAppUrlAction";

/** WhatsApp List Binding actions to the interactive message. */
export interface WhatsAppListActionBindings extends ActionBindings {
  /** Message action binding type is WhatsAppListAction. */
  kind: "whatsAppListAction";
  /** Action content of Interactive message. */
  content: ActionGroupContent;
}

export function whatsAppListActionBindingsSerializer(item: WhatsAppListActionBindings): any {
  return { kind: item["kind"], content: actionGroupContentSerializer(item["content"]) };
}

/** WhatsApp Binding actions to the interactive message. */
export interface WhatsAppButtonActionBindings extends ActionBindings {
  /** Message action binding type is WhatsAppButtonAction. */
  kind: "whatsAppButtonAction";
  /** Action content of Interactive message. */
  content: ButtonSetContent;
}

export function whatsAppButtonActionBindingsSerializer(item: WhatsAppButtonActionBindings): any {
  return { kind: item["kind"], content: buttonSetContentSerializer(item["content"]) };
}

/** WhatsApp Binding actions to the interactive message. */
export interface WhatsAppUrlActionBindings extends ActionBindings {
  /** Message action binding type is WhatsAppUrlAction. */
  kind: "whatsAppUrlAction";
  /** Action content of Interactive message. */
  content: LinkContent;
}

export function whatsAppUrlActionBindingsSerializer(item: WhatsAppUrlActionBindings): any {
  return { kind: item["kind"], content: linkContentSerializer(item["content"]) };
}

/** A request to send a template notification. */
export interface TemplateNotificationContent extends NotificationContent {
  /** Message notification type is template. */
  kind: "template";
  /** The template object used to create templates. */
  template: MessageTemplate;
}

export function templateNotificationContentSerializer(item: TemplateNotificationContent): any {
  return {
    channelRegistrationId: item["channelRegistrationId"],
    to: item["to"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    template: messageTemplateSerializer(item["template"]),
  };
}

/** The template object used to create templates. */
export interface MessageTemplate {
  /** Name of the template. */
  name: string;
  /** The template's language, in the ISO 639 format, consist of a two-letter language code followed by an optional two-letter country code, e.g., 'en' or 'en_US'. */
  language: string;
  /** The template values. */
  values?: MessageTemplateValueUnion[];
  /** The binding object to link values to the template specific locations */
  bindings?: MessageTemplateBindingsUnion;
}

export function messageTemplateSerializer(item: MessageTemplate): any {
  return {
    name: item["name"],
    language: item["language"],
    values: !item["values"]
      ? item["values"]
      : messageTemplateValueUnionArraySerializer(item["values"]),
    bindings: !item["bindings"]
      ? item["bindings"]
      : messageTemplateBindingsUnionSerializer(item["bindings"]),
  };
}

export function messageTemplateDeserializer(item: any): MessageTemplate {
  return {
    name: item["name"],
    language: item["language"],
    values: !item["values"]
      ? item["values"]
      : messageTemplateValueUnionArrayDeserializer(item["values"]),
    bindings: !item["bindings"]
      ? item["bindings"]
      : messageTemplateBindingsUnionDeserializer(item["bindings"]),
  };
}

export function messageTemplateValueUnionArraySerializer(
  result: Array<MessageTemplateValueUnion>,
): any[] {
  return result.map((item) => {
    return messageTemplateValueUnionSerializer(item);
  });
}

export function messageTemplateValueUnionArrayDeserializer(
  result: Array<MessageTemplateValueUnion>,
): any[] {
  return result.map((item) => {
    return messageTemplateValueUnionDeserializer(item);
  });
}

/** The class describes a parameter of a template. */
export interface MessageTemplateValue {
  /** Template binding reference name */
  name: string;
  /** The type discriminator describing a template parameter type. */
  /** The discriminator possible values: text, image, document, video, location, quickAction */
  kind: MessageTemplateValueKind;
}

export function messageTemplateValueSerializer(item: MessageTemplateValue): any {
  return { name: item["name"], kind: item["kind"] };
}

export function messageTemplateValueDeserializer(item: any): MessageTemplateValue {
  return {
    name: item["name"],
    kind: item["kind"],
  };
}

/** Alias for MessageTemplateValueUnion */
export type MessageTemplateValueUnion =
  | MessageTemplateText
  | MessageTemplateImage
  | MessageTemplateDocument
  | MessageTemplateVideo
  | MessageTemplateLocation
  | MessageTemplateQuickAction
  | MessageTemplateValue;

export function messageTemplateValueUnionSerializer(item: MessageTemplateValueUnion): any {
  switch (item.kind) {
    case "text":
      return messageTemplateTextSerializer(item as MessageTemplateText);

    case "image":
      return messageTemplateImageSerializer(item as MessageTemplateImage);

    case "document":
      return messageTemplateDocumentSerializer(item as MessageTemplateDocument);

    case "video":
      return messageTemplateVideoSerializer(item as MessageTemplateVideo);

    case "location":
      return messageTemplateLocationSerializer(item as MessageTemplateLocation);

    case "quickAction":
      return messageTemplateQuickActionSerializer(item as MessageTemplateQuickAction);

    default:
      return messageTemplateValueSerializer(item);
  }
}

export function messageTemplateValueUnionDeserializer(item: any): MessageTemplateValueUnion {
  switch (item["kind"]) {
    case "text":
      return messageTemplateTextDeserializer(item as MessageTemplateText);

    case "image":
      return messageTemplateImageDeserializer(item as MessageTemplateImage);

    case "document":
      return messageTemplateDocumentDeserializer(item as MessageTemplateDocument);

    case "video":
      return messageTemplateVideoDeserializer(item as MessageTemplateVideo);

    case "location":
      return messageTemplateLocationDeserializer(item as MessageTemplateLocation);

    case "quickAction":
      return messageTemplateQuickActionDeserializer(item as MessageTemplateQuickAction);

    default:
      return messageTemplateValueDeserializer(item);
  }
}

/** The type of the template parameter. */
export type MessageTemplateValueKind =
  | "text"
  | "image"
  | "document"
  | "video"
  | "location"
  | "quickAction";

/** The message template's text value information. */
export interface MessageTemplateText extends MessageTemplateValue {
  /** Message parameter type is text. */
  kind: "text";
  /** The text value. */
  text: string;
}

export function messageTemplateTextSerializer(item: MessageTemplateText): any {
  return { name: item["name"], kind: item["kind"], text: item["text"] };
}

export function messageTemplateTextDeserializer(item: any): MessageTemplateText {
  return {
    name: item["name"],
    kind: item["kind"],
    text: item["text"],
  };
}

/** The message template's image value information. */
export interface MessageTemplateImage extends MessageTemplateValue {
  /** Message parameter type is image. */
  kind: "image";
  /** The (public) URL of the media. */
  url: string;
  /** The [optional] caption of the media object. */
  caption?: string;
  /** The [optional] filename of the media file. */
  fileName?: string;
}

export function messageTemplateImageSerializer(item: MessageTemplateImage): any {
  return {
    name: item["name"],
    kind: item["kind"],
    url: item["url"],
    caption: item["caption"],
    fileName: item["fileName"],
  };
}

export function messageTemplateImageDeserializer(item: any): MessageTemplateImage {
  return {
    name: item["name"],
    kind: item["kind"],
    url: item["url"],
    caption: item["caption"],
    fileName: item["fileName"],
  };
}

/** The message template's document value information. */
export interface MessageTemplateDocument extends MessageTemplateValue {
  /** Message parameter type is document. */
  kind: "document";
  /** The (public) URL of the media. */
  url: string;
  /** The [optional] caption of the media object. */
  caption?: string;
  /** The [optional] filename of the media file. */
  fileName?: string;
}

export function messageTemplateDocumentSerializer(item: MessageTemplateDocument): any {
  return {
    name: item["name"],
    kind: item["kind"],
    url: item["url"],
    caption: item["caption"],
    fileName: item["fileName"],
  };
}

export function messageTemplateDocumentDeserializer(item: any): MessageTemplateDocument {
  return {
    name: item["name"],
    kind: item["kind"],
    url: item["url"],
    caption: item["caption"],
    fileName: item["fileName"],
  };
}

/** The message template's video value information. */
export interface MessageTemplateVideo extends MessageTemplateValue {
  /** Message parameter type is video. */
  kind: "video";
  /** The (public) URL of the media. */
  url: string;
  /** The [optional] caption of the media object. */
  caption?: string;
  /** The [optional] filename of the media file. */
  fileName?: string;
}

export function messageTemplateVideoSerializer(item: MessageTemplateVideo): any {
  return {
    name: item["name"],
    kind: item["kind"],
    url: item["url"],
    caption: item["caption"],
    fileName: item["fileName"],
  };
}

export function messageTemplateVideoDeserializer(item: any): MessageTemplateVideo {
  return {
    name: item["name"],
    kind: item["kind"],
    url: item["url"],
    caption: item["caption"],
    fileName: item["fileName"],
  };
}

/** The message template's location value information. */
export interface MessageTemplateLocation extends MessageTemplateValue {
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

export function messageTemplateLocationSerializer(item: MessageTemplateLocation): any {
  return {
    name: item["name"],
    kind: item["kind"],
    locationName: item["locationName"],
    address: item["address"],
    latitude: item["latitude"],
    longitude: item["longitude"],
  };
}

export function messageTemplateLocationDeserializer(item: any): MessageTemplateLocation {
  return {
    name: item["name"],
    kind: item["kind"],
    locationName: item["locationName"],
    address: item["address"],
    latitude: item["latitude"],
    longitude: item["longitude"],
  };
}

/** The message template's quick action value information. */
export interface MessageTemplateQuickAction extends MessageTemplateValue {
  /** Message parameter type is quick action. */
  kind: "quickAction";
  /** The [Optional] quick action text */
  text?: string;
  /** The [Optional] quick action payload */
  payload?: string;
}

export function messageTemplateQuickActionSerializer(item: MessageTemplateQuickAction): any {
  return { name: item["name"], kind: item["kind"], text: item["text"], payload: item["payload"] };
}

export function messageTemplateQuickActionDeserializer(item: any): MessageTemplateQuickAction {
  return {
    name: item["name"],
    kind: item["kind"],
    text: item["text"],
    payload: item["payload"],
  };
}

/** The binding object to link values to the template specific locations */
export interface MessageTemplateBindings {
  /** The type discriminator describing a template bindings type. */
  /** The discriminator possible values: whatsApp */
  kind: MessageTemplateBindingsKind;
}

export function messageTemplateBindingsSerializer(item: MessageTemplateBindings): any {
  return { kind: item["kind"] };
}

export function messageTemplateBindingsDeserializer(item: any): MessageTemplateBindings {
  return {
    kind: item["kind"],
  };
}

/** Alias for MessageTemplateBindingsUnion */
export type MessageTemplateBindingsUnion =
  | WhatsAppMessageTemplateBindings
  | MessageTemplateBindings;

export function messageTemplateBindingsUnionSerializer(item: MessageTemplateBindingsUnion): any {
  switch (item.kind) {
    case "whatsApp":
      return whatsAppMessageTemplateBindingsSerializer(item as WhatsAppMessageTemplateBindings);

    default:
      return messageTemplateBindingsSerializer(item);
  }
}

export function messageTemplateBindingsUnionDeserializer(item: any): MessageTemplateBindingsUnion {
  switch (item["kind"]) {
    case "whatsApp":
      return whatsAppMessageTemplateBindingsDeserializer(item as WhatsAppMessageTemplateBindings);

    default:
      return messageTemplateBindingsDeserializer(item);
  }
}

/** The type of the message template. */
export type MessageTemplateBindingsKind = "whatsApp";

/** The template bindings for WhatsApp */
export interface WhatsAppMessageTemplateBindings extends MessageTemplateBindings {
  /** MessageTemplateBindings is whatsApp */
  kind: "whatsApp";
  /** The header template bindings */
  header?: WhatsAppMessageTemplateBindingsComponent[];
  /** The body template bindings */
  body?: WhatsAppMessageTemplateBindingsComponent[];
  /** The footer template bindings */
  footer?: WhatsAppMessageTemplateBindingsComponent[];
  /** The button template bindings */
  buttons?: WhatsAppMessageTemplateBindingsButton[];
}

export function whatsAppMessageTemplateBindingsSerializer(
  item: WhatsAppMessageTemplateBindings,
): any {
  return {
    kind: item["kind"],
    header: !item["header"]
      ? item["header"]
      : whatsAppMessageTemplateBindingsComponentArraySerializer(item["header"]),
    body: !item["body"]
      ? item["body"]
      : whatsAppMessageTemplateBindingsComponentArraySerializer(item["body"]),
    footer: !item["footer"]
      ? item["footer"]
      : whatsAppMessageTemplateBindingsComponentArraySerializer(item["footer"]),
    buttons: !item["buttons"]
      ? item["buttons"]
      : whatsAppMessageTemplateBindingsButtonArraySerializer(item["buttons"]),
  };
}

export function whatsAppMessageTemplateBindingsDeserializer(
  item: any,
): WhatsAppMessageTemplateBindings {
  return {
    kind: item["kind"],
    header: !item["header"]
      ? item["header"]
      : whatsAppMessageTemplateBindingsComponentArrayDeserializer(item["header"]),
    body: !item["body"]
      ? item["body"]
      : whatsAppMessageTemplateBindingsComponentArrayDeserializer(item["body"]),
    footer: !item["footer"]
      ? item["footer"]
      : whatsAppMessageTemplateBindingsComponentArrayDeserializer(item["footer"]),
    buttons: !item["buttons"]
      ? item["buttons"]
      : whatsAppMessageTemplateBindingsButtonArrayDeserializer(item["buttons"]),
  };
}

export function whatsAppMessageTemplateBindingsComponentArraySerializer(
  result: Array<WhatsAppMessageTemplateBindingsComponent>,
): any[] {
  return result.map((item) => {
    return whatsAppMessageTemplateBindingsComponentSerializer(item);
  });
}

export function whatsAppMessageTemplateBindingsComponentArrayDeserializer(
  result: Array<WhatsAppMessageTemplateBindingsComponent>,
): any[] {
  return result.map((item) => {
    return whatsAppMessageTemplateBindingsComponentDeserializer(item);
  });
}

/** The template bindings component for WhatsApp */
export interface WhatsAppMessageTemplateBindingsComponent {
  /** The name of the referenced item in the template values. */
  refValue: string;
}

export function whatsAppMessageTemplateBindingsComponentSerializer(
  item: WhatsAppMessageTemplateBindingsComponent,
): any {
  return { refValue: item["refValue"] };
}

export function whatsAppMessageTemplateBindingsComponentDeserializer(
  item: any,
): WhatsAppMessageTemplateBindingsComponent {
  return {
    refValue: item["refValue"],
  };
}

export function whatsAppMessageTemplateBindingsButtonArraySerializer(
  result: Array<WhatsAppMessageTemplateBindingsButton>,
): any[] {
  return result.map((item) => {
    return whatsAppMessageTemplateBindingsButtonSerializer(item);
  });
}

export function whatsAppMessageTemplateBindingsButtonArrayDeserializer(
  result: Array<WhatsAppMessageTemplateBindingsButton>,
): any[] {
  return result.map((item) => {
    return whatsAppMessageTemplateBindingsButtonDeserializer(item);
  });
}

/** The template bindings component button for WhatsApp */
export interface WhatsAppMessageTemplateBindingsButton {
  /** The WhatsApp button sub type */
  subType: WhatsAppMessageButtonSubType;
  /** The name of the referenced item in the template values. */
  refValue: string;
}

export function whatsAppMessageTemplateBindingsButtonSerializer(
  item: WhatsAppMessageTemplateBindingsButton,
): any {
  return { subType: item["subType"], refValue: item["refValue"] };
}

export function whatsAppMessageTemplateBindingsButtonDeserializer(
  item: any,
): WhatsAppMessageTemplateBindingsButton {
  return {
    subType: item["subType"],
    refValue: item["refValue"],
  };
}

/** The WhatsApp button sub type. */
export type WhatsAppMessageButtonSubType = "quickReply" | "url";

/** Result of the send message operation. */
export interface SendMessageResult {
  /** Receipts of the send message operation. */
  receipts: MessageReceipt[];
}

export function sendMessageResultDeserializer(item: any): SendMessageResult {
  return {
    receipts: messageReceiptArrayDeserializer(item["receipts"]),
  };
}

export function messageReceiptArrayDeserializer(result: Array<MessageReceipt>): any[] {
  return result.map((item) => {
    return messageReceiptDeserializer(item);
  });
}

/** Receipt of the sending one message. */
export interface MessageReceipt {
  /** The message id. */
  messageId: string;
  /** The native external platform user identifier of the recipient. */
  to: string;
}

export function messageReceiptDeserializer(item: any): MessageReceipt {
  return {
    messageId: item["messageId"],
    to: item["to"],
  };
}

/** A request to send a read receipt update from Business to User. */
export interface ReadReceiptContent {
  /** The id of the message this read receipt refers to. */
  messageId: string;
  /** The Channel Registration ID for the Business Identifier. */
  channelRegistrationId: string;
  /** Whether this status update includes a typing indicator. This field defaults to false when not provided. */
  typingIndicator?: boolean;
}

export function readReceiptContentSerializer(item: ReadReceiptContent): any {
  return {
    messageId: item["messageId"],
    channelRegistrationId: item["channelRegistrationId"],
    typingIndicator: item["typingIndicator"],
  };
}

/** Paged collection of MessageTemplateItem items */
export interface _PagedMessageTemplateItem {
  /** The MessageTemplateItem items on this page */
  value: MessageTemplateItemUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedMessageTemplateItemDeserializer(item: any): _PagedMessageTemplateItem {
  return {
    value: messageTemplateItemUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function messageTemplateItemUnionArrayDeserializer(
  result: Array<MessageTemplateItemUnion>,
): any[] {
  return result.map((item) => {
    return messageTemplateItemUnionDeserializer(item);
  });
}

/** The message template as returned from the service. */
export interface MessageTemplateItem {
  /** The template's name. */
  readonly name: string;
  /** The template's language, in the ISO 639 format, consist of a two-letter language code followed by an optional two-letter country code, e.g., 'en' or 'en_US'. */
  language: string;
  /** The aggregated template status. */
  status: MessageTemplateStatus;
  /** The type discriminator describing a template type. */
  /** The discriminator possible values: whatsApp */
  kind: CommunicationMessagesChannel;
}

export function messageTemplateItemDeserializer(item: any): MessageTemplateItem {
  return {
    name: item["name"],
    language: item["language"],
    status: item["status"],
    kind: item["kind"],
  };
}

/** Alias for MessageTemplateItemUnion */
export type MessageTemplateItemUnion = WhatsAppMessageTemplateItem | MessageTemplateItem;

export function messageTemplateItemUnionDeserializer(item: any): MessageTemplateItemUnion {
  switch (item["kind"]) {
    case "whatsApp":
      return whatsAppMessageTemplateItemDeserializer(item as WhatsAppMessageTemplateItem);

    default:
      return messageTemplateItemDeserializer(item);
  }
}

/** The aggregated template status. */
export type MessageTemplateStatus = "approved" | "rejected" | "pending" | "paused";
/** The type of the communication messages channel. */
export type CommunicationMessagesChannel = "whatsApp";

/** The WhatsApp-specific template response contract */
export interface WhatsAppMessageTemplateItem extends MessageTemplateItem {
  /** WhatsApp platform's template content. This is the payload returned from WhatsApp API. */
  content?: any;
  /** Message template response type is whatsApp. */
  kind: "whatsApp";
}

export function whatsAppMessageTemplateItemDeserializer(item: any): WhatsAppMessageTemplateItem {
  return {
    name: item["name"],
    language: item["language"],
    status: item["status"],
    kind: item["kind"],
    content: item["content"],
  };
}

/** A conversation. */
export interface CommunicationConversation {
  /** The conversation ID. */
  readonly id: string;
  /** The conversation topic. */
  topic?: string;
  /** List of delivery channel IDs. */
  deliveryChannelIds?: string[];
  /** Outbound delivery strategy for the conversation. */
  outboundDeliveryStrategy?: OutboundDeliveryStrategyKind;
  /** List of participants involved in the conversation. */
  participants?: ConversationParticipantUnion[];
}

export function communicationConversationSerializer(item: CommunicationConversation): any {
  return {
    topic: item["topic"],
    deliveryChannelIds: !item["deliveryChannelIds"]
      ? item["deliveryChannelIds"]
      : item["deliveryChannelIds"].map((p: any) => {
          return p;
        }),
    outboundDeliveryStrategy: item["outboundDeliveryStrategy"],
    participants: !item["participants"]
      ? item["participants"]
      : conversationParticipantUnionArraySerializer(item["participants"]),
  };
}

export function communicationConversationDeserializer(item: any): CommunicationConversation {
  return {
    id: item["id"],
    topic: item["topic"],
    deliveryChannelIds: !item["deliveryChannelIds"]
      ? item["deliveryChannelIds"]
      : item["deliveryChannelIds"].map((p: any) => {
          return p;
        }),
    outboundDeliveryStrategy: item["outboundDeliveryStrategy"],
    participants: !item["participants"]
      ? item["participants"]
      : conversationParticipantUnionArrayDeserializer(item["participants"]),
  };
}

/** The options of the outbound delivery strategy for messages sent by participants in a conversation. */
export type OutboundDeliveryStrategyKind = "internalOnly" | "allParticipants";

export function conversationParticipantUnionArraySerializer(
  result: Array<ConversationParticipantUnion>,
): any[] {
  return result.map((item) => {
    return conversationParticipantUnionSerializer(item);
  });
}

export function conversationParticipantUnionArrayDeserializer(
  result: Array<ConversationParticipantUnion>,
): any[] {
  return result.map((item) => {
    return conversationParticipantUnionDeserializer(item);
  });
}

/** Advanced Messaging conversation participant. */
export interface ConversationParticipant {
  /** Participant Identifier. */
  readonly id: string;
  /** Participant display name. */
  displayName?: string;
  /** The type discriminator describing a participant type. */
  /** The discriminator possible values: internal, external */
  kind: ParticipantKind;
}

export function conversationParticipantSerializer(item: ConversationParticipant): any {
  return { displayName: item["displayName"], kind: item["kind"] };
}

export function conversationParticipantDeserializer(item: any): ConversationParticipant {
  return {
    id: item["id"],
    displayName: item["displayName"],
    kind: item["kind"],
  };
}

/** Alias for ConversationParticipantUnion */
export type ConversationParticipantUnion =
  | InternalConversationParticipant
  | ExternalConversationParticipant
  | ConversationParticipant;

export function conversationParticipantUnionSerializer(item: ConversationParticipantUnion): any {
  switch (item.kind) {
    case "internal":
      return internalConversationParticipantSerializer(item as InternalConversationParticipant);

    case "external":
      return externalConversationParticipantSerializer(item as ExternalConversationParticipant);

    default:
      return conversationParticipantSerializer(item);
  }
}

export function conversationParticipantUnionDeserializer(item: any): ConversationParticipantUnion {
  switch (item["kind"]) {
    case "internal":
      return internalConversationParticipantDeserializer(item as InternalConversationParticipant);

    case "external":
      return externalConversationParticipantDeserializer(item as ExternalConversationParticipant);

    default:
      return conversationParticipantDeserializer(item);
  }
}

/** The type of a participant in a threaded conversation. */
export type ParticipantKind = "internal" | "external";

/** Internal conversation participant. */
export interface InternalConversationParticipant extends ConversationParticipant {
  /** Participant type is internal. */
  kind: "internal";
  /** The internal platform identifiers for the participant. */
  contact: ContactUnion;
}

export function internalConversationParticipantSerializer(
  item: InternalConversationParticipant,
): any {
  return {
    displayName: item["displayName"],
    kind: item["kind"],
    contact: contactUnionSerializer(item["contact"]),
  };
}

export function internalConversationParticipantDeserializer(
  item: any,
): InternalConversationParticipant {
  return {
    id: item["id"],
    displayName: item["displayName"],
    kind: item["kind"],
    contact: contactUnionDeserializer(item["contact"]),
  };
}

/** Details of an external platform contact. */
export interface Contact {
  /** External platform identifier. */
  id: string;
  /** Type of message platform (e.g., WhatsApp). */
  /** The discriminator possible values: communication, bot, whatsApp */
  kind: MessagePlatformKind;
}

export function contactSerializer(item: Contact): any {
  return { id: item["id"], kind: item["kind"] };
}

export function contactDeserializer(item: any): Contact {
  return {
    id: item["id"],
    kind: item["kind"],
  };
}

/** Alias for ContactUnion */
export type ContactUnion = CommunicationContact | BotContact | WhatsAppContact | Contact;

export function contactUnionSerializer(item: ContactUnion): any {
  switch (item.kind) {
    case "communication":
      return communicationContactSerializer(item as CommunicationContact);

    case "bot":
      return botContactSerializer(item as BotContact);

    case "whatsApp":
      return whatsAppContactSerializer(item as WhatsAppContact);

    default:
      return contactSerializer(item);
  }
}

export function contactUnionDeserializer(item: any): ContactUnion {
  switch (item["kind"]) {
    case "communication":
      return communicationContactDeserializer(item as CommunicationContact);

    case "bot":
      return botContactDeserializer(item as BotContact);

    case "whatsApp":
      return whatsAppContactDeserializer(item as WhatsAppContact);

    default:
      return contactDeserializer(item);
  }
}

/** Defines the type of message platform. */
export type MessagePlatformKind = "communication" | "bot" | "whatsApp";

/** Communication Contact. */
export interface CommunicationContact extends Contact {
  /** Contact type is communication. */
  kind: "communication";
}

export function communicationContactSerializer(item: CommunicationContact): any {
  return { id: item["id"], kind: item["kind"] };
}

export function communicationContactDeserializer(item: any): CommunicationContact {
  return {
    id: item["id"],
    kind: item["kind"],
  };
}

/** Bot Contact. */
export interface BotContact extends Contact {
  /** Contact type is bot. */
  kind: "bot";
  /** Bot App Id of the Bot Contact. */
  botAppId: string;
}

export function botContactSerializer(item: BotContact): any {
  return { id: item["id"], kind: item["kind"], botAppId: item["botAppId"] };
}

export function botContactDeserializer(item: any): BotContact {
  return {
    id: item["id"],
    kind: item["kind"],
    botAppId: item["botAppId"],
  };
}

/** WhatsApp Contact. */
export interface WhatsAppContact extends Contact {
  /** Contact type is whatsApp. */
  kind: "whatsApp";
}

export function whatsAppContactSerializer(item: WhatsAppContact): any {
  return { id: item["id"], kind: item["kind"] };
}

export function whatsAppContactDeserializer(item: any): WhatsAppContact {
  return {
    id: item["id"],
    kind: item["kind"],
  };
}

/** External conversation participant. */
export interface ExternalConversationParticipant extends ConversationParticipant {
  /** Participant type is external. */
  kind: "external";
  /** List of external platform identifiers for the participant. */
  contacts: ContactUnion[];
}

export function externalConversationParticipantSerializer(
  item: ExternalConversationParticipant,
): any {
  return {
    displayName: item["displayName"],
    kind: item["kind"],
    contacts: contactUnionArraySerializer(item["contacts"]),
  };
}

export function externalConversationParticipantDeserializer(
  item: any,
): ExternalConversationParticipant {
  return {
    id: item["id"],
    displayName: item["displayName"],
    kind: item["kind"],
    contacts: contactUnionArrayDeserializer(item["contacts"]),
  };
}

export function contactUnionArraySerializer(result: Array<ContactUnion>): any[] {
  return result.map((item) => {
    return contactUnionSerializer(item);
  });
}

export function contactUnionArrayDeserializer(result: Array<ContactUnion>): any[] {
  return result.map((item) => {
    return contactUnionDeserializer(item);
  });
}

/** Details of a message. */
export interface Message {
  /** Content of the message. */
  content: string;
}

export function messageSerializer(item: Message): any {
  return { content: item["content"] };
}

/** Paged collection of Conversation items */
export interface _PagedConversation {
  /** The Conversation items on this page */
  value: CommunicationConversation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedConversationDeserializer(item: any): _PagedConversation {
  return {
    value: communicationConversationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function communicationConversationArraySerializer(
  result: Array<CommunicationConversation>,
): any[] {
  return result.map((item) => {
    return communicationConversationSerializer(item);
  });
}

export function communicationConversationArrayDeserializer(
  result: Array<CommunicationConversation>,
): any[] {
  return result.map((item) => {
    return communicationConversationDeserializer(item);
  });
}

/** Paged collection of ConversationMessageItem items */
export interface _PagedConversationMessageItem {
  /** The ConversationMessageItem items on this page */
  value: ConversationMessageItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedConversationMessageItemDeserializer(
  item: any,
): _PagedConversationMessageItem {
  return {
    value: conversationMessageItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function conversationMessageItemArrayDeserializer(
  result: Array<ConversationMessageItem>,
): any[] {
  return result.map((item) => {
    return conversationMessageItemDeserializer(item);
  });
}

/** The conversation message as returned from the service. */
export interface ConversationMessageItem {
  /** Message ID. */
  readonly id: string;
  /** Message sequence ID. */
  sequenceId?: number;
  /** Payload of a threaded conversation message. */
  message: ConversationMessageContentUnion;
  /** The display name of the message sender. */
  senderDisplayName?: string;
  /** The communication identifier of the message sender. */
  senderCommunicationIdentifier: string;
  /** Timestamp when the message is sent. */
  createdOn: Date;
}

export function conversationMessageItemDeserializer(item: any): ConversationMessageItem {
  return {
    id: item["id"],
    sequenceId: item["sequenceId"],
    message: conversationMessageContentUnionDeserializer(item["message"]),
    senderDisplayName: item["senderDisplayName"],
    senderCommunicationIdentifier: item["senderCommunicationIdentifier"],
    createdOn: new Date(item["createdOn"]),
  };
}

/** Details of the conversation message content. */
export interface ConversationMessageContent {
  /** The type discriminator describing a message type. */
  /** The discriminator possible values: text, image, document, video, audio, template */
  kind: CommunicationMessageKind;
}

export function conversationMessageContentSerializer(item: ConversationMessageContent): any {
  return { kind: item["kind"] };
}

export function conversationMessageContentDeserializer(item: any): ConversationMessageContent {
  return {
    kind: item["kind"],
  };
}

/** Alias for ConversationMessageContentUnion */
export type ConversationMessageContentUnion =
  | TextConversationMessageContent
  | ImageConversationMessageContent
  | DocumentConversationMessageContent
  | VideoConversationMessageContent
  | AudioConversationMessageContent
  | TemplateConversationMessageContent
  | ConversationMessageContent;

export function conversationMessageContentUnionSerializer(
  item: ConversationMessageContentUnion,
): any {
  switch (item.kind) {
    case "text":
      return textConversationMessageContentSerializer(item as TextConversationMessageContent);

    case "image":
      return imageConversationMessageContentSerializer(item as ImageConversationMessageContent);

    case "document":
      return documentConversationMessageContentSerializer(
        item as DocumentConversationMessageContent,
      );

    case "video":
      return videoConversationMessageContentSerializer(item as VideoConversationMessageContent);

    case "audio":
      return audioConversationMessageContentSerializer(item as AudioConversationMessageContent);

    case "template":
      return templateConversationMessageContentSerializer(
        item as TemplateConversationMessageContent,
      );

    default:
      return conversationMessageContentSerializer(item);
  }
}

export function conversationMessageContentUnionDeserializer(
  item: any,
): ConversationMessageContentUnion {
  switch (item["kind"]) {
    case "text":
      return textConversationMessageContentDeserializer(item as TextConversationMessageContent);

    case "image":
      return imageConversationMessageContentDeserializer(item as ImageConversationMessageContent);

    case "document":
      return documentConversationMessageContentDeserializer(
        item as DocumentConversationMessageContent,
      );

    case "video":
      return videoConversationMessageContentDeserializer(item as VideoConversationMessageContent);

    case "audio":
      return audioConversationMessageContentDeserializer(item as AudioConversationMessageContent);

    case "template":
      return templateConversationMessageContentDeserializer(
        item as TemplateConversationMessageContent,
      );

    default:
      return conversationMessageContentDeserializer(item);
  }
}

/** A request to send a text conversation message. */
export interface TextConversationMessageContent extends ConversationMessageContent {
  /** Message notification type is text. */
  kind: "text";
  /** Message content. */
  content: string;
}

export function textConversationMessageContentSerializer(
  item: TextConversationMessageContent,
): any {
  return { kind: item["kind"], content: item["content"] };
}

export function textConversationMessageContentDeserializer(
  item: any,
): TextConversationMessageContent {
  return {
    kind: item["kind"],
    content: item["content"],
  };
}

/** A request to send an image conversation message. */
export interface ImageConversationMessageContent extends ConversationMessageContent {
  /** Message notification type is image. */
  kind: "image";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function imageConversationMessageContentSerializer(
  item: ImageConversationMessageContent,
): any {
  return { kind: item["kind"], caption: item["caption"], mediaUri: item["mediaUri"] };
}

export function imageConversationMessageContentDeserializer(
  item: any,
): ImageConversationMessageContent {
  return {
    kind: item["kind"],
    caption: item["caption"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send a document conversation message. */
export interface DocumentConversationMessageContent extends ConversationMessageContent {
  /** Message notification type is document. */
  kind: "document";
  /** Optional text content. */
  caption?: string;
  /** Optional name for the file. */
  fileName?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function documentConversationMessageContentSerializer(
  item: DocumentConversationMessageContent,
): any {
  return {
    kind: item["kind"],
    caption: item["caption"],
    fileName: item["fileName"],
    mediaUri: item["mediaUri"],
  };
}

export function documentConversationMessageContentDeserializer(
  item: any,
): DocumentConversationMessageContent {
  return {
    kind: item["kind"],
    caption: item["caption"],
    fileName: item["fileName"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send a video conversation message. */
export interface VideoConversationMessageContent extends ConversationMessageContent {
  /** Message notification type is video. */
  kind: "video";
  /** Optional text content. */
  caption?: string;
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function videoConversationMessageContentSerializer(
  item: VideoConversationMessageContent,
): any {
  return { kind: item["kind"], caption: item["caption"], mediaUri: item["mediaUri"] };
}

export function videoConversationMessageContentDeserializer(
  item: any,
): VideoConversationMessageContent {
  return {
    kind: item["kind"],
    caption: item["caption"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send an audio conversation message. */
export interface AudioConversationMessageContent extends ConversationMessageContent {
  /** Message notification type is audio. */
  kind: "audio";
  /** A media url for the file. Required if the type is one of the supported media types, e.g. image */
  mediaUri: string;
}

export function audioConversationMessageContentSerializer(
  item: AudioConversationMessageContent,
): any {
  return { kind: item["kind"], mediaUri: item["mediaUri"] };
}

export function audioConversationMessageContentDeserializer(
  item: any,
): AudioConversationMessageContent {
  return {
    kind: item["kind"],
    mediaUri: item["mediaUri"],
  };
}

/** A request to send a template conversation message. */
export interface TemplateConversationMessageContent extends ConversationMessageContent {
  /** Message notification type is template. */
  kind: "template";
  /** The template object used to create templates. */
  template: MessageTemplate;
}

export function templateConversationMessageContentSerializer(
  item: TemplateConversationMessageContent,
): any {
  return { kind: item["kind"], template: messageTemplateSerializer(item["template"]) };
}

export function templateConversationMessageContentDeserializer(
  item: any,
): TemplateConversationMessageContent {
  return {
    kind: item["kind"],
    template: messageTemplateDeserializer(item["template"]),
  };
}

/** Request payload for adding participants to a conversation. */
export interface AddParticipantsOptions {
  /** List of participants to add. */
  participants: ConversationParticipantUnion[];
}

export function addParticipantsOptionsSerializer(item: AddParticipantsOptions): any {
  return { participants: conversationParticipantUnionArraySerializer(item["participants"]) };
}

/** Response for the add participants operation. */
export interface AddParticipantsResult {
  /** List of Ids with Errors if failed to be added */
  invalidParticipants: UpdateParticipantsResult[];
}

export function addParticipantsResultDeserializer(item: any): AddParticipantsResult {
  return {
    invalidParticipants: updateParticipantsResultArrayDeserializer(item["invalidParticipants"]),
  };
}

export function updateParticipantsResultArrayDeserializer(
  result: Array<UpdateParticipantsResult>,
): any[] {
  return result.map((item) => {
    return updateParticipantsResultDeserializer(item);
  });
}

/** Response for the remove participants operation. */
export interface UpdateParticipantsResult {
  /** Participant User Id. */
  id: string;
  /** Error of the participant operation. */
  error?: ErrorModel;
}

export function updateParticipantsResultDeserializer(item: any): UpdateParticipantsResult {
  return {
    id: item["id"],
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** Request payload for removing participants from a conversation. */
export interface RemoveParticipantsOptions {
  /** The participant IDs to remove. */
  participantIds: string[];
}

export function removeParticipantsOptionsSerializer(item: RemoveParticipantsOptions): any {
  return {
    participantIds: item["participantIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Response for the remove participants operation. */
export interface RemoveParticipantsResult {
  /** List of Ids with Errors if failed to be added */
  invalidParticipants: UpdateParticipantsResult[];
}

export function removeParticipantsResultDeserializer(item: any): RemoveParticipantsResult {
  return {
    invalidParticipants: updateParticipantsResultArrayDeserializer(item["invalidParticipants"]),
  };
}

/** Result of the get conversation messages AI Analysis operation. */
export interface GetConversationThreadAnalysisResult {
  /** The AI summary of the conversation messages. */
  summary: string;
}

export function getConversationThreadAnalysisResultDeserializer(
  item: any,
): GetConversationThreadAnalysisResult {
  return {
    summary: item["summary"],
  };
}

/** Request payload for sending a conversation message. */
export interface SendConversationMessageOptions {
  /** Details of a send conversation message request. */
  request: ConversationMessageContentUnion;
  /**
   * The options of the outbound delivery strategy for messages sent by participants in a conversation.
   * Supports internalOnly, allChannels.
   */
  outboundDeliveryStrategy?: OutboundDeliveryStrategyKind;
}

export function sendConversationMessageOptionsSerializer(
  item: SendConversationMessageOptions,
): any {
  return {
    request: conversationMessageContentUnionSerializer(item["request"]),
    outboundDeliveryStrategy: item["outboundDeliveryStrategy"],
  };
}

/** Result of the send conversation message operation. */
export interface SendConversationMessageResult {
  /** A server-generated Advanced Messaging conversation message id. */
  messageId: string;
}

export function sendConversationMessageResultDeserializer(
  item: any,
): SendConversationMessageResult {
  return {
    messageId: item["messageId"],
  };
}

/** Repeatability Result header options */
export type RepeatabilityResult = "accepted" | "rejected";

/** Azure Communication Messages Versions */
export enum KnownVersions {
  /** Azure Communication Messages 2024-02-01 api version */
  C20240201 = "2024-02-01",
  /** Azure Communication Messages 2024-08-30 api version */
  C20240830 = "2024-08-30",
  /** Azure Communication Messages 2025-01-15-preview api version */
  C20250115Preview = "2025-01-15-preview",
  /** Azure Communication Messages 2025-04-01-preview api version */
  C20250401Preview = "2025-04-01-preview",
  /** Azure Communication Messages 2025-09-01-preview api version */
  C20250901Preview = "2025-09-01-preview",
}

export type DownloadMediaResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeReadableStream;
};
