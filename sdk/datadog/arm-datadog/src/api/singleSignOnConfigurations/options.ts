// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DatadogSingleSignOnResource } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SingleSignOnConfigurationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SingleSignOnConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  body?: DatadogSingleSignOnResource;
}

/** Optional parameters. */
export interface SingleSignOnConfigurationsGetOptionalParams extends OperationOptions {}
