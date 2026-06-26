// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CreateAndAssociatePLFilterCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Name of the traffic filter */
  name?: string;
  /** Guid of the private endpoint */
  privateEndpointGuid?: string;
  /** Name of the private endpoint */
  privateEndpointName?: string;
}
