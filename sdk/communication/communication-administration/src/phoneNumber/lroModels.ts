// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";

/**
 * Represents the optional parameters that can be passed to phone number pollers.
 */
export interface PhoneNumberPollerOptionsBase {
  /**
   * Time between each polling in milliseconds.
   */
  pollInterval?: number;

  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * Additional request options for requesting the release of a list of phone numbers.
 */
export interface BeginReleasePhoneNumberOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {}

/**
 * Additional request options for requesting the purchase of a phone number reservation.
 */
export interface BeginPurchasePhoneNumbersOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {}

export interface BeginSearchAvailablePhoneNumbersOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {}

export interface BeginUpdatePhoneNumberOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {}
