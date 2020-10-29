// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-http";
import { NotificationHubOperationResponse } from "./interfaces";
import * as Constants from "./util/constants";

export interface Notification {
  headers?: { [key: string]: string };
  body: string;
  contentType?: string;
}

export interface AdmNotification extends Notification {
  platform: "adm";
}

export interface AppleNotification extends Notification {
  expiry?: Date;
  priority?: number;
  platform: "apple";
}

export interface BaiduNotification extends Notification {
  platform: "baidu";
  messageType?: number;
}

export interface FcmLegacyNotification extends Notification {
  platform: "gcm";
}

export interface WindowsNotification extends Notification {
  platform: "windows";
}

export interface TemplateNotification extends Notification {
  platform: "template";
  templateProperties: { [key: string]: string };
}

export type NotificationLike =
  | AdmNotification
  | AppleNotification
  | BaiduNotification
  | FcmLegacyNotification
  | WindowsNotification
  | TemplateNotification;

export interface NotificationOptions extends OperationOptions {
  tags?: string[];
  tagExpression?: string;
}

export interface NotificationOutcome extends NotificationHubOperationResponse {
  state: NotificationOutcomeState;
  success: number;
  failure: number;
  notificationId?: string;
  trackingId: string;
  results?: RegistrationResult[];
}

export interface ScheduledNotification extends NotificationHubOperationResponse {
  scheduledNotificationId?: string;
  tags?: string;
  payload: NotificationLike;
  trackingId: string;
}

export enum NotificationOutcomeState {
  Enqueued = 0,
  DetailedStateAvailable = 1,
  Processing = 2,
  Completed = 3,
  Abandoned = 4,
  Unknown = 5,
  NoTargetFound = 6,
  Cancelled = 7
}

export interface RegistrationResult {
  applicationPlatform: string;
  pnsHandle: string;
  registrationId: string;
  outcome: string;
}

export function transformAdmNotification(notification: AdmNotification) {
  notification.contentType = Constants.ADM_CONTENT_TYPE;
}

export function transformAppleNotification(notification: AppleNotification) {
  notification.contentType = Constants.APPLE_CONTENT_TYPE;
  notification.headers![Constants.HEADER_NOTIFICATION_FORMAT] = notification.platform;

  if (notification.expiry && notification.expiry instanceof Date) {
    notification.headers![Constants.APPLE_EXPIRY_HEADER] = notification.expiry.toISOString();
  }

  if (notification.priority && Number.isSafeInteger(notification.priority)) {
    notification.headers![Constants.APPLE_PRIORITY_HEADER] = notification.priority.toString();
  }

  if (notification.headers![Constants.APPLE_APNS_EXPIRY_HEADER]) {
    const parsed = Number.parseInt(notification.headers![Constants.APPLE_APNS_EXPIRY_HEADER]);
    if (Number.isNaN(parsed)) {
      throw new Error("Header apns-expiration is invalid.");
    }
  }

  if (notification.headers![Constants.APPLE_APNS_PRIORITY_HEADER]) {
    const parsed = Number.parseInt(notification.headers![Constants.APPLE_APNS_PRIORITY_HEADER]);
    if (Number.isNaN(parsed)) {
      throw new Error("Header apns-priority is invalid.");
    }
  }
}

export function transformBaidiuNotificaiton(notification: BaiduNotification) {
  notification.contentType = Constants.BAIDU_CONTENT_TYPE;
  notification.headers![Constants.HEADER_NOTIFICATION_FORMAT] = notification.platform;

  if (notification.messageType && Number.isSafeInteger(notification.messageType)) {
    notification.headers![
      Constants.BAIDU_MESSAGE_TYPE_HEADER
    ] = notification.messageType.toString();
  }
}

export function transformFcmLegacyNotificaiton(notification: FcmLegacyNotification) {
  notification.contentType = Constants.FIREBASE_CONTENT_TYPE;
}

export function transformWindowsNotification(notification: WindowsNotification) {
  notification.headers![Constants.HEADER_NOTIFICATION_FORMAT] = notification.platform;

  if (notification.headers![Constants.WNS_TYPE_NAME] && 
    notification.headers![Constants.WNS_TYPE_NAME] === Constants.WNS_RAW) {
    notification.contentType = Constants.WNS_STREAM_CONTENT_TYPE;
  } else {
    if (notification.body.indexOf('<toast>') !== -1) {
      notification.contentType = Constants.WNS_CONTENT_TYPE;
      notification.headers![Constants.WNS_TYPE_NAME] = Constants.WNS_TOAST;
    } else if (notification.body.indexOf('<badge>') !== -1) {
      notification.contentType = Constants.WNS_CONTENT_TYPE;
      notification.headers![Constants.WNS_TYPE_NAME] = Constants.WNS_BADGE;
    } else if (notification.body.indexOf('<tile>') !== -1) {
      notification.contentType = Constants.WNS_CONTENT_TYPE;
      notification.headers![Constants.WNS_TYPE_NAME] = Constants.WNS_TILE;
    } else {
      throw new Error('Unsupported WNS message type');
    }
  }


}
