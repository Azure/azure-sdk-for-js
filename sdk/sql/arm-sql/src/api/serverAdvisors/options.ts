// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServerAdvisorsListByServerOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
}

/** Optional parameters. */
export interface ServerAdvisorsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServerAdvisorsGetOptionalParams extends OperationOptions {}
