// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DocumentKeysOrIds,
  ListingSearchType,
} from "../../models/azure/search/documents/indexes/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResetSkillsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface CreateSkillsetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface ListSkillsetsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Selects which top-level properties to retrieve. Specified as a comma-separated list of JSON property names, or '*' for all properties. The default is all properties. */
  select?: string;
  /** A string used to narrow down the listing so that fewer results need to be paged through. If omitted or an empty string is passed, no narrowing is applied. */
  search?: string;
  /** The maximum number of items to return in a single page. The server enforces a maximum; if omitted, the server determines a suitable default. */
  pageSize?: number;
  /** Specifies how the search parameter is interpreted. Currently only 'prefix' is supported. */
  searchType?: ListingSearchType;
}

/** Optional parameters. */
export interface GetSkillsetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface DeleteSkillsetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface CreateOrUpdateSkillsetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** Ignores cache reset requirements. */
  skipIndexerResetRequirementForCache?: boolean;
  /** Disables cache reprocessing change detection. */
  disableCacheReprocessingChangeDetection?: boolean;
}

/** Optional parameters. */
export interface GetIndexerStatusOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface CreateIndexerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface ListIndexersOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Selects which top-level properties to retrieve. Specified as a comma-separated list of JSON property names, or '*' for all properties. The default is all properties. */
  select?: string;
  /** A string used to narrow down the listing so that fewer results need to be paged through. If omitted or an empty string is passed, no narrowing is applied. */
  search?: string;
  /** The maximum number of items to return in a single page. The server enforces a maximum; if omitted, the server determines a suitable default. */
  pageSize?: number;
  /** Specifies how the search parameter is interpreted. Currently only 'prefix' is supported. */
  searchType?: ListingSearchType;
}

/** Optional parameters. */
export interface GetIndexerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface DeleteIndexerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface CreateOrUpdateIndexerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** Ignores cache reset requirements. */
  skipIndexerResetRequirementForCache?: boolean;
  /** Disables cache reprocessing change detection. */
  disableCacheReprocessingChangeDetection?: boolean;
}

/** Optional parameters. */
export interface RunIndexerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface ResetDocumentsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** If false, keys or ids will be appended to existing ones. If true, only the keys or ids in this payload will be queued to be re-ingested. */
  overwrite?: boolean;
  /** The keys or ids of the documents to be re-ingested. If keys are provided, the document key field must be specified in the indexer configuration. If ids are provided, the document key field is ignored. */
  keysOrIds?: DocumentKeysOrIds;
}

/** Optional parameters. */
export interface ResyncOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface ResetIndexerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface CreateDataSourceConnectionOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface ListDataSourceConnectionsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Selects which top-level properties to retrieve. Specified as a comma-separated list of JSON property names, or '*' for all properties. The default is all properties. */
  select?: string;
  /** A string used to narrow down the listing so that fewer results need to be paged through. If omitted or an empty string is passed, no narrowing is applied. */
  search?: string;
  /** The maximum number of items to return in a single page. The server enforces a maximum; if omitted, the server determines a suitable default. */
  pageSize?: number;
  /** Specifies how the search parameter is interpreted. Currently only 'prefix' is supported. */
  searchType?: ListingSearchType;
}

/** Optional parameters. */
export interface GetDataSourceConnectionOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
}

/** Optional parameters. */
export interface DeleteDataSourceConnectionOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface CreateOrUpdateDataSourceConnectionOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The Accept header. */
  accept?: "application/json;odata.metadata=minimal";
  /** Defines the If-Match condition. The operation will be performed only if the ETag on the server matches this value. */
  ifMatch?: string;
  /** Defines the If-None-Match condition. The operation will be performed only if the ETag on the server does not match this value. */
  ifNoneMatch?: string;
  /** Ignores cache reset requirements. */
  skipIndexerResetRequirementForCache?: boolean;
}
