import { WorkloadsClientOptionalParams } from "./api/index.js";
import { SAPApplicationServerInstancesOperations } from "./classic/sapApplicationServerInstances/index.js";
import { SAPDatabaseInstancesOperations } from "./classic/sapDatabaseInstances/index.js";
import { SAPCentralServerInstancesOperations } from "./classic/sapCentralServerInstances/index.js";
import { SAPVirtualInstancesOperations } from "./classic/sapVirtualInstances/index.js";
import { OperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
export { WorkloadsClientOptionalParams } from "./api/workloadsContext.js";
export declare class WorkloadsClient {
    private _client;
    /** The pipeline used by this client to make requests */
    readonly pipeline: Pipeline;
    /** Workloads client provides access to various workload operations. */
    constructor(credential: TokenCredential, subscriptionId: string, options?: WorkloadsClientOptionalParams);
    /** The operation groups for sapApplicationServerInstances */
    readonly sapApplicationServerInstances: SAPApplicationServerInstancesOperations;
    /** The operation groups for sapDatabaseInstances */
    readonly sapDatabaseInstances: SAPDatabaseInstancesOperations;
    /** The operation groups for sapCentralServerInstances */
    readonly sapCentralServerInstances: SAPCentralServerInstancesOperations;
    /** The operation groups for sapVirtualInstances */
    readonly sapVirtualInstances: SAPVirtualInstancesOperations;
    /** The operation groups for operations */
    readonly operations: OperationsOperations;
}
//# sourceMappingURL=workloadsClient.d.ts.map