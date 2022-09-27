// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AdmNotification,
  AppleNotification,
  BaiduNotification,
  FcmLegacyNotification,
  WindowsNotification,
  createAdmNotification,
  createAppleNotification,
  createBaiduNotification,
  createFcmLegacyNotification,
  createWindowsBadgeNotification,
} from "./notification.js";
import { isDefined, isString } from "../utils/utils.js";
import { stringifyXML } from "@azure/core-xml";

/**
 * Represents what is in the APNs alert body.
 */
export interface AppleAlert {
  /**
   * The title of the notification. Apple Watch displays this string in the short look notification
   * interface. Specify a string that’s quickly understood by the user.
   */
  title?: string;

  /**
   * Additional information that explains the purpose of the notification.
   */
  subtitle?: string;

  /**
   * The content of the alert message.
   */
  body?: string;

  /**
   * The name of the launch image file to display. If the user chooses to launch your app,
   * the contents of the specified image or storyboard file are displayed instead of your app’s normal launch image.
   */
  launchImage?: string;

  /**
   * The key for a localized title string. Specify this key instead of the title key to retrieve
   * the title from your app’s Localizable.strings files. The value must contain the name of a key in your strings file.
   */
  titleLocKey?: string;

  /**
   * An array of strings containing replacement values for variables in your title string.
   * Each %\@ character in the string specified by the title-loc-key is replaced by a value
   * from this array. The first item in the array replaces the first instance
   * of the %\@ character in the string, the second item replaces the second instance, and so on.
   */
  titleLocArgs?: string[];

  /**
   * The key for a localized subtitle string. Use this key, instead of the subtitle key, to
   * retrieve the subtitle from your app’s Localizable.strings file.
   * The value must contain the name of a key in your strings file.
   */
  subtitleLocKey?: string;

  /**
   * An array of strings containing replacement values for variables in your title string.
   * Each %\@ character in the string specified by subtitle-loc-key is replaced by a value
   * from this array. The first item in the array replaces the first instance of the
   * %\@ character in the string, the second item replaces the second instance, and so on.
   */
  subtitleLocArgs?: string[];

  /**
   * The key for a localized message string. Use this key, instead of the body key, to
   * retrieve the message text from your app’s Localizable.strings file. The value must contain
   * the name of a key in your strings file.
   */
  locKey?: string;

  /**
   * An array of strings containing replacement values for variables in your message text.
   * Each %\@ character in the string specified by loc-key is replaced by a value from
   * this array. The first item in the array replaces the first instance of the %\@ character
   * in the string, the second item replaces the second instance, and so on.
   */
  locArgs?: string[];
}

/**
 * Represents an APNs critical sound
 */
export interface AppleCriticalSound {
  /**
   * The critical alert flag. Set to 1 to enable the critical alert.
   */
  critical: number;

  /**
   * The name of a sound file in your app’s main bundle or in the Library/Sounds folder
   * of your app’s container directory. Specify the string “default” to play the system sound.
   */
  name: string;

  /**
   * The volume for the critical alert’s sound. Set this to a value between 0 (silent) and 1 (full volume).
   */
  volume: number;
}

/**
 * Represents a native APNs message.
 */
export interface AppleNativeMessage extends Record<string, any> {
  /**
   * The information for displaying an alert.
   */
  alert?: string | AppleAlert;

  /**
   * The number to display in a badge on your app’s icon.
   */
  badge?: number;

  /**
   * The name of a sound file in your app’s main bundle or in the Library/Sounds
   * folder of your app’s container directory. Specify the string “default” to
   * play the system sound. Use this key for regular notifications.
   * For critical alerts, use the sound dictionary instead.
   */
  sound?: string | AppleCriticalSound;

  /**
   * An app-specific identifier for grouping related notifications.
   */
  threadId?: string;

  /**
   * The notification’s type.
   */
  category?: string;

  /**
   * The background notification flag. To perform a silent background update,
   * specify the value 1 and don’t include the alert, badge, or sound keys in your payload.
   */
  contentAvailable?: number;

  /**
   * The notification service app extension flag. If the value is 1, the system passes
   * the notification to your notification service app extension before delivery.
   */
  mutableContent?: number;

  /**
   * The identifier of the window brought forward.
   */
  targetContentId?: string;

  /**
   * The importance and delivery timing of a notification.
   */
  interruptionLevel?: "passive" | "active" | "time-sensitive" | "critical";

  /**
   * The relevance score, a number between 0 and 1, that the system uses to sort the
   * notifications from your app. The highest score gets featured in the notification summary.
   */
  relevanceScore?: number;

  /**
   * The criteria the system evaluates to determine if it displays the notification in the current Focus.
   */
  filterCriteria?: string;
}

function createAppleNativeAlert(
  nativeAlert?: string | AppleAlert
): Record<string, any> | string | undefined {
  if (!isDefined(nativeAlert)) {
    return undefined;
  }

  if (isString(nativeAlert)) {
    return nativeAlert;
  }

  const alert: Record<string, any> = {
    title: nativeAlert.title,
    subtitle: nativeAlert.subtitle,
    body: nativeAlert.body,
    "launch-image": nativeAlert.launchImage,
    "title-loc-key": nativeAlert.titleLocKey,
    "title-loc-args": nativeAlert.titleLocArgs,
    "subtitle-loc-key": nativeAlert.subtitleLocKey,
    "subtitle-loc-args": nativeAlert.subtitleLocArgs,
    "loc-key": nativeAlert.locKey,
    "loc-args": nativeAlert.locArgs,
  };

  return alert;
}

/**
 * Creates an APNs native message to send to Notification Hubs.
 * @param nativeMessage - The Apple native message properties to set.
 * @param additionalProperties - Additional properties for Apple messages.
 * @returns An AppleNotification to send to Notification Hubs.
 */
export function buildAppleNativeMessage(
  nativeMessage: AppleNativeMessage,
  additionalProperties?: Record<string, any>
): AppleNotification {
  const headers: Record<string, string> = {};

  const message: Record<string, any> = {
    aps: {
      alert: createAppleNativeAlert(nativeMessage.alert),
      sound: nativeMessage.sound,
      badge: nativeMessage.badge,
      "thread-id": nativeMessage.threadId,
      category: nativeMessage.category,
      "content-available": nativeMessage.contentAvailable,
      "mutable-content": nativeMessage.mutableContent,
      "target-content-id": nativeMessage.targetContentId,
      "interruption-level": nativeMessage.interruptionLevel,
      "relevance-score": nativeMessage.relevanceScore,
      "filter-criteria": nativeMessage.filterCriteria,
    },
    ...additionalProperties,
  };

  const apnsPriority = nativeMessage?.contentAvailable === 1 ? "5" : "10";
  headers["apns-priority"] = apnsPriority;

  return createAppleNotification({
    body: JSON.stringify(message),
    headers: headers,
  });
}

/**
 * Represents the targets, options, and payload for HTTP JSON messages for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyNativeMessage {
  /**
   * The recipient of a message.
   */
  to?: string;

  /**
   * The recipient of a multicast message, a message sent to more than one registration token.
   */
  registrationIds?: string[];

  /**
   * A logical expression of conditions that determine the message target.
   */
  condition?: string;

  /**
   * Used to identify a group of messages.
   */
  collapseKey?: string;

  /**
   * The priority of the message.
   */
  priority?: "normal" | "high";

  /**
   * The background notification flag. To perform a silent background update,
   * specify the value 1 and don’t include the alert, badge, or sound keys in your payload.
   */
  contentAvailable?: boolean;

  /**
   * The notification service app extension flag. If the value is 1, the system passes
   * the notification to your notification service app extension before delivery.
   */
  mutableContent?: number;

  /**
   * Specifies how long (in seconds) the message should be kept in FCM storage if the device is offline
   */
  timeToLive?: number;

  /**
   * The package name of the application where the registration tokens must match in order to receive the message.
   */
  restrictedPackageName?: string;

  /**
   * When set to true, allows developers to test a request without actually sending a message.
   */
  dryRun?: boolean;

  /**
   * Custom key-value pairs of the message's payload.
   */
  data?: Record<string, any>;

  /**
   * The predefined, user-visible key-value pairs of the notification payload.
   */
  notification?:
    | FirebaseLegacyAppleNativePayload
    | FirebaseLegacyAndroidNativePayload
    | FirebaseLegacyWebNativePayload;
}

/**
 * Represents an APNs native payload for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyAppleNativePayload {
  /**
   * The notification's title.
   */
  title?: string;

  /**
   * The notification's body text.
   */
  body?: string;

  /**
   * The sound to play when the device receives the notification.
   */
  sound?: string;

  /**
   * The value of the badge on the home screen app icon.
   */
  badge?: string;

  /**
   * The action associated with a user click on the notification which corresponds to the APNs category.
   */
  clickAction?: string;

  /**
   * The notification's subtitle.
   */
  subtitle?: string;

  /**
   * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
   */
  bodyLocKey?: string;

  /**
   * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
   */
  bodyLocArgs?: string[];

  /**
   * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
   */
  titleLocKey?: string;

  /**
   * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
   */
  titleLocArgs?: string[];
}

/**
 * Represents an Android native payload for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyAndroidNativePayload {
  /**
   * The notification's title.
   */
  title?: string;

  /**
   * The notification's body text.
   */
  body?: string;

  /**
   * The notification's channel ID.
   */
  androidChannelId?: string;

  /**
   * The notification's icon.
   */
  icon?: string;

  /**
   * The sound to play when the device receives the notification.
   */
  sound?: string;

  /**
   * Identifier used to replace existing notifications in the notification drawer.
   */
  tag?: string;

  /**
   * The notification's icon color, expressed in #rrggbb format.
   */
  color?: string;

  /**
   * The action associated with a user click on the notification.
   */
  clickAction?: string;

  /**
   * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
   */
  bodyLocKey?: string;

  /**
   * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
   */
  bodyLocArgs?: string[];

  /**
   * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
   */
  titleLocKey?: string;

  /**
   * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
   */
  titleLocArgs?: string[];
}

/**
 * Represents an Web Push native payload for the Firebase Legacy HTTP interface.
 */
export interface FirebaseLegacyWebNativePayload {
  /**
   * The notification's title.
   */
  title?: string;

  /**
   * The notification's body text.
   */
  body?: string;

  /**
   * The URL to use for the notification's icon.
   */
  icon?: string;

  /**
   * The action associated with a user click on the notification.
   */
  clickAction?: string;
}

function buildFcmLegacyNativePayload(
  nativeNotification?:
    | FirebaseLegacyAppleNativePayload
    | FirebaseLegacyAndroidNativePayload
    | FirebaseLegacyWebNativePayload
): Record<string, any> | undefined {
  if (!isDefined(nativeNotification)) {
    return undefined;
  }

  const androidMessage = nativeNotification as FirebaseLegacyAndroidNativePayload;
  const appleMessage = nativeNotification as FirebaseLegacyAppleNativePayload;

  const notification: Record<string, any> = {
    title: nativeNotification.title,
    body: nativeNotification.body,
    click_action: nativeNotification.clickAction,

    // Apple/Android fields
    sound: appleMessage.sound,
    badge: appleMessage.badge,
    subtitle: appleMessage.subtitle,
    body_loc_key: appleMessage.bodyLocKey,
    body_loc_args: appleMessage.bodyLocArgs,
    title_loc_key: appleMessage.bodyLocKey,
    title_loc_args: appleMessage.bodyLocArgs,

    // Android/Web fields
    android_channel_id: androidMessage.androidChannelId,
    icon: androidMessage.icon,
    tag: androidMessage.tag,
    color: androidMessage.color,
  };

  return notification;
}

/**
 * Creates a FcmLegacyNotification from a native Firebase payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The FcmLegacyNotification to send to Notification Hubs.
 */
export function buildFirebaseLegacyNativeMessage(
  nativeMessage: FirebaseLegacyNativeMessage
): FcmLegacyNotification {
  const jsonMessage: Record<string, any> = {
    to: nativeMessage.to,
    registration_ids: nativeMessage.registrationIds,
    condition: nativeMessage.condition,
    collapse_key: nativeMessage.collapseKey,
    priority: nativeMessage.priority,
    content_available: nativeMessage.contentAvailable,
    mutable_content: nativeMessage.mutableContent,
    time_to_live: nativeMessage.timeToLive,
    restricted_package_name: nativeMessage.restrictedPackageName,
    dry_run: nativeMessage.dryRun,
    data: nativeMessage.data,
    notification: buildFcmLegacyNativePayload(nativeMessage.notification),
  };

  return createFcmLegacyNotification({
    body: JSON.stringify(jsonMessage),
  });
}

/**
 * Describes ADM notification messages.
 */
export interface AdmNativeNotification {
  /**
   * The notification's title.
   */
  title?: string;

  /**
   * The notification's body text.
   */
  body?: string;

  /**
   * The notification's icon.
   */
  icon?: string;

  /**
   * The notification's icon color, expressed in #rrggbb format.
   */
  color?: string;

  /**
   * The sound to play when the device receives the notification. Supports "default" or the filename of a sound resource bundled in the app.
   */
  sound?: string;

  /**
   * Identifier used to replace existing notifications in the notification drawer.
   */
  tag?: string;

  /**
   * The action associated with a user click on the notification.
   */
  clickAction?: string;

  /**
   * The key to the body string in the app's string resources to use to localize the body text to the user's current localization.
   */
  bodyLocKey?: string;

  /**
   * Variable string values to be used in place of the format specifiers in body_loc_key to use to localize the body text to the user's current localization.
   */
  bodyLocArgs?: string[];

  /**
   * The key to the title string in the app's string resources to use to localize the title text to the user's current localization.
   */
  titleLocKey?: string;

  /**
   * Variable string values to be used in place of the format specifiers in title_loc_key to use to localize the title text to the user's current localization.
   */
  titleLocArgs?: string[];

  /**
   * The notification's channel id.
   */
  channelId?: string;

  /**
   * Sets the "ticker" text, which is sent to accessibility services.
   */
  ticker?: string;

  /**
   * When set to false or unset, the notification is automatically dismissed when the user clicks it in the panel.
   */
  sticky?: boolean;

  /**
   * Set the time that the event in the notification occurred. Must be a timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z".
   */
  eventTime?: string;

  /**
   * Set whether or not this notification is relevant only to the current device.
   */
  localOnly?: boolean;

  /**
   * Set the relative priority for this notification.
   */
  notificationPriority?: number; // TODO: Enum?

  /**
   * If set to true, use the Android framework's default sound for the notification.
   */
  defaultSound?: boolean;

  /**
   * Set the Notification.visibility of the notification.
   */
  visibility?: number; // TODO: Enum?

  /**
   * Sets the number of items this notification represents.
   */
  notificationCount?: number;

  /**
   * Contains the URL of an image that is going to be displayed in a notification.
   */
  image?: string;
}

/**
 * Represents a native ADM notification message payload.
 */
export interface AdmNativeMessage {
  /**
   * The notification payload to send with the message.
   */
  notification?: AdmNativeNotification;

  /**
   * The payload data to send with the message.
   */
  data?: Record<string, string>;

  /**
   * The priority of the msssage.
   */
  priority?: "normal" | "high";

  /**
   * This is an arbitrary string used to indicate that multiple messages are logically the same
   * and that ADM is allowed to drop previously enqueued messages in favor of this new one.
   */
  consolidationKey?: string;

  /**
   * The number of seconds that ADM should retain the message if the device is offline.
   */
  expiresAfter?: number;

  /**
   * This is a base-64-encoded MD5 checksum of the data parameter.
   */
  md5?: string;
}

function buildAdmNativeNotification(
  nativeNotification?: AdmNativeNotification
): Record<string, any> | undefined {
  if (!isDefined(nativeNotification)) {
    return undefined;
  }

  return {
    title: nativeNotification.title,
    body: nativeNotification.body,
    icon: nativeNotification.icon,
    color: nativeNotification.color,
    sound: nativeNotification.sound,
    tag: nativeNotification.tag,
    click_action: nativeNotification.clickAction,
    body_loc_key: nativeNotification.bodyLocKey,
    body_loc_args: nativeNotification.bodyLocArgs,
    title_loc_key: nativeNotification.titleLocKey,
    title_loc_args: nativeNotification.titleLocArgs,
    channel_id: nativeNotification.channelId,
    ticker: nativeNotification.ticker,
    sticky: nativeNotification.sticky,
    event_time: nativeNotification.eventTime,
    local_only: nativeNotification.localOnly,
    notification_priority: nativeNotification.notificationPriority,
    default_sound: nativeNotification.defaultSound,
    visibility: nativeNotification.visibility,
    notification_count: nativeNotification.notificationCount,
    image: nativeNotification.image,
  };
}

/**
 * Creates a AdmNotification from a native ADM payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @returns The AdmNotification to send to Notification Hubs.
 */
export function buildAdmNativeMessage(nativeMessage: AdmNativeMessage): AdmNotification {
  const jsonObj: Record<string, any> = {
    notification: buildAdmNativeNotification(nativeMessage.notification),
    data: nativeMessage.data || {},
    ...nativeMessage,
  };

  return createAdmNotification({
    body: JSON.stringify(jsonObj),
  });
}

/**
 * Represents the Baidu Apple native payload.
 */
export interface BaiduAppleNativePayload {
  /**
   * The alert string.
   */
  alert?: string;

  /**
   * The APNs sound to play.
   */
  sound?: string;

  /**
   * The APNs badge count.
   */
  badge?: number;
}

/**
 * Baidu Native Format:
 * https://stackoverflow.com/questions/42591815/customize-baidu-push-json-payload
 * http://www.tuicool.com/articles/ZnmANn
 */
export interface BaiduNativeMessage extends Record<string, any> {
  /**
   * Notification title for Android.
   */
  title?: string;

  /**
   * Baidu Notification description for Android.
   */
  description?: string;

  /**
   * Baidu Notification builder ID.
   */
  notificationBuilderId?: number;

  /**
   * Baidu Notification Android basic style.
   */
  notificationBasicStyle?: number;

  /**
   * Baidu Android open type.
   */
  openType?: number;

  /**
   * Baidu Android net support option.
   */
  netSupport?: number;

  /**
   * Baidu Android user confirm.
   */
  userConfirm?: number;

  /**
   * Baidu Android URL.
   */
  url?: string;

  /**
   * Baidu Android package content.
   */
  pkgContent?: string;

  /**
   * Baidu Android package version.
   */
  pkgVersion?: string;

  /**
   * Baidu Android custom content dictionary.
   */
  customContent?: Record<string, any>;

  /**
   * Baidu APNs support.
   */
  aps?: BaiduAppleNativePayload;
}

/**
 * Creates a BaiduNotification from a native Baidu payload.
 * @param nativeMessage - The native message payload to send to Notification Hubs.
 * @param additionalProperties - Additional properties for Apple Baidu messages.
 * @returns The BaiduNotification to send to Notification Hubs.
 */
export function buildBaiduNativeMessage(
  nativeMessage: BaiduNativeMessage,
  additionalProperties?: Record<string, any>
): BaiduNotification {
  const jsonObj: Record<string, any> = {
    title: nativeMessage.title,
    description: nativeMessage.description,
    notification_builder_id: nativeMessage.notificationBuilderId,
    notification_basic_style: nativeMessage.notificationBasicStyle,
    open_type: nativeMessage.openType,
    net_support: nativeMessage.netSupport,
    user_confirm: nativeMessage.userConfirm,
    url: nativeMessage.url,
    pkg_content: nativeMessage.pkgContent,
    pkg_version: nativeMessage.pkgVersion,
    custom_content: nativeMessage.customContent,
    aps: nativeMessage.aps,
    ...additionalProperties,
  };

  return createBaiduNotification({
    body: JSON.stringify(jsonObj),
  });
}

/**
 * Represents the types of Windows Badge Glyphs
 */
export type WindowsBadgeGlyphType =
  | "none"
  | "activity"
  | "alarm"
  | "alert"
  | "attention"
  | "available"
  | "away"
  | "busy"
  | "error"
  | "newMessage"
  | "paused"
  | "playing"
  | "unavailable";

/**
 * Represents the Windows Badge Message
 */
export interface WindowsBadgeNativeMessage {
  /**
   * Either a numeric value or a string value that specifies a predefined badge glyph.
   */
  value: WindowsBadgeGlyphType | number;
}

/**
 * Builds a WindowsNotification from a Windows Badge.
 * @param nativeMessage - The Windows Badge Message to build.
 * @returns A WindowsNotification created with the badge information.
 */
export function buildWindowsBadgeNativeMessage(
  nativeMessage: WindowsBadgeNativeMessage
): WindowsNotification {
  const badge = {
    $: { value: nativeMessage.value },
  };

  return createWindowsBadgeNotification({
    body: stringifyXML(badge, { rootName: "badge" }),
  });
}
