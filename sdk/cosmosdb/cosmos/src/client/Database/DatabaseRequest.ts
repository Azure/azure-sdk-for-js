import { DatabaseDefinition } from "./DatabaseDefinition";

export interface DatabaseRequest extends DatabaseDefinition {
  /** Throughput for this database. */
  throughput?: number;
}
