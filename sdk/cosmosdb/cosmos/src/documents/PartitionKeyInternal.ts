import { NonePartitionKey, NullPartitionType, PartitionKey, PrimitivePartitionKeyValue } from "./PartitionKey";

/**
 * @hidden
 * Internal Representation Of Partition Key. TODO: Make sure {@link ClientContext} working with only {@link PartitionKeyInternal}
 */
 export type PartitionKeyInternal = PrimitivePartitionKeyValue[];
 /**
 * @hidden
 * None PartitionKey Literal
 */
 export const NonePartitionKeyLiteral: NonePartitionKey = {};
/**
 * @hidden
 * Null PartitionKey Literal
 */
 export const NullPartitionKeyLiteral: NullPartitionType = null;
/**
 * @hidden
 * Maps PartitionKey to InternalPartitionKey.
 * @param partitionKey 
 * @returns 
 */
export function mapPartitionToInternal(partitionKey: PartitionKey): PartitionKeyInternal {
  if (Array.isArray(partitionKey)) return partitionKey;
  else return [partitionKey];
}