// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AssessmentsListOptionalParams extends OperationOptions {
  /** Limit the result to the specified number of rows. */
  top?: string;
  /** The page-continuation token to use with a paged version of this API. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface AssessmentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsPutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AssessmentsGetOptionalParams extends OperationOptions {}
