// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DirectPeeringType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LegacyPeeringsListOptionalParams extends OperationOptions {
  /** The ASN number associated with a legacy peering. */
  asn?: number;
  /** The direct peering type. */
  directPeeringType?: DirectPeeringType;
}
