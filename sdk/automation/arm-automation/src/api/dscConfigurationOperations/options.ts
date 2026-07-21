// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DscConfigurationUpdateParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DscConfigurationOperationsGetContentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscConfigurationOperationsListByAutomationAccountOptionalParams extends OperationOptions {
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
export interface DscConfigurationOperationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscConfigurationOperationsUpdateOptionalParams extends OperationOptions {
  /** The create or update parameters for configuration. */
  parameters?: DscConfigurationUpdateParameters;
}

/** Optional parameters. */
export interface DscConfigurationOperationsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscConfigurationOperationsGetOptionalParams extends OperationOptions {}
