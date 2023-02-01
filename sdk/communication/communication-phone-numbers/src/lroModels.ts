// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

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
export interface BeginPurchasePhoneNumbersOptions extends OperationOptions {}

/**
 * Additional options for the update phone number capabilities operation.
 */
export interface BeginUpdatePhoneNumberCapabilitiesOptions extends OperationOptions {}
