// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ContainerDefinition } from "./ContainerDefinition";
import { PartitionKeyDefinition } from '../../documents';

export interface ContainerRequest extends Omit<ContainerDefinition, 'partitionKey'> {
  /** Throughput for this container. */
  throughput?: number;
  partitionKey?: string | PartitionKeyDefinition;
}
