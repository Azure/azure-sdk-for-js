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
 * Describes a response from the Notification Hubs service for send operations.
 */
export interface NotificationHubsMessageResponse extends NotificationHubsResponse {
  /**
   * The notification ID from the operation.  Note this is only available in Standard SKU and above.
   */
  notificationId?: string;
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
