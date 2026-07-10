// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IpamPoolUpdate } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IpamPoolsListAssociatedResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpamPoolsGetPoolUsageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpamPoolsListOptionalParams extends OperationOptions {
  /** Optional skip token. */
  skipToken?: string;
  /** Optional num entries to skip. */
  skip?: number;
  /** Optional num entries to show. */
  top?: number;
  /** Optional key by which to sort. */
  sortKey?: string;
  /** Optional sort value for pagination. */
  sortValue?: string;
}

/** Optional parameters. */
export interface IpamPoolsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The entity state (ETag) version of the pool to update. This value can be omitted or set to "*" to apply the operation unconditionally. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface IpamPoolsUpdateOptionalParams extends OperationOptions {
  /** The entity state (ETag) version of the pool to update. This value can be omitted or set to "*" to apply the operation unconditionally. */
  ifMatch?: string;
  /** Pool resource object to update partially. */
  body?: IpamPoolUpdate;
}

/** Optional parameters. */
export interface IpamPoolsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The entity state (ETag) version of the pool to update. This value can be omitted or set to "*" to apply the operation unconditionally. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface IpamPoolsGetOptionalParams extends OperationOptions {}
