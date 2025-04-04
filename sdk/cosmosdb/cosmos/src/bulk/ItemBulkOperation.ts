// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationInput } from "../utils/batch";
import type { ItemBulkOperationContext } from "./ItemBulkOperationContext";

/**
 * Represents an operation and its context on an item which will be executed as part of a batch request.
 * @hidden
 */

export interface ItemBulkOperation {
  // stores unenecrypted operationInput to avoid decryption of operationInput in bulk response.
  plainTextOperationInput: OperationInput;
  operationInput: OperationInput;
  operationContext: ItemBulkOperationContext;
}
