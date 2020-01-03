// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ContainerDefinition } from "./ContainerDefinition";

export interface ContainerRequest extends ContainerDefinition {
  /** Throughput for this container. */
  throughput?: number;
}
