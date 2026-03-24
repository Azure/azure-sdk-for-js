// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EndpointComputeType, OrderString } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OnlineEndpointsGetTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OnlineEndpointsRegenerateKeysOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineEndpointsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OnlineEndpointsListOptionalParams extends OperationOptions {
  /** Name of the endpoint. */
  name?: string;
  /** Number of endpoints to be retrieved in a page of results. */
  count?: number;
  /** EndpointComputeType to be filtered by. */
  computeType?: EndpointComputeType;
  /** Continuation token for pagination. */
  skip?: string;
  /** A set of tags with which to filter the returned models. It is a comma separated string of tags key or tags key=value. Example: tagKey1,tagKey2,tagKey3=value3 . */
  tags?: string;
  /** A set of properties with which to filter the returned models. It is a comma separated string of properties key and/or properties key=value Example: propKey1,propKey2,propKey3=value3 . */
  properties?: string;
  /** The option to order the response. */
  orderBy?: OrderString;
}

/** Optional parameters. */
export interface OnlineEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineEndpointsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineEndpointsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineEndpointsGetOptionalParams extends OperationOptions {}
