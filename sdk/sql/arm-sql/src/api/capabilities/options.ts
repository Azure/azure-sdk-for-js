// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CapabilityGroup } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CapabilitiesListByLocationOptionalParams extends OperationOptions {
  /** If specified, restricts the response to only include the selected item. */
  include?: CapabilityGroup;
}
