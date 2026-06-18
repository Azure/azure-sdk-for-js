// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentModel, ModelCapacityCalculatorWorkload } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CalculateModelCapacityOptionalParams extends OperationOptions {
  model?: DeploymentModel;
  skuName?: string;
  workloads?: ModelCapacityCalculatorWorkload[];
}

/** Optional parameters. */
export interface CheckDomainAvailabilityOptionalParams extends OperationOptions {
  kind?: string;
}

/** Optional parameters. */
export interface CheckSkuAvailabilityOptionalParams extends OperationOptions {}
