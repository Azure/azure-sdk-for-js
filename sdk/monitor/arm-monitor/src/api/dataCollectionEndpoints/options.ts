// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MicrosoftDataCollectionDataCollectionEndpointResource,
  MicrosoftDataCollectionResourceForUpdate,
} from "../../models/microsoft/dataCollection/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataCollectionEndpointsReconcileNSPOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataCollectionEndpointsListNSPOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionEndpointsGetNSPOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionEndpointsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionEndpointsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionEndpointsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataCollectionEndpointsUpdateOptionalParams extends OperationOptions {
  /** The payload */
  body?: MicrosoftDataCollectionResourceForUpdate;
}

/** Optional parameters. */
export interface DataCollectionEndpointsCreateOptionalParams extends OperationOptions {
  /** The payload */
  body?: MicrosoftDataCollectionDataCollectionEndpointResource;
}

/** Optional parameters. */
export interface DataCollectionEndpointsGetOptionalParams extends OperationOptions {}
