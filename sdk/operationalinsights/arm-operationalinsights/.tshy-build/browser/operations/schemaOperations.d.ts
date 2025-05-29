import { SchemaOperations } from "../operationsInterfaces/index.js";
import { OperationalInsightsManagementClient } from "../operationalInsightsManagementClient.js";
import { SchemaGetOptionalParams, SchemaGetResponse } from "../models/index.js";
/** Class containing SchemaOperations operations. */
export declare class SchemaOperationsImpl implements SchemaOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class SchemaOperations class.
     * @param client Reference to the service client
     */
    constructor(client: OperationalInsightsManagementClient);
    /**
     * Gets the schema for a given workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, options?: SchemaGetOptionalParams): Promise<SchemaGetResponse>;
}
//# sourceMappingURL=schemaOperations.d.ts.map