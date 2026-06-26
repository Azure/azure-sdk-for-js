// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GrainParameter } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BenefitUtilizationSummariesListBySavingsPlanIdOptionalParams extends OperationOptions {
  /** Supports filtering by properties/usageDate. */
  filter?: string;
  /** Grain. */
  grainParameter?: GrainParameter;
}

/** Optional parameters. */
export interface BenefitUtilizationSummariesListBySavingsPlanOrderOptionalParams extends OperationOptions {
  /** Supports filtering by properties/usageDate. */
  filter?: string;
  /** Grain. */
  grainParameter?: GrainParameter;
}

/** Optional parameters. */
export interface BenefitUtilizationSummariesListByBillingProfileIdOptionalParams extends OperationOptions {
  /** Grain. */
  grainParameter?: GrainParameter;
  /** Supports filtering by properties/benefitId, properties/benefitOrderId and properties/usageDate. */
  filter?: string;
}

/** Optional parameters. */
export interface BenefitUtilizationSummariesListByBillingAccountIdOptionalParams extends OperationOptions {
  /** Grain. */
  grainParameter?: GrainParameter;
  /** Supports filtering by properties/benefitId, properties/benefitOrderId and properties/usageDate. */
  filter?: string;
}
