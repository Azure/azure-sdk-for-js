/**
 * PartitionKey of a container.
 * @remarks
 * - PartitionKeyDefinition is no longer part of PartitionKey. So please use PartitionKeyDefinition
 * type directly where appropriate.
 */
export type PartitionKey = PrimitivePartitionKeyValue | PrimitivePartitionKeyValue[];
/**
 * A primitive Partition Key value.
 */
export type PrimitivePartitionKeyValue = string | number | boolean | NullPartitionKeyType | NonePartitionKeyType;
/**
 * The returned object represents a partition key value that allows creating and accessing items
 * with a null value for the partition key.
 */
export type NullPartitionKeyType = null;
/**
 * The returned object represents a partition key value that allows creating and accessing items
 * without a value for partition key
 */
export type NonePartitionKeyType = {
    [K in any]: never;
};
/**
 * Builder class for building PartitionKey.
 */
export declare class PartitionKeyBuilder {
    readonly values: PrimitivePartitionKeyValue[];
    addValue(value: string | boolean | number): PartitionKeyBuilder;
    addNullValue(): PartitionKeyBuilder;
    addNoneValue(): PartitionKeyBuilder;
    build(): PartitionKey;
}
//# sourceMappingURL=PartitionKey.d.ts.map