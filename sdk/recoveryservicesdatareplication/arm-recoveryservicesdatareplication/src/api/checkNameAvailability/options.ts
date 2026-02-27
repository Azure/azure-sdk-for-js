// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CheckNameAvailabilityModel } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CheckNameAvailabilityPostOptionalParams extends OperationOptions {
  /** Resource details. */
  body?: CheckNameAvailabilityModel;
}
