// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NeuroShieldsListBySubscriptionOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
  /** The continuation token used to retrieve the next page. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NeuroShieldsListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
  /** The continuation token used to retrieve the next page. */
  skipToken?: string;
}

/** Optional parameters. */
export interface NeuroShieldsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeuroShieldsUpdateOptionalParams extends OperationOptions {
  /** The entity tag that makes the request conditional. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface NeuroShieldsCreateOrUpdateOptionalParams extends OperationOptions {
  /** The entity tag that makes the request conditional. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface NeuroShieldsGetOptionalParams extends OperationOptions {}
