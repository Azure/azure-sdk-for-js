import { OperationsListOptionalParams, OperationsListResponse } from "../models/index.js";
/** Interface representing a Operations. */
export interface Operations {
    /**
     * Gets the details of all operations possible on the Microsoft.VisualStudio resource provider.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): Promise<OperationsListResponse>;
}
//# sourceMappingURL=operations.d.ts.map