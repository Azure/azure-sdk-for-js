// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ComponentContainersListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
}

/** Optional parameters. */
export interface ComponentContainersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComponentContainersCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComponentContainersGetOptionalParams extends OperationOptions {}
