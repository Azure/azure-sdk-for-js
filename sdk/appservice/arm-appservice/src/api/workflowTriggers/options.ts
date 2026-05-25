// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkflowTriggersGetSchemaJsonOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowTriggersRunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkflowTriggersListCallbackUrlOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkflowTriggersListOptionalParams extends OperationOptions {
  /** The number of items to be included in the result. */
  top?: number;
  /** The filter to apply on the operation. */
  filter?: string;
}

/** Optional parameters. */
export interface WorkflowTriggersGetOptionalParams extends OperationOptions {}
