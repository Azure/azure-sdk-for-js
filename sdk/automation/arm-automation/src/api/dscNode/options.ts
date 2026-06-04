// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DscNodeListByAutomationAccountOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  /** The number of rows to skip. */
  skip?: number;
  /** The number of rows to take. */
  top?: number;
  /** Return total rows. */
  inlinecount?: string;
}

/** Optional parameters. */
export interface DscNodeDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscNodeUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscNodeGetOptionalParams extends OperationOptions {}
