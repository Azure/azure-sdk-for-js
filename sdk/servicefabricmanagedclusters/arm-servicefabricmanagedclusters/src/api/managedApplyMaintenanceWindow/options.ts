// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplyMaintenanceWindowRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ManagedApplyMaintenanceWindowPostOptionalParams extends OperationOptions {
  /** The content of the action request */
  body?: ApplyMaintenanceWindowRequest;
}
