// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EnvironmentVersionsPublishOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface EnvironmentVersionsListOptionalParams extends OperationOptions {
  /** Ordering of list. */
  orderBy?: string;
  /** Maximum number of records to return. */
  top?: number;
  /** Continuation token for pagination. */
  skip?: string;
  /** View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
}

/** Optional parameters. */
export interface EnvironmentVersionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentVersionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EnvironmentVersionsGetOptionalParams extends OperationOptions {}
