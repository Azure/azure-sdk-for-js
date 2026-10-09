// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReplicaType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DatabasesListByElasticPoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasesListInaccessibleByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasesUpgradeDataWarehouseOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesResumeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesPauseOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesRenameOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DatabasesImportOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesFailoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The type of replica to be failed over. */
  replicaType?: ReplicaType;
}

/** Optional parameters. */
export interface DatabasesExportOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesListByServerOptionalParams extends OperationOptions {
  /** The number of elements to return from the collection. */
  top?: number;
  /** The number of elements in the collection to skip. */
  skip?: number;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
  /** How the results should be ordered. */
  orderby?: string;
}

/** Optional parameters. */
export interface DatabasesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DatabasesGetOptionalParams extends OperationOptions {
  /** The child resources to include in the response. */
  expand?: string;
  /** An OData filter expression that filters elements in the collection. */
  filter?: string;
}
