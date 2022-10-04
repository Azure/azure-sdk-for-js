// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Notification } from "../models/notification.js";

/**
 * @internal
 */
export function createMultipartDirectNotification(
  notification: Notification,
  deviceHandles: string[]
): string {
  return (
    "--nh-batch-multipart-boundary\r\n" +
    "Content-type: " +
    notification.contentType +
    "\r\n" +
    "Content-Disposition: inline; name=notification\r\n\r\n" +
    notification.body +
    "\r\n" +
    "--nh-batch-multipart-boundary\r\n" +
    "Content-type: application/json\r\n" +
    "Content-Disposition: inline; name=devices\r\n\r\n" +
    JSON.stringify(deviceHandles) +
    "\r\n" +
    "--nh-batch-multipart-boundary--"
  );
}
