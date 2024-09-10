// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DirectSendNotificationOptions, SendNotificationOptions } from "../models/options.js";
import { objectHasProperty } from "@azure/core-util";

/**
 * Determines whether the options are of type SendNotificationOptions.
 * @param options - The options to test if SendNotificationOptions.
 * @returns true if SendNotificationOptions otherwise false.
 */
export function isSendNotificationOptions(options: unknown): options is SendNotificationOptions {
  return (
    objectHasProperty(options, "tagExpression") || objectHasProperty(options, "enableTestSend")
  );
}

/**
 * Determines whether the options are of type DirectSendNotificationOptions.
 * @param options - The options to test if DirectSendNotificationOptions.
 * @returns true if DirectSendNotificationOptions otherwise false.
 */
export function isDirectSendNotificationOptions(
  options: unknown,
): options is DirectSendNotificationOptions {
  return objectHasProperty(options, "deviceHandle");
}
