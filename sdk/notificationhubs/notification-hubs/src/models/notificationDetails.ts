// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents the notification outcome states.
 */
export type NotificationOutcomeState =
  | "Enqueued"
  | "DetailedStateAvailable"
  | "Processing"
  | "Completed"
  | "Abandoned"
  | "Unknown"
  | "NoTargetFound"
  | "Cancelled";

/**
 * The per platform count per state.
 */
export interface NotificationOutcomeCollectionItem {
  /**
   * The state of the notification.
   */
  state: string;

  /**
   * The count of notifications per state.
   */
  count: number;
}

/**
 * Represents Notification details.
 */
export interface NotificationDetails {
  /**
   * The unique notification identifier.
   */
  notificationId?: string;

  /**
   * The notification location.
   */
  location?: string;

  /**
   * The notification state.
   */
  state?: NotificationOutcomeState;

  /**
   * The enqueue time of the notification.
   */
  enqueueTime?: Date;

  /**
   * The notification send start time.
   */
  startTime?: Date;

  /**
   * The notification send end time.
   */
  endTime?: Date;

  /**
   * The notification body.
   */
  notificationBody?: string;

  /**
   * The notification tags.
   */
  tags?: string;

  /**
   * The notification platforms targeted.
   */
  targetPlatforms?: string;

  /**
   * The URL for the platform notification services errors.
   */
  pnsErrorDetailsUrl?: string;

  /**
   * APNs outcomes counts per state.
   */
  apnsOutcomeCounts?: NotificationOutcomeCollectionItem[];

  /**
   * WNS outcomes counts per state.
   */
  wnsOutcomeCounts?: NotificationOutcomeCollectionItem[];

  /**
   * FCM outcome counts per state.
   */
  fcmOutcomeCounts?: NotificationOutcomeCollectionItem[];

  /**
   * ADM outcome counts per state.
   */
  admOutcomeCounts?: NotificationOutcomeCollectionItem[];

  /**
   * Baidu outcome counts per state.
   */
  baiduOutcomeCounts?: NotificationOutcomeCollectionItem[];

  /**
   * Web Push outcome counts per state.
   */
  browserOutcomeCounts?: NotificationOutcomeCollectionItem[];
}
