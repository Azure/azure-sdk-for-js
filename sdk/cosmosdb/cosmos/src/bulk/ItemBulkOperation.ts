// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationInput } from "../utils/batch";
import type { ItemBulkOperationContext } from "./ItemBulkOperationContext";

/**
 * Represents an operation on an item which will be executed as part of a batch request.
 * @hidden
 */

export interface ItemBulkOperation {
  operationInput: OperationInput;
  operationContext: ItemBulkOperationContext;
}
