import { PartitionKeyDefinition } from "../../documents";

export type PartitionKeyInput = string | string[] | PartitionKeyDefinition;

export function isSubpartitioned(
  partitionKeyInput: PartitionKeyInput
): partitionKeyInput is string[] {
  return Array.isArray(partitionKeyInput);
}
