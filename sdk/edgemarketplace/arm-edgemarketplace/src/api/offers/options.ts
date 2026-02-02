// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OffersListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OffersGetAccessTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OffersGenerateAccessTokenOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OffersListOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Filter the result list using the given expression. */
  filter?: string;
  /** Skip over when retrieving results. */
  skipToken?: string;
}

/** Optional parameters. */
export interface OffersGetOptionalParams extends OperationOptions {}
