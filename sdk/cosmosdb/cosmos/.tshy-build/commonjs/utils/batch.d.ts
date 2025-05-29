import type { JSONObject } from "../queryExecutionContext/index.js";
import type { CosmosDiagnostics, CosmosHeaders, DiagnosticNodeInternal, ErrorResponse, RequestOptions, StatusCode } from "../index.js";
import type { PartitionKey, PartitionKeyDefinition, PrimitivePartitionKeyValue } from "../documents/index.js";
import type { PatchRequestBody } from "./patch.js";
import type { ItemOperation } from "../bulk/ItemOperation.js";
import type { BulkResponse } from "../bulk/index.js";
import type { EncryptionProcessor } from "../encryption/EncryptionProcessor.js";
export type Operation = CreateOperation | UpsertOperation | ReadOperation | DeleteOperation | ReplaceOperation | BulkPatchOperation;
export interface Batch {
    min: string;
    max: string;
    rangeId: string;
    indexes: number[];
    operations: Operation[];
}
export type BulkOperationResponse = OperationResponse[] & {
    diagnostics: CosmosDiagnostics;
};
/**
 * represents response for an operation in bulk with executeBulkOperations API
 */
export interface BulkOperationResult {
    /** the original operation input passed */
    operationInput: OperationInput;
    /** response from the backend for the item operation  */
    response?: ExtendedOperationResponse;
    /** any exceptions are captured here */
    error?: ErrorResponse;
}
/**
 * response for a successful operation in bulk with executeBulkOperations API
 */
export interface ExtendedOperationResponse extends OperationResponse {
    /** activity id related to the operation */
    activityId?: string;
    /** session Token assigned to the result */
    sessionToken?: string;
    /** headers associated with the operation */
    headers?: CosmosHeaders;
    /** diagnostic details associated with operation */
    diagnostics: CosmosDiagnostics;
}
export interface OperationResponse {
    statusCode: number;
    requestCharge: number;
    eTag?: string;
    resourceBody?: JSONObject;
}
/**
 * Options object used to modify bulk execution.
 * continueOnError (Default value: false) - Continues bulk execution when an operation fails ** NOTE THIS WILL DEFAULT TO TRUE IN the 4.0 RELEASE
 */
export interface BulkOptions {
    continueOnError?: boolean;
}
export declare function isKeyInRange(min: string, max: string, key: string): boolean;
export interface OperationBase {
    partitionKey?: string;
    ifMatch?: string;
    ifNoneMatch?: string;
}
export declare const BulkOperationType: {
    readonly Create: "Create";
    readonly Upsert: "Upsert";
    readonly Read: "Read";
    readonly Delete: "Delete";
    readonly Replace: "Replace";
    readonly Patch: "Patch";
};
export type OperationInput = CreateOperationInput | UpsertOperationInput | ReadOperationInput | DeleteOperationInput | ReplaceOperationInput | PatchOperationInput;
export interface CreateOperationInput {
    partitionKey?: PartitionKey;
    ifMatch?: string;
    ifNoneMatch?: string;
    operationType: typeof BulkOperationType.Create;
    resourceBody: JSONObject;
}
export interface UpsertOperationInput {
    partitionKey?: PartitionKey;
    ifMatch?: string;
    ifNoneMatch?: string;
    operationType: typeof BulkOperationType.Upsert;
    resourceBody: JSONObject;
}
export interface ReadOperationInput {
    partitionKey?: PartitionKey;
    operationType: typeof BulkOperationType.Read;
    id: string;
}
export interface DeleteOperationInput {
    partitionKey?: PartitionKey;
    operationType: typeof BulkOperationType.Delete;
    id: string;
}
export interface ReplaceOperationInput {
    partitionKey?: PartitionKey;
    ifMatch?: string;
    ifNoneMatch?: string;
    operationType: typeof BulkOperationType.Replace;
    resourceBody: JSONObject;
    id: string;
}
export interface PatchOperationInput {
    partitionKey?: PartitionKey;
    ifMatch?: string;
    ifNoneMatch?: string;
    operationType: typeof BulkOperationType.Patch;
    resourceBody: PatchRequestBody;
    id: string;
}
export type OperationWithItem = OperationBase & {
    resourceBody: JSONObject;
};
export type CreateOperation = OperationWithItem & {
    operationType: typeof BulkOperationType.Create;
};
export type UpsertOperation = OperationWithItem & {
    operationType: typeof BulkOperationType.Upsert;
};
export type ReadOperation = OperationBase & {
    operationType: typeof BulkOperationType.Read;
    id: string;
};
export type DeleteOperation = OperationBase & {
    operationType: typeof BulkOperationType.Delete;
    id: string;
};
export type ReplaceOperation = OperationWithItem & {
    operationType: typeof BulkOperationType.Replace;
    id: string;
};
export type BulkPatchOperation = OperationBase & {
    operationType: typeof BulkOperationType.Patch;
    id: string;
};
export declare function hasResource(operation: Operation): operation is CreateOperation | UpsertOperation | ReplaceOperation;
/**
 * Maps OperationInput to Operation by
 * - generating Ids if needed.
 * - choosing partitionKey which can be used to choose which batch this
 * operation should be part of. The order is -
 *   1. If the operationInput itself has partitionKey field set it is used.
 *   2. Other wise for create/replace/upsert it is extracted from resource body.
 *   3. For read/delete/patch type operations undefined partitionKey is used.
 * - Here one nuance is that, the partitionKey field inside Operation needs to
 *  be serialized as a JSON string.
 * @param operationInput - OperationInput
 * @param definition - PartitionKeyDefinition
 * @param options - RequestOptions
 * @returns
 */
export declare function prepareOperations(operationInput: OperationInput, definition: PartitionKeyDefinition, options?: RequestOptions): {
    operation: Operation;
    partitionKey: PrimitivePartitionKeyValue[];
};
/**
 * Splits a batch into array of batches based on cumulative size of its operations by making sure
 * cumulative size of an individual batch is not larger than {@link Constants.DefaultMaxBulkRequestBodySizeInBytes}.
 * If a single operation itself is larger than {@link Constants.DefaultMaxBulkRequestBodySizeInBytes}, that
 * operation would be moved into a batch containing only that operation.
 * @param originalBatch - A batch of operations needed to be checked.
 * @returns
 * @hidden
 */
export declare function splitBatchBasedOnBodySize(originalBatch: Batch): Batch[];
/**
 * Calculates size of an JSON object in bytes with utf-8 encoding.
 * @hidden
 */
export declare function calculateObjectSizeInBytes(obj: unknown): number;
export declare function decorateBatchOperation(operation: OperationInput, options?: RequestOptions): Operation;
export declare function isSuccessStatusCode(statusCode: StatusCode): boolean;
export type ExecuteCallback = (operations: ItemOperation[], diagnosticNode: DiagnosticNodeInternal) => Promise<BulkResponse>;
export type RetryCallback = (operation: ItemOperation, diagnosticNode: DiagnosticNodeInternal) => Promise<void>;
export declare class TaskCompletionSource<T> {
    private readonly promise;
    private resolveFn;
    private rejectFn;
    constructor();
    get task(): Promise<T>;
    setResult(value: T): void;
    setException(error: Error): void;
}
export declare function encryptOperationInput(encryptionProcessor: EncryptionProcessor, operation: OperationInput, totalPropertiesEncryptedCount: number): Promise<{
    operation: OperationInput;
    totalPropertiesEncryptedCount: number;
}>;
//# sourceMappingURL=batch.d.ts.map