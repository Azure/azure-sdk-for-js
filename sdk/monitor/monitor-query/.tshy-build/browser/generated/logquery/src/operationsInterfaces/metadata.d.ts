import { MetadataGetOptionalParams, MetadataGetResponse, MetadataPostOptionalParams, MetadataPostResponse } from "../models/index.js";
/** Interface representing a Metadata. */
export interface Metadata {
    /**
     * Retrieve the metadata information for the workspace, including its schema, functions, workspace
     * info, categories etc.
     * @param workspaceId Primary Workspace ID of the query. This is the Workspace ID from the Properties
     *                    blade in the Azure portal.
     * @param options The options parameters.
     */
    get(workspaceId: string, options?: MetadataGetOptionalParams): Promise<MetadataGetResponse>;
    /**
     * Retrieve the metadata information for the workspace, including its schema, functions, workspace
     * info, categories etc.
     * @param workspaceId Primary Workspace ID of the query. This is the Workspace ID from the Properties
     *                    blade in the Azure portal.
     * @param options The options parameters.
     */
    post(workspaceId: string, options?: MetadataPostOptionalParams): Promise<MetadataPostResponse>;
}
//# sourceMappingURL=metadata.d.ts.map