// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CapabilityGroup } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CapabilitiesListByLocationOptionalParams extends OperationOptions {
  /** If specified, restricts the response to only include the selected item. */
  include?: CapabilityGroup;
}
