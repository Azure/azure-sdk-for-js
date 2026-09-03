// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FileServicesListServiceUsagesOptionalParams extends OperationOptions {
  /** Optional, specifies the maximum number of file service usages to be included in the list response. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface FileServicesGetServiceUsageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileServicesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileServicesSetServicePropertiesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileServicesGetServicePropertiesOptionalParams extends OperationOptions {}
