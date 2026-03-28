// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PipelineRunsCancelOptionalParams extends OperationOptions {
  /** If true, cancel all the Child pipelines that are triggered by the current pipeline. */
  isRecursive?: boolean;
}

/** Optional parameters. */
export interface PipelineRunsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PipelineRunsQueryByFactoryOptionalParams extends OperationOptions {}
