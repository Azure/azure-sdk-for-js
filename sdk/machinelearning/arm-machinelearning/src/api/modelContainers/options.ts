// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ModelContainersListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** Maximum number of results to return. */
  count?: number;
  /** View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
}

/** Optional parameters. */
export interface ModelContainersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ModelContainersCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ModelContainersGetOptionalParams extends OperationOptions {}
