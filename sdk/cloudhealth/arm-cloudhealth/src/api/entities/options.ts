// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EntitiesListByHealthModelOptionalParams extends OperationOptions {
  /** Timestamp to use for the operation. When specified, the version of the resource at this point in time is retrieved. If not specified, the latest version is used. */
  timestamp?: Date;
}

/** Optional parameters. */
export interface EntitiesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EntitiesGetOptionalParams extends OperationOptions {}
