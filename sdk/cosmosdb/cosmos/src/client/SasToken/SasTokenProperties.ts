// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SasTokenPartitionKeyValueRange } from "./SasTokenPartitionKeyValueRange";
import { CosmosContainerChildResourceKind } from "../../common/constants";
import { CosmosKeyType } from "../../common/constants";

export interface SasTokenProperties {
  databaseName: string;
  containerName: string;
  resourceKind: CosmosContainerChildResourceKind;
  resourceName: string;
  user: string;
  userTag: string;
  expiryTime?: Date;
  startTime?: Date;
  partitionKeyValueRanges: Iterable<SasTokenPartitionKeyValueRange>;
  addPartitionKeyValue(partitionKeyValue: string): SasTokenProperties;
  create(user: string, databaseName: string, containerName: string): SasTokenProperties;
  sasTokenValueUsingHMAC(key: string, keyType?: CosmosKeyType): string;
  cosmosContainerChildResourceKind: CosmosContainerChildResourceKind;
  cosmosKeyType: CosmosKeyType;
}
