// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GroupQuotasEnforcementStatus } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GroupQuotaLocationSettingsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The GroupQuota body details for creation or update of a GroupQuota entity. */
  locationSettings?: GroupQuotasEnforcementStatus;
}

/** Optional parameters. */
export interface GroupQuotaLocationSettingsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The GroupQuota body details for creation or update of a GroupQuota entity. */
  locationSettings?: GroupQuotasEnforcementStatus;
}

/** Optional parameters. */
export interface GroupQuotaLocationSettingsGetOptionalParams extends OperationOptions {}
