// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignalDefinitionsListByHealthModelOptionalParams extends OperationOptions {
  /** Timestamp to use for the operation. When specified, the version of the resource at this point in time is retrieved. If not specified, the latest version is used. */
  timestamp?: Date;
}

/** Optional parameters. */
export interface SignalDefinitionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalDefinitionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalDefinitionsGetOptionalParams extends OperationOptions {}
