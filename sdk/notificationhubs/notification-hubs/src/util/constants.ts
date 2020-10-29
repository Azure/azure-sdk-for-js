// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 * @ignore
 */
export const packageJsonInfo = {
  name: "@azure/notification-hubs",
  version: "1.0.0-preview.1"
};

/**
 * Query string parameter to set Notification Hubs API version
 *
 * @internal
 * @ignore
 */
export const API_VERSION_QUERY_KEY = "api-version";

/**
 * Current API version being sent to Notification Hubs
 *
 * @internal
 * @ignore
 */
export const CURRENT_API_VERSION = "2020-06";

export const FORMAT_HEADER_NAME = "FormatHeaderName";

export const ADM_CONTENT_TYPE = "application/json";

export const APPLE_TEMPLATE_REGISTRATION_TYPE = "appletemplate";
export const APPLE_CONTENT_TYPE = "application/json;charset=utf-8";
export const APPLE_DEVICE_TOKEN_REGEX = /^[a-fA-F0-9]+$/;
export const APPLE_EXPIRY_HEADER = "ServiceBusNotification-Apns-Expiry";
export const APPLE_PRIORITY_HEADER = "X-Apns-Priority";
export const APPLE_HEADER_PREFIX = "apns-";
export const APPLE_APNS_EXPIRY_HEADER = "apns-expiration";
export const APPLE_APNS_PRIORITY_HEADER = "apns-priority";

export const BAIDU_MESSAGE_TYPE_HEADER = "X-Baidu-Message-Type";
export const BAIDU_CONTENT_TYPE = "application/x-www-form-urlencoded";

export const FIREBASE_CONTENT_TYPE = "application/json;charset=utf-8";
export const FIREBASE_FORMAT_HEADER_NAME = "fcm";
export const FIREBASE_TEMPLATE_REGISTRATION_TYPE = "fcmtemplate";

export const TEMPLATE_REGISTRATION_TYPE = "template";

export const WNS_CONTENT_TYPE = "application/xml";
export const WNS_STREAM_CONTENT_TYPE = "application/octet-stream";
export const WNS_TYPE_NAME = "X-WNS-Type";
export const WNS_RAW = "wns/raw";
export const WNS_BADGE = "wns/badge";
export const WNS_TILE = "wns/tile";
export const WNS_TOAST = "wns/toast";

export const HEADER_DEVICE_HANDLE = "ServiceBusNotification-DeviceHandle";
export const HEADER_NOTIFICATION_FORMAT = "ServiceBusNotification-Format";
export const HEADER_TAGS = "ServiceBusNotification-Tags";
export const HEADER_SCHEDULE = "ServiceBusNotification-ScheduleTime";

export const XML_METADATA_MARKER = "$";
