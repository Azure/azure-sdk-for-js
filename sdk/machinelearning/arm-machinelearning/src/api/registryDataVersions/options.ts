// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistryDataVersionsCreateOrGetStartPendingUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistryDataVersionsListOptionalParams extends OperationOptions {
  /** Please choose OrderBy value from ['createdtime', 'modifiedtime'] */
  orderBy?: string;
  /**
   * Top count of results, top count cannot be greater than the page size.
   * If topCount > page size, results with be default page size count will be returned
   */
  top?: number;
  /** Continuation token for pagination. */
  skip?: string;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  tags?: string;
  /** [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
}

/** Optional parameters. */
export interface RegistryDataVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryDataVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryDataVersionsGetOptionalParams extends OperationOptions {}
