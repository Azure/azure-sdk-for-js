// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosContainerChildResourceKind } from "../../common/constants";
import type { CosmosKeyType } from "../../common/constants";

export class SasTokenProperties {
  user: string;
  userTag: string;
  databaseName: string;
  containerName: string;
  resourceName: string;
  resourcePath: string;
  resourceKind: CosmosContainerChildResourceKind;
  partitionKeyValueRanges: string[];
  startTime: Date;
  expiryTime: Date;
  keyType: CosmosKeyType | number;
  controlPlaneReaderScope: number;
  controlPlaneWriterScope: number;
  dataPlaneReaderScope: number;
  dataPlaneWriterScope: number;
  cosmosContainerChildResourceKind: CosmosContainerChildResourceKind;
  cosmosKeyType: CosmosKeyType;
}
