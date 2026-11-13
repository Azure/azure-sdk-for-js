// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedComputeCapacitiesListOptionalParams extends OperationOptions {
  /** Optional accelerator type filter to narrow results to a specific accelerator type. */
  acceleratorType?: string;
  /**
   * Optional deployment resource ID. When provided, returns capacity for the specific region
   * where the deployment is hosted rather than the best available region.
   */
  deploymentId?: string;
  /**
   * Optional Azure location used to select a DataZone scope. Without a deployment ID,
   * omitted or blank location returns Global and both US and EU DataZone capacities.
   * A supported location returns Global and the matching DataZone capacities; an
   * unsupported location returns Global capacity only. With a deployment ID, a
   * nonblank location must match the parent account location, ignoring case and
   * surrounding whitespace, or the request returns HTTP 400. Capacity is still
   * returned for the deployment's backend region.
   */
  location?: string;
}
