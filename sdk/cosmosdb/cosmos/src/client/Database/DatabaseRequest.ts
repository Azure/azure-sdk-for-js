// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DatabaseDefinition } from "./DatabaseDefinition";

export interface DatabaseRequest extends DatabaseDefinition {
  /** Throughput for this database. */
  throughput?: number;
}
