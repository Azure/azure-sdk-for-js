import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { LinkConnectionOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { LinkConnectionResource, LinkConnectionListByWorkspaceOptionalParams, LinkConnectionCreateOrUpdateOptionalParams, LinkConnectionCreateOrUpdateResponse, LinkConnectionGetOptionalParams, LinkConnectionGetResponse, LinkConnectionDeleteOptionalParams, EditTablesRequest, LinkConnectionEditTablesOptionalParams, LinkConnectionStartOptionalParams, LinkConnectionStopOptionalParams, LinkConnectionGetDetailedStatusOptionalParams, LinkConnectionGetDetailedStatusResponse, LinkConnectionListLinkTablesOptionalParams, LinkConnectionListLinkTablesResponse, QueryTableStatusRequest, LinkConnectionQueryTableStatusOptionalParams, LinkConnectionQueryTableStatusResponse, UpdateLandingZoneCredential, LinkConnectionUpdateLandingZoneCredentialOptionalParams, LinkConnectionPauseOptionalParams, LinkConnectionResumeOptionalParams } from "../models/index.js";
/** Class containing LinkConnectionOperations operations. */
export declare class LinkConnectionOperationsImpl implements LinkConnectionOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class LinkConnectionOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * List link connections
     * @param options - The options parameters.
     */
    listByWorkspace(options?: LinkConnectionListByWorkspaceOptionalParams): PagedAsyncIterableIterator<LinkConnectionResource>;
    private listByWorkspacePagingPage;
    private listByWorkspacePagingAll;
    /**
     * List link connections
     * @param options - The options parameters.
     */
    private _listByWorkspace;
    /**
     * Creates or updates a link connection
     * @param linkConnectionName - The link connection name
     * @param linkConnection - Link connection resource definition
     * @param options - The options parameters.
     */
    createOrUpdate(linkConnectionName: string, linkConnection: LinkConnectionResource, options?: LinkConnectionCreateOrUpdateOptionalParams): Promise<LinkConnectionCreateOrUpdateResponse>;
    /**
     * Get a link connection
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    get(linkConnectionName: string, options?: LinkConnectionGetOptionalParams): Promise<LinkConnectionGetResponse>;
    /**
     * Delete a link connection
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    delete(linkConnectionName: string, options?: LinkConnectionDeleteOptionalParams): Promise<void>;
    /**
     * Edit tables for a link connection
     * @param linkConnectionName - The link connection name
     * @param editTablesRequest - Edit tables request
     * @param options - The options parameters.
     */
    editTables(linkConnectionName: string, editTablesRequest: EditTablesRequest, options?: LinkConnectionEditTablesOptionalParams): Promise<void>;
    /**
     * Start a link connection. It may take a few minutes from Starting to Running, monitor the status with
     * LinkConnection_GetDetailedStatus.
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    start(linkConnectionName: string, options?: LinkConnectionStartOptionalParams): Promise<void>;
    /**
     * Stop a link connection. It may take a few minutes from Stopping to stopped, monitor the status with
     * LinkConnection_GetDetailedStatus.
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    stop(linkConnectionName: string, options?: LinkConnectionStopOptionalParams): Promise<void>;
    /**
     * Get the detailed status of a link connection
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    getDetailedStatus(linkConnectionName: string, options?: LinkConnectionGetDetailedStatusOptionalParams): Promise<LinkConnectionGetDetailedStatusResponse>;
    /**
     * List the link tables of a link connection
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    listLinkTables(linkConnectionName: string, options?: LinkConnectionListLinkTablesOptionalParams): Promise<LinkConnectionListLinkTablesResponse>;
    /**
     * Query the link table status of a link connection
     * @param linkConnectionName - The link connection name
     * @param queryTableStatusRequest - Query table status request
     * @param options - The options parameters.
     */
    queryTableStatus(linkConnectionName: string, queryTableStatusRequest: QueryTableStatusRequest, options?: LinkConnectionQueryTableStatusOptionalParams): Promise<LinkConnectionQueryTableStatusResponse>;
    /**
     * Update landing zone credential of a link connection
     * @param linkConnectionName - The link connection name
     * @param updateLandingZoneCredentialRequest - update landing zone credential request
     * @param options - The options parameters.
     */
    updateLandingZoneCredential(linkConnectionName: string, updateLandingZoneCredentialRequest: UpdateLandingZoneCredential, options?: LinkConnectionUpdateLandingZoneCredentialOptionalParams): Promise<void>;
    /**
     * Pause a link connection. It may take a few minutes from Pausing to Paused, monitor the status with
     * LinkConnection_GetDetailedStatus.
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    pause(linkConnectionName: string, options?: LinkConnectionPauseOptionalParams): Promise<void>;
    /**
     * Resume a link connection. It may take a few minutes from Resuming to Running, monitor the status
     * with LinkConnection_GetDetailedStatus.
     * @param linkConnectionName - The link connection name
     * @param options - The options parameters.
     */
    resume(linkConnectionName: string, options?: LinkConnectionResumeOptionalParams): Promise<void>;
    /**
     * ListByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the ListByWorkspace method.
     * @param options - The options parameters.
     */
    private _listByWorkspaceNext;
}
//# sourceMappingURL=linkConnectionOperations.d.ts.map