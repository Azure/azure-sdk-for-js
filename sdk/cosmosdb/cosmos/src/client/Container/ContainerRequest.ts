// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ContainerDefinition } from "./ContainerDefinition";
import { PartitionKeyDefinition } from "../../documents";
import { VerboseOmit } from "../../utils/types";

export interface ContainerRequest extends VerboseOmit<ContainerDefinition, "partitionKey"> {
  /* Throughput for this container. */
  throughput?: number;
  partitionKey?: string | PartitionKeyDefinition;
}
