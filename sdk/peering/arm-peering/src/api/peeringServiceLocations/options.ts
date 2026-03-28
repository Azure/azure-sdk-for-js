// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PeeringServiceLocationsListOptionalParams extends OperationOptions {
  /** The country of interest, in which the locations are to be present. */
  country?: string;
}
