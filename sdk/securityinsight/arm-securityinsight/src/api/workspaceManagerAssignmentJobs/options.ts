// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceManagerAssignmentJobsListOptionalParams extends OperationOptions {
  /** Sorts the results. Optional. */
  orderby?: string;
  /** Returns only the first n results. Optional. */
  top?: number;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls. Optional. */
  skipToken?: string;
}

/** Optional parameters. */
export interface WorkspaceManagerAssignmentJobsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceManagerAssignmentJobsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceManagerAssignmentJobsCreateOptionalParams extends OperationOptions {}
