// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AiGatewaysListByResourceGroupOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Filter the result list using the given expression. */
  filter?: string;
  /** Select the specified fields to be included in the response. */
  select?: string[];
  /** Expand the indicated resources into the response. */
  expand?: string[];
  /** Expressions that specify the order of returned results. */
  orderby?: string[];
}

/** Optional parameters. */
export interface AiGatewaysListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewaysDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewaysPatchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewaysCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AiGatewaysGetOptionalParams extends OperationOptions {}
