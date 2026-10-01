// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DscNodeConfigurationListByAutomationAccountOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  /** The number of rows to skip. */
  skip?: number;
  /** The number of rows to take. */
  top?: number;
  /** Return total rows. */
  inlinecount?: string;
}
