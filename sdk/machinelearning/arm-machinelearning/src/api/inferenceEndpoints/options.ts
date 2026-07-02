// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OrderString } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InferenceEndpointsListOptionalParams extends OperationOptions {
  /** Number of InferenceEndpoint to be retrieved in a page of results. */
  count?: number;
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
export interface InferenceEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InferenceEndpointsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InferenceEndpointsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InferenceEndpointsGetOptionalParams extends OperationOptions {}
