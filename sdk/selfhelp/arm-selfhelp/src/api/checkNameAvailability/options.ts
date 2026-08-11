// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CheckNameAvailabilityRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CheckNameAvailabilityCheckAvailabilityOptionalParams extends OperationOptions {
  /** The required parameters for availability check. */
  checkNameAvailabilityRequest?: CheckNameAvailabilityRequest;
}
