import { PartitionKind } from ".";

export interface PartitionKeyDefinition {
  paths: string[];
  kind: PartitionKind;
}
