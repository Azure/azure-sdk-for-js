export interface PartitionKeyDefinition {
  paths: string[];
  version?: number;
  systemKey?: boolean;
}
