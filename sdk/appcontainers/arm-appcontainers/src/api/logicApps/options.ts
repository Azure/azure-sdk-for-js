// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogicApp } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LogicAppsListWorkflowsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsGetWorkflowOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsListWorkflowsConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Resource create parameters. */
  resource?: LogicApp;
}

/** Optional parameters. */
export interface LogicAppsGetOptionalParams extends OperationOptions {}
