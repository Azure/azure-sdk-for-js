import type { OperationArguments, OperationSpec } from "@azure/core-client";
import { StorageClient } from "./generated/src/index.js";
/**
 * @internal
 */
export declare class StorageContextClient extends StorageClient {
    sendOperationRequest<T>(operationArguments: OperationArguments, operationSpec: OperationSpec): Promise<T>;
}
//# sourceMappingURL=StorageContextClient.d.ts.map