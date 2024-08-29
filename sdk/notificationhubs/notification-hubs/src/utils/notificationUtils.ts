// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Notification } from "../models/notification.js";

/**
 * @internal
 */
export function createMultipartDirectNotification(
  boundaryName: string,
  notification: Notification,
  deviceHandles: string[],
): string {
  return (
    `--${boundaryName}\r\n` +
    `Content-type: ${notification.contentType}\r\n` +
    "Content-Disposition: inline; name=notification\r\n\r\n" +
    notification.body +
    "\r\n" +
    `--${boundaryName}\r\n` +
    "Content-type: application/json\r\n" +
    "Content-Disposition: inline; name=devices\r\n\r\n" +
    JSON.stringify(deviceHandles) +
    "\r\n" +
    `--${boundaryName}--`
  );
}
