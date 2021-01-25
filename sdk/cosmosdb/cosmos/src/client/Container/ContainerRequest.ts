// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ContainerDefinition } from "./ContainerDefinition";
import { VerboseOmit } from "../../utils/types";
import { PartitionKeyInput } from "./PartitionKeyInput";

export interface ContainerRequest extends VerboseOmit<ContainerDefinition, "partitionKey"> {
  /* Throughput for this container. Cannot use with maxThroughput */
  throughput?: number;
  /* Max throughput for this container. Specify to use Autoscale*/
  maxThroughput?: number;
  /* Autoscale scaling defined by throughput increment percent */
  autoUpgradePolicy?: {
    throughputPolicy: {
      incrementPercent: number;
    };
  };
  partitionKey?: PartitionKeyInput;
}
