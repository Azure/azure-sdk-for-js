// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OrderString } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InferenceGroupsListSkusOptionalParams extends OperationOptions {
  /** Number of Skus to be retrieved in a page of results. */
  count?: number;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface InferenceGroupsGetStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InferenceGroupsModifyDeltaModelsAsyncOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InferenceGroupsListDeltaModelsAsyncOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InferenceGroupsGetDeltaModelsStatusAsyncOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface InferenceGroupsListOptionalParams extends OperationOptions {
  /** Number of InferenceGroup to be retrieved in a page of results. */
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
export interface InferenceGroupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InferenceGroupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InferenceGroupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface InferenceGroupsGetOptionalParams extends OperationOptions {}
