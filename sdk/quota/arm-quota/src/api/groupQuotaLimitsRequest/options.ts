// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GroupQuotaLimitList } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GroupQuotaLimitsRequestGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GroupQuotaLimitsRequestUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The GroupQuotaRequest body details for specific resourceProvider/location/resources. */
  groupQuotaRequest?: GroupQuotaLimitList;
}

/** Optional parameters. */
export interface GroupQuotaLimitsRequestListOptionalParams extends OperationOptions {}
