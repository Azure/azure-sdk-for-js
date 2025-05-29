import { SchemaGetOptionalParams, SchemaGetResponse } from "../models/index.js";
/** Interface representing a SchemaOperations. */
export interface SchemaOperations {
    /**
     * Gets the schema for a given workspace.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param workspaceName The name of the workspace.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, workspaceName: string, options?: SchemaGetOptionalParams): Promise<SchemaGetResponse>;
}
//# sourceMappingURL=schemaOperations.d.ts.map