// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ItemBulkOperationContext } from "./ItemBulkOperationContext";
import type { ItemOperation } from "./ItemOperation";

/**
 * Represents an operation and its context on an item which will be executed as part of a batch request.
 * @hidden
 */

export interface ItemBulkOperation {
  operationInput: ItemOperation;
  operationContext: ItemBulkOperationContext;
}
