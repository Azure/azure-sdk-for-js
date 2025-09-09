// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PgVersion } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OrganizationsGetPostgresVersionsOptionalParams extends OperationOptions {
  /** Post Action to retrieve the PostgreSQL versions. */
  parameters?: PgVersion;
}

/** Optional parameters. */
export interface OrganizationsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrganizationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OrganizationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OrganizationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OrganizationsGetOptionalParams extends OperationOptions {}
