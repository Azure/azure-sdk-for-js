import type { PartitionKeyDefinition, PrimitivePartitionKeyValue } from "../../documents/index.js";
/**
 * Generate hash of a PartitonKey based on it PartitionKeyDefinition.
 * @param partitionKey - to be hashed.
 * @param partitionDefinition - container's partitionKey definition
 * @returns
 */
export declare function hashPartitionKey(partitionKey: PrimitivePartitionKeyValue[], partitionDefinition: PartitionKeyDefinition): string;
//# sourceMappingURL=hash.d.ts.map