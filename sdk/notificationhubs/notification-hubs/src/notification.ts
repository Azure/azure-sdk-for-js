// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse, OperationOptions } from "@azure/core-http";
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

export type NativeNotification =
  | AdmNotification
  | AppleNotification
  | BaiduNotification
  | FcmLegacyNotification
  | WindowsNotification;

export interface NotificationOptions extends OperationOptions {
  tags?: string[];
  tagExpression?: string;
  deviceHandle?: string;
}

export interface NotificationOutcome {
  state: NotificationOutcomeState;
  success: number;
  failure: number;
  location?: string;
  trackingId: string;
  results?: RegistrationResult[];
  _response: HttpOperationResponse;
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
}
