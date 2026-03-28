// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrefixesListByPeeringServiceOptionalParams extends OperationOptions {
  /** The properties to be expanded. */
  expand?: string;
}

/** Optional parameters. */
export interface PrefixesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrefixesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrefixesGetOptionalParams extends OperationOptions {
  /** The properties to be expanded. */
  expand?: string;
}
