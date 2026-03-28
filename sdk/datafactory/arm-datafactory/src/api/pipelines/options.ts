// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PipelinesCreateRunOptionalParams extends OperationOptions {
  /** The pipeline run identifier. If run ID is specified the parameters of the specified run will be used to create a new run. */
  referencePipelineRunId?: string;
  /** Recovery mode flag. If recovery mode is set to true, the specified referenced pipeline run and the new run will be grouped under the same groupId. */
  isRecovery?: boolean;
  /** In recovery mode, the rerun will start from this activity. If not specified, all activities will run. */
  startActivityName?: string;
  /** In recovery mode, if set to true, the rerun will start from failed activities. The property will be used only if startActivityName is not specified. */
  startFromFailure?: boolean;
  /** Parameters of the pipeline run. These parameters will be used only if the runId is not specified. */
  parameters?: Record<string, any>;
}

/** Optional parameters. */
export interface PipelinesListByFactoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PipelinesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PipelinesCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the pipeline entity.  Should only be specified for update, for which it should match existing entity or can be * for unconditional update. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PipelinesGetOptionalParams extends OperationOptions {
  /** ETag of the pipeline entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned. */
  ifNoneMatch?: string;
}
