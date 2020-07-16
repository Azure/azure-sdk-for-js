// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  GeneratedClientOptionalParams as TableServiceClientOptions,
  ServiceGetStatisticsOptionalParams,
  ServiceGetStatisticsResponse,
  ServiceGetPropertiesOptionalParams,
  ServiceGetPropertiesResponse,
  TableServiceProperties,
  ServiceSetPropertiesOptionalParams,
  ServiceSetPropertiesResponse,
  TableCreateOptionalParams,
  TableCreateResponse,
  TableDeleteOptionalParams as DeleteTableOptions,
  TableDeleteResponse,
  TableQueryOptionalParams,
  QueryOptions,
  TableQueryOperationResponse,
  TableQueryEntitiesOptionalParams,
  TableQueryEntitiesResponse,
  TableQueryEntitiesWithPartitionAndRowKeyOptionalParams,
  TableQueryEntitiesWithPartitionAndRowKeyResponse,
  TableDeleteEntityOptionalParams,
  TableInsertEntityOptionalParams,
  TableInsertEntityResponse,
  TableMergeEntityOptionalParams,
  TableUpdateEntityResponse,
  TableDeleteEntityResponse,
  TableUpdateEntityOptionalParams,
  TableMergeEntityResponse,
  TableGetAccessPolicyOptionalParams,
  TableGetAccessPolicyResponse,
  TableSetAccessPolicyOptionalParams,
  SignedIdentifier,
  TableSetAccessPolicyResponse
} from "./generated/models";

export interface Entity {
  PartitionKey: string;
  RowKey: string;
  [propertyName: string]: any;
}
