// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { UpgradableVersionsDescription } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClustersListUpgradableVersionsOptionalParams extends OperationOptions {
  /** The upgrade path description with target version. */
  versionsDescription?: UpgradableVersionsDescription;
}

/** Optional parameters. */
export interface ClustersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ClustersUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ClustersGetOptionalParams extends OperationOptions {}
