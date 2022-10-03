// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { BrowserPushChannel } from "./installation.js";
import { objectHasProperty } from "@azure/core-util";

/**
 * Describes the options that can be provided while creating the NotificationHubsClientContext.
 */
export interface NotificationHubsClientOptions extends CommonClientOptions {}

/**
 * Options for sending notifications for both tag based send and broadcast scheduled send.
 */
export interface ScheduleNotificationOptions extends OperationOptions {
  /**
   * The tags used to target the device for push notifications in either an array as "an || condition" or tag expression.
   */
  tags?: string | string[];
}

/**
 * Options for sending notifications for both tag based send and broadcast send.
 */
export interface SendNotificationOptions extends OperationOptions {
  /**
   * The tags used to target the device for push notifications in either an array as "an || condition" or tag expression.
   */
  tags?: string | string[];
  /**
   * Set to true to enable test send.
   */
  enableTestSend?: boolean;
}

/**
 * @internal
 * Determines whether the options are of type SendNotificationOptions.
 * @param options - The options to test if SendNotificationOptions.
 * @returns true if SendNotificationOptions otherwise false.
 */
export function isSendNotificationOptions(options: unknown): options is SendNotificationOptions {
  return objectHasProperty(options, "tags") || objectHasProperty(options, "enableTestSend");
}

/**
 * Options for sending notifications to individual devices.
 */
export interface DirectSendNotificationOptions extends OperationOptions {
  /**
   * The device handle to send the notification. If an array is provided, this uses batch direct send which is only available in Standard SKU and above.
   */
  deviceHandle: string | BrowserPushChannel | string[];
}

/**
 * @internal
 * Determines whether the options are of type DirectSendNotificationOptions.
 * @param options - The options to test if DirectSendNotificationOptions.
 * @returns true if DirectSendNotificationOptions otherwise false.
 */
export function isDirectSendNotificationOptions(
  options: unknown
): options is DirectSendNotificationOptions {
  return objectHasProperty(options, "deviceHandle");
}

/**
 * Represents entity update operation options that can be set.
 */
export interface EntityOperationOptions extends OperationOptions {
  /**
   * ETag as returned by creation, update, and retrieval, or ‘*’ (overwrite).
   */
  etag?: string;
}

/**
 * Represents query options to include $top support.
 */
export interface RegistrationQueryLimitOptions extends OperationOptions {
  /**
   * The $top query member to get a number of records.
   */
  top?: number;
}

/**
 * Represents query options to include both $top and $filter.
 */
export interface RegistrationQueryOptions extends RegistrationQueryLimitOptions {
  /**
   * The OData $filter operator query string.
   */
  filter?: string;
}
