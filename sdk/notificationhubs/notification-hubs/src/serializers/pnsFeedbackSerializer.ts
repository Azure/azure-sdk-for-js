// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents the Push Notification Services (PNS) feedback.
 */
export interface PnsFeedback {
  /**
   * The feedback time.
   */
  feedbackTime: Date;

  /**
   * The notification system error.
   */
  notificationSystemError: string;

  /**
   * The notification platform.
   */
  platform: string;

  /**
   * The Platform Notification Services unique handle. 
   */
  pnsHandle: string;

  /**
   * The unique registration ID.
   */
  registrationId?: string;

  /**
   * The unique installation ID for the device feedback.
   */
  installationId?: string;

  /**
   * The unique notification ID.
   */
  notificationId?: string;

  /**
   * The new PNS handle that is returned from the PNS.
   */
  newPnsHandle?: string;
}
