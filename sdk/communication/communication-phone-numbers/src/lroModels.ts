// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";

export interface PhoneNumberPollerOptionsBase {
  pollInterval?: number;
  resumeFrom?: string;
}

export interface BeginSearchAvailablePhoneNumbersOptions extends PhoneNumberPollerOptionsBase, OperationOptions {}

export interface BeginReleasePhoneNumberOptions extends PhoneNumberPollerOptionsBase, OperationOptions {}

export interface BeginPurchasePhoneNumbersOptions extends PhoneNumberPollerOptionsBase, OperationOptions {}

export interface BeginUpdatePhoneNumberOptions extends PhoneNumberPollerOptionsBase, OperationOptions {}
