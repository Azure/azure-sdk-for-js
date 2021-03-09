import { SasTokenPartitionKeyValueRange } from "./SasTokenPartitionKeyValueRange";

export interface SasTokenPartitionKeyValueRangeInterface extends SasTokenPartitionKeyValueRange {
  create(partitionKeyValue: string): SasTokenPartitionKeyValueRange;

  getPartitionKey(): string;

  encode(): string;
}
