// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CapabilitiesListOptionalParams extends OperationOptions {
  /** String that sets the continuation token. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface CapabilitiesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapabilitiesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CapabilitiesGetOptionalParams extends OperationOptions {}
