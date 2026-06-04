// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DscConfigurationUpdateParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DscConfigurationGetContentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscConfigurationListByAutomationAccountOptionalParams extends OperationOptions {
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
export interface DscConfigurationDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscConfigurationUpdateOptionalParams extends OperationOptions {
  /** The create or update parameters for configuration. */
  parameters?: DscConfigurationUpdateParameters;
}

/** Optional parameters. */
export interface DscConfigurationCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscConfigurationGetOptionalParams extends OperationOptions {}
