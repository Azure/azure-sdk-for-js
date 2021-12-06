// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosContainerChildResourceKind } from "../../common/constants";
import { CosmosKeyType } from "../../common/constants";

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
