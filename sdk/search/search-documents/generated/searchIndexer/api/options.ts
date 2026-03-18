// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CreateSkillsetOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetSkillsetsOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Selects which top-level properties to retrieve. Specified as a comma-separated list of JSON property names, or '*' for all properties. The default is all properties. */
  select?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetSkillsetOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteSkillsetOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateOrUpdateSkillsetOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetIndexerStatusOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateIndexerOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetIndexersOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Selects which top-level properties to retrieve. Specified as a comma-separated list of JSON property names, or '*' for all properties. The default is all properties. */
  select?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetIndexerOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteIndexerOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateOrUpdateIndexerOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface RunIndexerOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ResetIndexerOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateDataSourceConnectionOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetDataSourceConnectionsOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Selects which top-level properties to retrieve. Specified as a comma-separated list of JSON property names, or '*' for all properties. The default is all properties. */
  select?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetDataSourceConnectionOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteDataSourceConnectionOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateOrUpdateDataSourceConnectionOptionalParams extends OperationOptions {
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
