import { Metadata } from "../operationsInterfaces/index.js";
import { AzureLogAnalyticsContext } from "../azureLogAnalyticsContext.js";
import { MetadataGetOptionalParams, MetadataGetResponse, MetadataPostOptionalParams, MetadataPostResponse } from "../models/index.js";
/** Class containing Metadata operations. */
export declare class MetadataImpl implements Metadata {
    private readonly client;
    /**
     * Initialize a new instance of the class Metadata class.
     * @param client Reference to the service client
     */
    constructor(client: AzureLogAnalyticsContext);
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