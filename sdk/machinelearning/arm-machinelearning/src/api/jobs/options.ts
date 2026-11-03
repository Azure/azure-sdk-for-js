// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Type of job to be returned. */
  jobType?: string;
  /** Jobs returned will have this tag key. */
  tag?: string;
  /** View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
  /** Comma-separated list of user property names (and optionally values). Example: prop1,prop2=value2 */
  properties?: string;
}

/** Optional parameters. */
export interface JobsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface JobsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface JobsGetOptionalParams extends OperationOptions {}
