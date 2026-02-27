// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentPreflightModel } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentPreflightPostOptionalParams extends OperationOptions {
  /** Deployment preflight model. */
  body?: DeploymentPreflightModel;
}
