// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ModelVersionsPublishOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ModelVersionsListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Ordering of list. */
  orderBy?: string;
  /** Maximum number of records to return. */
  top?: number;
  /** Model version. */
  version?: string;
  /** Model description. */
  description?: string;
  /** Number of initial results to skip. */
  offset?: number;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  tags?: string;
  /** Comma-separated list of property names (and optionally values). Example: prop1,prop2=value2 */
  properties?: string;
  /** Name of the feed. */
  feed?: string;
  /** View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
}

/** Optional parameters. */
export interface ModelVersionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ModelVersionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ModelVersionsGetOptionalParams extends OperationOptions {}
