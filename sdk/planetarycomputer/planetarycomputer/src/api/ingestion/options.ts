// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationStatus } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IngestionListManagedIdentitiesOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionListSourcesOptionalParams extends OperationOptions {
  /** The number of items to return */
  top?: number;
  /** The number of items to skip */
  skip?: number;
}

/** Optional parameters. */
export interface IngestionGetSourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionDeleteSourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionReplaceSourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionCreateSourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionListOptionalParams extends OperationOptions {
  /** The number of items to return */
  top?: number;
  /** The number of items to skip */
  skip?: number;
}

/** Optional parameters. */
export interface IngestionGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IngestionCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionListRunsOptionalParams extends OperationOptions {
  /** The number of items to return */
  top?: number;
  /** The number of items to skip */
  skip?: number;
}

/** Optional parameters. */
export interface IngestionGetRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionCreateRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionListOperationsOptionalParams
  extends OperationOptions {
  /** The number of items to return */
  top?: number;
  /** The number of items to skip */
  skip?: number;
  /** Operation id used to filter the results */
  collectionId?: string;
  /** Operation status used to filter the results */
  status?: OperationStatus;
}

/** Optional parameters. */
export interface IngestionGetOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IngestionCancelAllOperationsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionCancelOperationOptionalParams
  extends OperationOptions {}
