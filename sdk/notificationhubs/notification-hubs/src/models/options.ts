// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientOptions, OperationOptions } from "@azure-rest/core-client";
import { BrowserPushChannel } from "./installation.js";

/**
 * Describes the options that can be provided while creating the NotificationHubsClientContext.
 */
export interface NotificationHubsClientOptions extends ClientOptions {}

/**
 * Options for polled operations including the polling interval cycle.
 */
export interface PolledOperationOptions extends OperationOptions {
  /**
   * Time delay between poll requests, in milliseconds.
   */
  updateIntervalInMs?: number;
}

/**
 * Options for sending notifications for both tag based send and broadcast scheduled send.
 */
export interface ScheduleNotificationOptions extends OperationOptions {
  /**
   * A tag expression used to target devices. Use the `createTagExpression` function to create a tag expression from an array of tags.
   * If not set, this results in a broadcast notification to be scheduled.
   */
  tagExpression?: string;
}

/**
 * Options for sending notifications for both tag based send and broadcast send.
 */
export interface SendNotificationOptions extends OperationOptions {
  /**
   * A tag expression used to target devices. Use the `createTagExpression` function to create a tag expression from an array of tags.
   * If not set, this results in a broadcast notification to be sent.
   */
  tagExpression?: string;
  /**
   * Set to true to enable test send.
   */
  enableTestSend?: boolean;
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
