// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationInput } from "../utils/batch";
import { ItemBulkOperationContext } from "./ItemBulkOperationContext";


export class ItemBulkOperation {
    operationIndex: number;
    operationInput: OperationInput;
    operationContext: ItemBulkOperationContext;


    constructor(
        operationIndex: number,
        operationInput: OperationInput, context: ItemBulkOperationContext) {
        this.operationIndex = operationIndex;
        this.operationInput = operationInput;
        this.operationContext = context;
    }
}
