// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  LeaseContainerRequest,
  ImmutabilityPolicy,
  ListContainersInclude,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BlobContainersExtendImmutabilityPolicyOptionalParams extends OperationOptions {
  /** The content of the action request */
  parameters?: ImmutabilityPolicy;
}

/** Optional parameters. */
export interface BlobContainersLockImmutabilityPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BlobContainersDeleteImmutabilityPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BlobContainersCreateOrUpdateImmutabilityPolicyOptionalParams extends OperationOptions {
  /** The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service. */
  ifMatch?: string;
  /** The ImmutabilityPolicy Properties that will be created or updated to a blob container. */
  parameters?: ImmutabilityPolicy;
}

/** Optional parameters. */
export interface BlobContainersGetImmutabilityPolicyOptionalParams extends OperationOptions {
  /** The entity state (ETag) version of the immutability policy to update must be returned to the server for all update operations. The ETag value must include the leading and trailing double quotes as returned by the service. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface BlobContainersListOptionalParams extends OperationOptions {
  /** Optional. Specified maximum number of containers that can be included in the list. */
  maxpagesize?: string;
  /** Optional. When specified, only container names starting with the filter will be listed. */
  filter?: string;
  /** Optional, used to include the properties for soft deleted blob containers. */
  include?: ListContainersInclude;
}

/** Optional parameters. */
export interface BlobContainersObjectLevelWormOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BlobContainersLeaseOptionalParams extends OperationOptions {
  /** The content of the action request */
  parameters?: LeaseContainerRequest;
}

/** Optional parameters. */
export interface BlobContainersClearLegalHoldOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BlobContainersSetLegalHoldOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BlobContainersDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BlobContainersUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BlobContainersCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BlobContainersGetOptionalParams extends OperationOptions {}
