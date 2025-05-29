import type { OperationInput } from "../utils/batch.js";
import type { ItemOperationContext } from "./ItemOperationContext.js";
/**
 * Represents an operation and its context on an item which will be executed as part of a batch request.
 * @hidden
 */
export interface ItemOperation {
    unencryptedOperationInput: OperationInput;
    operationInput: OperationInput;
    operationContext: ItemOperationContext;
}
//# sourceMappingURL=ItemOperation.d.ts.map