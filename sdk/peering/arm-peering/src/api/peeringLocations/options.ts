// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringLocationsDirectPeeringType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PeeringLocationsListOptionalParams extends OperationOptions {
  /** The type of direct peering. */
  directPeeringType?: PeeringLocationsDirectPeeringType;
}
