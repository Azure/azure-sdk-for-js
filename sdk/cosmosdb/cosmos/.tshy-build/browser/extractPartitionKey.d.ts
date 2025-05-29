import type { PartitionKey, PartitionKeyDefinition, PartitionKeyInternal } from "./documents/index.js";
import type { Container } from "./client/index.js";
import type { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";
/**
 * Function to extract PartitionKey based on {@link PartitionKeyDefinition}
 * from an object.
 * Retuns
 * 1. PartitionKeyInternal[] if extraction is successful.
 * 2. undefined if either {@link partitionKeyDefinition} is not well formed
 * or an unsupported partitionkey type is encountered.
 * @hidden
 */
export declare function extractPartitionKeys(document: unknown, partitionKeyDefinition?: PartitionKeyDefinition): PartitionKeyInternal | undefined;
/**
 * @hidden
 */
export declare function undefinedPartitionKey(partitionKeyDefinition: PartitionKeyDefinition): PartitionKeyInternal;
/**
 * @hidden
 */
export declare function setPartitionKeyIfUndefined(diagnosticNode: DiagnosticNodeInternal, container: Container, partitionKey: PartitionKey): Promise<PartitionKeyInternal>;
//# sourceMappingURL=extractPartitionKey.d.ts.map