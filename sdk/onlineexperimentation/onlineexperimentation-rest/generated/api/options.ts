// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ListMetricsOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteMetricOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
  /** The request should only proceed if the entity was modified after this time. */
  ifModifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ValidateMetricOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateOrUpdateMetricOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
  /** The request should only proceed if the entity was modified after this time. */
  ifModifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetMetricOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
  /** The request should only proceed if the entity was modified after this time. */
  ifModifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
