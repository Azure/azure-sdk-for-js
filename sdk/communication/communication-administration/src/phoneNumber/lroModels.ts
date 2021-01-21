// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";

export interface PhoneNumberPollerOptionsBase {
  pollInterval?: number;
  resumeFrom?: string;
}

export interface BeginSearchAvailablePhoneNumbersOptions
  extends PhoneNumberPollerOptionsBase,
    OperationOptions {}
