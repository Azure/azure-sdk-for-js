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
}
