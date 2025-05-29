import { Operations } from "../operationsInterfaces/index.js";
import { VisualStudioResourceProviderClient } from "../visualStudioResourceProviderClient.js";
import { OperationsListOptionalParams, OperationsListResponse } from "../models/index.js";
/** Class containing Operations operations. */
export declare class OperationsImpl implements Operations {
    private readonly client;
    /**
     * Initialize a new instance of the class Operations class.
     * @param client Reference to the service client
     */
    constructor(client: VisualStudioResourceProviderClient);
    /**
     * Gets the details of all operations possible on the Microsoft.VisualStudio resource provider.
     * @param options The options parameters.
     */
    list(options?: OperationsListOptionalParams): Promise<OperationsListResponse>;
}
//# sourceMappingURL=operations.d.ts.map