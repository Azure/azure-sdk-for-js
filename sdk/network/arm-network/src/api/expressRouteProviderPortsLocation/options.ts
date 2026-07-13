// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRouteProviderPortsLocationListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, you can use $filter=location eq '{state}'. */
  filter?: string;
}
