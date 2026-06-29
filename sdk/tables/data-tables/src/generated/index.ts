// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { TablesClient } from "./tablesClient.js";
export type {
  TableProperties,
  TablesError,
  TableResponse,
  TableEntityQueryResponse,
  SignedIdentifiers,
  SignedIdentifier,
  AccessPolicy,
  TableServiceError,
  TableServiceProperties,
  Logging,
  RetentionPolicy,
  Metrics,
  CorsRule,
  TableServiceStats,
  GeoReplication,
  GeoReplicationStatusType,
  OdataMetadataFormat,
  ResponseFormat,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type { TablesClientOptionalParams } from "./api/index.js";
export type {
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "./api/service/index.js";
export type {
  TableSetAccessPolicyOptionalParams,
  TableGetAccessPolicyOptionalParams,
  TableInsertEntityOptionalParams,
  TableDeleteEntityOptionalParams,
  TableMergeEntityOptionalParams,
  TableUpdateEntityOptionalParams,
  TableQueryEntityWithPartitionAndRowKeyOptionalParams,
  TableQueryEntitiesOptionalParams,
  TableDeleteOptionalParams,
  TableCreateOptionalParams,
  TableQueryOptionalParams,
} from "./api/table/index.js";
export type { ServiceOperations, TableOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
