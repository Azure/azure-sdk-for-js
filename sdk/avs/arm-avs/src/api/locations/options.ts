// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Sku } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LocationsCheckQuotaAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LocationsCheckTrialAvailabilityOptionalParams extends OperationOptions {
  /** Optionally, check for a specific SKU */
  sku?: Sku;
}
