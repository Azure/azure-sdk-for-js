// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FeaturestoreEntityVersionsListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  tags?: string;
  /** [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
  /** page size */
  pageSize?: number;
  /** name for the featurestore entity version */
  versionName?: string;
  /** featurestore entity version */
  version?: string;
  /** description for the feature entity version */
  description?: string;
  /** createdBy user name */
  createdBy?: string;
  /** Specifies the featurestore stage */
  stage?: string;
}

/** Optional parameters. */
export interface FeaturestoreEntityVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FeaturestoreEntityVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FeaturestoreEntityVersionsGetOptionalParams extends OperationOptions {}
