// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobScheduleListByAutomationAccountOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
}

/** Optional parameters. */
export interface JobScheduleDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobScheduleCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobScheduleGetOptionalParams extends OperationOptions {}
