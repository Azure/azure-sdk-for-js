// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiscoveryRulesListByHealthModelOptionalParams extends OperationOptions {
  /** Timestamp to use for the operation. When specified, the version of the resource at this point in time is retrieved. If not specified, the latest version is used. */
  timestamp?: Date;
}

/** Optional parameters. */
export interface DiscoveryRulesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiscoveryRulesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiscoveryRulesGetOptionalParams extends OperationOptions {}
