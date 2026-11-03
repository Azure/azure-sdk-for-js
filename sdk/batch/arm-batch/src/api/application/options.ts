// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Application } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationListOptionalParams extends OperationOptions {
  /** The maximum number of items to return in the response. */
  maxresults?: number;
}

/** Optional parameters. */
export interface ApplicationDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationCreateOptionalParams extends OperationOptions {
  /** The parameters for the request. */
  parameters?: Application;
}

/** Optional parameters. */
export interface ApplicationGetOptionalParams extends OperationOptions {}
