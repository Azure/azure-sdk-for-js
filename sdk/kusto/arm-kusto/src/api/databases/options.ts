// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CallerRole } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabasesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasesRemovePrincipalsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasesAddPrincipalsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasesListPrincipalsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasesListByClusterOptionalParams extends OperationOptions {
  /** limit the number of results */
  top?: number;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface DatabasesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** By default, any user who run operation on a database become an Admin on it. This property allows the caller to exclude the caller from Admins list. */
  callerRole?: CallerRole;
}

/** Optional parameters. */
export interface DatabasesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** By default, any user who run operation on a database become an Admin on it. This property allows the caller to exclude the caller from Admins list. */
  callerRole?: CallerRole;
}

/** Optional parameters. */
export interface DatabasesGetOptionalParams extends OperationOptions {}
