// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OdataMetadataFormat, ResponseFormat } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TableSetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
}

/** Optional parameters. */
export interface TableGetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
}

/** Optional parameters. */
export interface TableInsertEntityOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
  /** Specifies the metadata format for the response. */
  format?: OdataMetadataFormat;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * Specifies whether the response should include the inserted entity in the
   * payload. Possible values are return-no-content and return-content.
   */
  prefer?: ResponseFormat;
  /** The entity properties to insert. */
  tableEntityProperties?: Record<string, any>;
}

/** Optional parameters. */
export interface TableDeleteEntityOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
}

/** Optional parameters. */
export interface TableMergeEntityOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
  /**
   * Match condition for an entity to be deleted. If specified and a matching entity
   * is not found, an error will be raised. To force an unconditional delete, set to
   * the wildcard character (*).
   */
  ifMatch?: string;
  /** The properties for the table entity. */
  tableEntityProperties?: Record<string, any>;
}

/** Optional parameters. */
export interface TableUpdateEntityOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
  /**
   * Match condition for an entity to be deleted. If specified and a matching entity
   * is not found, an error will be raised. To force an unconditional delete, set to
   * the wildcard character (*).
   */
  ifMatch?: string;
  /** The properties for the table entity. */
  tableEntityProperties?: Record<string, any>;
}

/** Optional parameters. */
export interface TableQueryEntityWithPartitionAndRowKeyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
  /** Specifies the metadata format for the response. */
  format?: OdataMetadataFormat;
  /** Select expression using OData notation. Limits the columns on each record to just those requested. */
  select?: string;
  /** OData filter expression. */
  filter?: string;
}

/** Optional parameters. */
export interface TableQueryEntitiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the metadata format for the response. */
  format?: OdataMetadataFormat;
  /** Specifies the maximum number of records to return. */
  top?: number;
  /** Select expression using OData notation. Limits the columns on each record to just those requested. */
  select?: string;
  /** OData filter expression. */
  filter?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
  /** An entity partition key query continuation token from a previous call. */
  nextPartitionKey?: string;
  /** An entity row key query continuation token from a previous call. */
  nextRowKey?: string;
}

/** Optional parameters. */
export interface TableDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface TableCreateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the metadata format for the response. */
  format?: OdataMetadataFormat;
  /**
   * Specifies whether the response should include the created table in the
   * payload. Possible values are return-no-content and return-content.
   */
  prefer?: ResponseFormat;
}

/** Optional parameters. */
export interface TableQueryOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the metadata format for the response. */
  format?: OdataMetadataFormat;
  /** Specifies the maximum number of records to return. */
  top?: number;
  /** Select expression using OData notation. Limits the columns on each record to just those requested. */
  select?: string;
  /** OData filter expression. */
  filter?: string;
  /** A table query continuation token from a previous call. */
  nextTableName?: string;
}
