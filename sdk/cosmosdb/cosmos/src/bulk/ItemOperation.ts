// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationInput } from "../utils/batch.js";
import type { ItemOperationContext } from "./ItemOperationContext.js";

/**
 * Represents an operation and its context on an item which will be executed as part of a batch request.
 * @hidden
 */

export interface ItemOperation {
  // stores unencrypted operationInput to avoid decryption of operationInput in bulk response.
  unencryptedOperationInput: OperationInput;
  operationInput: OperationInput;
  operationContext: ItemOperationContext;
}
