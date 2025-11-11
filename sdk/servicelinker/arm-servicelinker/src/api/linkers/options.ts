// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfigurationInfo } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LinkersListDaprConfigurationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LinkersGenerateConfigurationsOptionalParams extends OperationOptions {
  /** Connection Info, including format, secret store, etc */
  parameters?: ConfigurationInfo;
}

/** Optional parameters. */
export interface LinkersListDryrunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LinkersDeleteDryrunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LinkersUpdateDryrunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LinkersCreateDryrunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface LinkersGetDryrunOptionalParams extends OperationOptions {}
