import { WeightsAndBiasesClientOptionalParams } from "./api/index.js";
import { InstancesOperations } from "./classic/instances/index.js";
import { OperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
export { WeightsAndBiasesClientOptionalParams } from "./api/weightsAndBiasesContext.js";
export declare class WeightsAndBiasesClient {
    private _client;
    /** The pipeline used by this client to make requests */
    readonly pipeline: Pipeline;
    constructor(credential: TokenCredential, subscriptionId: string, options?: WeightsAndBiasesClientOptionalParams);
    /** The operation groups for instances */
    readonly instances: InstancesOperations;
    /** The operation groups for operations */
    readonly operations: OperationsOperations;
}
//# sourceMappingURL=weightsAndBiasesClient.d.ts.map