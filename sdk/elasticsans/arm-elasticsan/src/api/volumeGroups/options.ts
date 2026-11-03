// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { XMsAccessSoftDeletedResources } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VolumeGroupsListByElasticSanOptionalParams extends OperationOptions {
  /** Optional, returns only soft deleted volume groups if set to true. If set to false or if not specified, returns only active volume groups. */
  xMsAccessSoftDeletedResources?: XMsAccessSoftDeletedResources;
}

/** Optional parameters. */
export interface VolumeGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeGroupsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VolumeGroupsGetOptionalParams extends OperationOptions {}
