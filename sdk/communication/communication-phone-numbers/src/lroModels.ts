// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";

/**
 * Additional options for the search available phone numbers operation.
 */
export interface BeginSearchAvailablePhoneNumbersOptions extends OperationOptions {}

/**
 * Additional options for the release phone number operation.
 */
export interface BeginReleasePhoneNumberOptions extends OperationOptions {}

/**
 * Additional options for the purchase phone number operation.
 */
export interface BeginPurchasePhoneNumbersOptions extends OperationOptions {
  /** The agreement to not resell the phone numbers. Defaults to false if not provided. */
  agreeToNotResell?: boolean;
}

/**
 * Additional options for the update phone number capabilities operation.
 */
export interface BeginUpdatePhoneNumberCapabilitiesOptions extends OperationOptions {}

/**
 * Additional options that can be passed to the begin purchase reservation request.
 */
export interface BeginReservationPurchaseOptions extends OperationOptions {
  /** The agreement to not resell the phone numbers. Defaults to false if not provided. */
  agreeToNotResell?: boolean;
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A serialized poller which can be used to resume an existing paused Long-Running-Operation. */
  resumeFrom?: string;
}
