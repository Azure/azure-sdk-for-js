// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReservationRecommendationDetailsGetOptionalParams extends OperationOptions {
  /** Used to filter reservation recommendation details by: properties/subscriptionId can be specified for billing account and billing profile paths. */
  filter?: string;
}
