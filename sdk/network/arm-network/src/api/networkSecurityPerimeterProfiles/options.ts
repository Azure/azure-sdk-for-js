// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkSecurityPerimeterProfilesListOptionalParams extends OperationOptions {
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NetworkSecurityPerimeterProfilesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkSecurityPerimeterProfilesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkSecurityPerimeterProfilesGetOptionalParams extends OperationOptions {}
