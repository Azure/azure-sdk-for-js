// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApplicationPackage } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApplicationPackageActivateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationPackageListOptionalParams extends OperationOptions {
  /** The maximum number of items to return in the response. */
  maxresults?: number;
}

/** Optional parameters. */
export interface ApplicationPackageDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApplicationPackageCreateOptionalParams extends OperationOptions {
  /** The parameters for the request. */
  parameters?: ApplicationPackage;
}

/** Optional parameters. */
export interface ApplicationPackageGetOptionalParams extends OperationOptions {}
