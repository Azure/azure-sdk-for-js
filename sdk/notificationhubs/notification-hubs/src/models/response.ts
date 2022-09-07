// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RegistrationDescription } from "./registration.js";

/**
 * Describes a response from the Notification Hubs which includes a tracking ID, correlation ID and location.
 */
export interface NotificationHubsResponse {
  /**
   * The Tracking ID of the operation.
   */
  trackingId?: string;

  /**
   * The correlation ID of the operation.
   */
  correlationId?: string;

  /**
   * The location of the operation.
   */
  location?: string;
}

/**
 * Represents the result of the registration.
 */
export interface RegistrationResult {
  /**
   * The application platform.
   */
  applicationPlatform: string;

  /**
   * The PNS handle.
   */
  pnsHandle: string;

  /**
   * The registration ID.
   */
  registrationId: string;

  /**
   * The outcome of the registration.
   */
  outcome: string;
}

/**
 * Describes a response from the Notification Hubs service for send operations.
 */
export interface NotificationHubsMessageResponse extends NotificationHubsResponse {
  /**
   * The notification ID from the operation.  Note this is only available in Standard SKU and above.
   */
  notificationId?: string;

  /**
   * The number of devices that successfully received the notification.
   */
  success: number;

  /**
   * The number of devices that failed to receive a notification.
   */
  failure: number;

  /**
   * The list of notification outcome results for each device registered with the hub, to which this notification was sent.
   */
  results: RegistrationResult[];
}

/**
 * Describes a registration query response with registrations and a continuation token.
 */
export interface RegistrationQueryResponse {
  /**
   * The list of registrations.
   */
  registrations: RegistrationDescription[];
  /**
   * A continuation token to get more results.
   */
  continuationToken?: string;
}
