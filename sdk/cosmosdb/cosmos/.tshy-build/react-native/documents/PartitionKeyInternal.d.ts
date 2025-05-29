import type { NonePartitionKeyType, NullPartitionKeyType, PartitionKey, PrimitivePartitionKeyValue } from "./PartitionKey.js";
/**
 * @hidden
 * Internal Representation Of Partition Key. TODO: Make sure {@link ClientContext} working with only {@link PartitionKeyInternal}
 */
export type PartitionKeyInternal = PrimitivePartitionKeyValue[];
/**
 * @hidden
 * None PartitionKey Literal
 */
export declare const NonePartitionKeyLiteral: NonePartitionKeyType;
/**
 * @hidden
 * Null PartitionKey Literal
 */
export declare const NullPartitionKeyLiteral: NullPartitionKeyType;
/**
 * @hidden
 * Maps PartitionKey to InternalPartitionKey.
 * @param partitionKey - PartitonKey to be converted.
 * @returns PartitionKeyInternal
 */
export declare function convertToInternalPartitionKey(partitionKey: PartitionKey): PartitionKeyInternal;
//# sourceMappingURL=PartitionKeyInternal.d.ts.map