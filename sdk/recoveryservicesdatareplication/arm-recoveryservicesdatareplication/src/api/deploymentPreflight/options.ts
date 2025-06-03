// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentPreflightModel } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeploymentPreflightPostOptionalParams
  extends OperationOptions {
  /** Deployment preflight model. */
  body?: DeploymentPreflightModel;
}
