// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SolutionTemplateVersionsBulkPublishSolutionOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionTemplateVersionsBulkDeploySolutionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionTemplateVersionsListBySolutionTemplateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface SolutionTemplateVersionsGetOptionalParams extends OperationOptions {}
