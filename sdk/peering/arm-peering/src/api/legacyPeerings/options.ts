// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DirectPeeringType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LegacyPeeringsListOptionalParams extends OperationOptions {
  /** The ASN number associated with a legacy peering. */
  asn?: number;
  /** The direct peering type. */
  directPeeringType?: DirectPeeringType;
}
