// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ClusterManagerPatchParameters,
  ClusterManagerUpdateRelayPrivateEndpointConnectionParameters,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClusterManagersUpdateRelayPrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request body. */
  clusterManagerUpdateRelayPrivateEndpointConnectionParameters?: ClusterManagerUpdateRelayPrivateEndpointConnectionParameters;
}

/** Optional parameters. */
export interface ClusterManagersListBySubscriptionOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
  /** The opaque token that the server returns to indicate where to continue listing resources from. This is used for paging through large result sets. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ClusterManagersListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
  /** The opaque token that the server returns to indicate where to continue listing resources from. This is used for paging through large result sets. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ClusterManagersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ClusterManagersUpdateOptionalParams extends OperationOptions {
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
  /** The request body. */
  clusterManagerUpdateParameters?: ClusterManagerPatchParameters;
}

/** Optional parameters. */
export interface ClusterManagersCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ClusterManagersGetOptionalParams extends OperationOptions {}
