// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeleteQueueOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListQueuesOptionalParams extends OperationOptions {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetQueueOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpsertQueueOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface DeleteExceptionPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListExceptionPoliciesOptionalParams extends OperationOptions {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetExceptionPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpsertExceptionPolicyOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface DeleteClassificationPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListClassificationPoliciesOptionalParams extends OperationOptions {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetClassificationPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpsertClassificationPolicyOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface DeleteDistributionPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListDistributionPoliciesOptionalParams extends OperationOptions {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetDistributionPolicyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpsertDistributionPolicyOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
}
