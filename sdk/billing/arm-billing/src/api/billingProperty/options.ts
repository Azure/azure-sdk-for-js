// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BillingPropertyUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BillingPropertyGetOptionalParams extends OperationOptions {
  /** A flag that specifies whether or not to include billing country. */
  includeBillingCountry?: boolean;
  /** A flag that specifies whether or not to include transition status for billing accounts with agreement type Microsoft Customer Agreement. */
  includeTransitionStatus?: boolean;
}
