// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { UsageManagementClient } from "./usageManagementClient.js";
export type {
  UsageAggregation,
  UsageSample,
  ErrorObjectResponse,
  ErrorResponse,
  ResourceRateCardInfo,
  OfferTermInfo,
  OfferTermInfoUnion,
  OfferTermInfoName,
  MonetaryCredit,
  MonetaryCommitment,
  RecurringCharge,
  MeterInfo,
  AggregationGranularity,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type { UsageManagementClientOptionalParams } from "./api/index.js";
export type { RateCardGetOptionalParams } from "./api/rateCard/index.js";
export type { UsageAggregatesListOptionalParams } from "./api/usageAggregates/index.js";
export type { RateCardOperations, UsageAggregatesOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
