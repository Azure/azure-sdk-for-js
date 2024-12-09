// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DatabaseDefinition } from "./DatabaseDefinition.js";

export interface DatabaseRequest extends DatabaseDefinition {
  /** Throughput for this database. */
  throughput?: number;
  maxThroughput?: number;
  autoUpgradePolicy?: {
    throughputPolicy: {
      incrementPercent: number;
    };
  };
}
