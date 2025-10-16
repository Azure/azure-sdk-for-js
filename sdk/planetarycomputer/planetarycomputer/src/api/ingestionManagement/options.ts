// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationStatus } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IngestionManagementListManagedIdentitiesOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementListSourcesOptionalParams
  extends OperationOptions {
  /** The number of items to return */
  top?: number;
  /** The number of items to skip */
  skip?: number;
}

/** Optional parameters. */
export interface IngestionManagementGetSourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementDeleteSourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementCreateOrReplaceSourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementCreateSourceOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementUpdateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementListsOptionalParams
  extends OperationOptions {
  /** The number of items to return */
  top?: number;
  /** The number of items to skip */
  skip?: number;
}

/** Optional parameters. */
export interface IngestionManagementGetOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IngestionManagementCreateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementListRunsOptionalParams
  extends OperationOptions {
  /** The number of items to return */
  top?: number;
  /** The number of items to skip */
  skip?: number;
}

/** Optional parameters. */
export interface IngestionManagementGetRunOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementCreateRunOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementListOperationsOptionalParams
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
export interface IngestionManagementGetOperationOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementCancelAllOperationsOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface IngestionManagementCancelOperationOptionalParams
  extends OperationOptions {}
