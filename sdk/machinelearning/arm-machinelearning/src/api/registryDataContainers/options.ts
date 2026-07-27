// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListViewType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RegistryDataContainersListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
  /** View type for including/excluding (for example) archived entities. */
  listViewType?: ListViewType;
}

/** Optional parameters. */
export interface RegistryDataContainersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryDataContainersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RegistryDataContainersGetOptionalParams extends OperationOptions {}
