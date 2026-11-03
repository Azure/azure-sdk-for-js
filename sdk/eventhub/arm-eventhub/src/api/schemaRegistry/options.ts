// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SchemaRegistryListByNamespaceOptionalParams extends OperationOptions {
  /** Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls. */
  skip?: number;
  /** May be used to limit the number of results to the most recent N usageDetails. */
  top?: number;
}

/** Optional parameters. */
export interface SchemaRegistryDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaRegistryCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SchemaRegistryGetOptionalParams extends OperationOptions {}
