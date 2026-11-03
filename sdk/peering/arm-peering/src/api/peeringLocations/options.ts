// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringLocationsDirectPeeringType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PeeringLocationsListOptionalParams extends OperationOptions {
  /** The type of direct peering. */
  directPeeringType?: PeeringLocationsDirectPeeringType;
}
