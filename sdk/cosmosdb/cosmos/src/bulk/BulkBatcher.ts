// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { RequestOptions, ErrorResponse } from "../request";
import { Constants } from "../common";
import { BulkOptions, calculateObjectSizeInBytes, ExecuteCallback, isSuccessStatusCode, OperationResponse, RetryCallback } from "../utils/batch";
import { BulkResponse } from "./BulkResponse";
import type { ItemBulkOperation } from "./ItemBulkOperation";




export class BulkBatcher {
    private batchOperationsList: ItemBulkOperation[];
    private currentSize: number;
    private dispatched: boolean;
    private executor: ExecuteCallback;
    private retrier: RetryCallback;
    private options: RequestOptions;
    private bulkOptions: BulkOptions;
    private diagnosticNode: DiagnosticNodeInternal;
    private orderedResponse: OperationResponse[];



    constructor(executor: ExecuteCallback, retrier: RetryCallback, options: RequestOptions, bulkOptions: BulkOptions, diagnosticNode: DiagnosticNodeInternal, orderedResponse: OperationResponse[]) {
        this.batchOperationsList = [];
        this.executor = executor;
        this.retrier = retrier;
        this.options = options;
        this.bulkOptions = bulkOptions;
        this.diagnosticNode = diagnosticNode;
        this.orderedResponse = orderedResponse;
        this.currentSize = 0;
    }

    public tryAdd(operation: ItemBulkOperation): boolean {
        if (this.dispatched) {
            return false;
        }
        if (!operation) {
            throw new ErrorResponse("Operation is not defined");
        }
        if (!operation.operationContext) {
            throw new ErrorResponse("Operation context is not defined");
        }
        if (this.batchOperationsList.length === Constants.MaxBulkOperationsCount) {
            return false;
        }
        const currentOperationSize = calculateObjectSizeInBytes(operation)
        if (this.batchOperationsList.length > 0 && this.currentSize + currentOperationSize > Constants.DefaultMaxBulkRequestBodySizeInBytes) {
            return false;
        }

        this.currentSize += currentOperationSize;
        this.batchOperationsList.push(operation);
        return true;
    }

    public async dispatch(): Promise<void> {
        try {
            const response: BulkResponse = await this.executor(this.batchOperationsList, this.options, this.bulkOptions, this.diagnosticNode);

            for (let i = 0; i < response.operations.length; i++) {
                const operation = response.operations[i];
                const operationResponse = response.result[i];

                if (!isSuccessStatusCode(operationResponse.statusCode)) {
                    const shouldRetry = await operation.operationContext.shouldRetry(operationResponse);
                    if (shouldRetry) {
                        await this.retrier(
                            operation,
                            this.diagnosticNode,
                            this.options,
                            this.bulkOptions,
                            this.orderedResponse
                        );
                        continue;
                    }
                }

                this.orderedResponse[operation.operationIndex] = operationResponse;
                operation.operationContext.complete(operationResponse);
            }

        } catch (error) {
            for (const operation of this.batchOperationsList) {
                operation.operationContext.fail(error);
            }
        } finally {
            this.batchOperationsList = [];
            this.dispatched = true;
        }
    }

}

