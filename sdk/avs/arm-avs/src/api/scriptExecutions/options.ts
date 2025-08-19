// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ScriptOutputStreamType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ScriptExecutionsGetExecutionLogsOptionalParams extends OperationOptions {
  /** Name of the desired output stream to return. If not provided, will return all. An empty array will return nothing. */
  scriptOutputStreamType?: ScriptOutputStreamType[];
}

/** Optional parameters. */
export interface ScriptExecutionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScriptExecutionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ScriptExecutionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScriptExecutionsListOptionalParams extends OperationOptions {}
