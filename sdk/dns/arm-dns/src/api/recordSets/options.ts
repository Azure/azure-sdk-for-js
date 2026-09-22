// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecordSetsListAllByDnsZoneOptionalParams extends OperationOptions {
  /** The maximum number of record sets to return. If not specified, returns up to 100 record sets. */
  top?: number;
  /** The suffix label of the record set name that has to be used to filter the record set enumerations. If this parameter is specified, Enumeration will return only records that end with .<recordSetNameSuffix> */
  recordSetNameSuffix?: string;
}

/** Optional parameters. */
export interface RecordSetsListByDnsZoneOptionalParams extends OperationOptions {
  /** The maximum number of record sets to return. If not specified, returns up to 100 record sets. */
  top?: number;
  /** The suffix label of the record set name that has to be used to filter the record set enumerations. If this parameter is specified, Enumeration will return only records that end with .<recordSetNameSuffix> */
  recordsetnamesuffix?: string;
}

/** Optional parameters. */
export interface RecordSetsListByTypeOptionalParams extends OperationOptions {
  /** The maximum number of record sets to return. If not specified, returns up to 100 record sets. */
  top?: number;
  /** The suffix label of the record set name that has to be used to filter the record set enumerations. If this parameter is specified, Enumeration will return only records that end with .<recordSetNameSuffix> */
  recordsetnamesuffix?: string;
}

/** Optional parameters. */
export interface RecordSetsDeleteOptionalParams extends OperationOptions {
  /** The etag of the record set. Omit this value to always delete the current record set. Specify the last-seen etag value to prevent accidentally deleting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface RecordSetsUpdateOptionalParams extends OperationOptions {
  /** The etag of the record set. Omit this value to always overwrite the current record set. Specify the last-seen etag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface RecordSetsCreateOrUpdateOptionalParams extends OperationOptions {
  /** The etag of the record set. Omit this value to always overwrite the current record set. Specify the last-seen etag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing record set. Other values will be ignored. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface RecordSetsGetOptionalParams extends OperationOptions {}
