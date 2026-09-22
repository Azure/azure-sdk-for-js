// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface QueriesListSearchOptionalParams extends OperationOptions {
  /** Maximum items returned in page. */
  top?: number;
  /** Flag indicating whether or not to return the body of each applicable query. If false, only return the query information. */
  includeBody?: boolean;
  /** Base64 encoded token used to fetch the next page of items. Default is null. */
  skipToken?: string;
}

/** Optional parameters. */
export interface QueriesListOptionalParams extends OperationOptions {
  /** Maximum items returned in page. */
  top?: number;
  /** Flag indicating whether or not to return the body of each applicable query. If false, only return the query information. */
  includeBody?: boolean;
  /** Base64 encoded token used to fetch the next page of items. Default is null. */
  skipToken?: string;
}

/** Optional parameters. */
export interface QueriesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueriesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueriesPutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueriesGetOptionalParams extends OperationOptions {}
