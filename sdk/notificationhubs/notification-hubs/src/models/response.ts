// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RegistrationDescription } from "./registration";

/**
 * Describes a response from the Notification Hubs which includes a tracking ID, correlation ID and location.
 */
export interface NotificationHubResponse {
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
export interface NotificationHubMessageResponse extends NotificationHubResponse {
  /**
   * The notification ID from the operation.  Note this is only available in Standard SKU and above.
   */
  notificationId?: string;
}

export interface RegistrationQueryResponse {
  registrations: RegistrationDescription[],
  continuationToken?: string;
}
