// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistryModelVersionsCreateOrGetStartPendingUploadOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RegistryModelVersionsListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Ordering of list. */
  orderBy?: string;
  /** Maximum number of records to return. */
  top?: number;
  /** Version identifier. */
  version?: string;
  /** Model description. */
  description?: string;
  /** Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2 */
  tags?: string;
  /** Comma-separated list of property names (and optionally values). Example: prop1,prop2=value2 */
  properties?: string;
  /** View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
}

/** Optional parameters. */
export interface RegistryModelVersionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryModelVersionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryModelVersionsGetOptionalParams extends OperationOptions {}
