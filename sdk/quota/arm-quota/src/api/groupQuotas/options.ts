// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GroupQuotasEntity, GroupQuotasEntityPatch } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GroupQuotasListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GroupQuotasDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GroupQuotasUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The  GroupQuotas Patch Request. */
  groupQuotasPatchRequestBody?: GroupQuotasEntityPatch;
}

/** Optional parameters. */
export interface GroupQuotasCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The GroupQuota body details for creation or update of a GroupQuota entity. */
  groupQuotaPutRequestBody?: GroupQuotasEntity;
}

/** Optional parameters. */
export interface GroupQuotasGetOptionalParams extends OperationOptions {}
