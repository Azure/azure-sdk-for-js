// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FeaturestoreEntityContainersListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  tags?: string;
  /** [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
  /** page size */
  pageSize?: number;
  /** name for the featurestore entity */
  name?: string;
  /** description for the featurestore entity */
  description?: string;
  /** createdBy user name */
  createdBy?: string;
}

/** Optional parameters. */
export interface FeaturestoreEntityContainersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FeaturestoreEntityContainersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FeaturestoreEntityContainersGetEntityOptionalParams extends OperationOptions {}
