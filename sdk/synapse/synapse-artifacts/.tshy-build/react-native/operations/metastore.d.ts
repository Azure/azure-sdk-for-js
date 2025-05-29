import type { Metastore } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { MetastoreRegisterObject, MetastoreRegisterOptionalParams, MetastoreRegisterResponse, MetastoreGetDatabaseOperationsOptionalParams, MetastoreGetDatabaseOperationsResponse, MetastoreUpdateObject, MetastoreUpdateOptionalParams, MetastoreUpdateResponse, MetastoreDeleteOptionalParams } from "../models/index.js";
/** Class containing Metastore operations. */
export declare class MetastoreImpl implements Metastore {
    private readonly client;
    /**
     * Initialize a new instance of the class Metastore class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Register files in Syms
     * @param id - The name of the database to be created. The name can contain only alphanumeric characters
     *           and should not exceed 24 characters
     * @param registerBody - The body for the register request
     * @param options - The options parameters.
     */
    register(id: string, registerBody: MetastoreRegisterObject, options?: MetastoreRegisterOptionalParams): Promise<MetastoreRegisterResponse>;
    /**
     * Gets status of the database
     * @param id - the name of the database.
     * @param options - The options parameters.
     */
    getDatabaseOperations(id: string, options?: MetastoreGetDatabaseOperationsOptionalParams): Promise<MetastoreGetDatabaseOperationsResponse>;
    /**
     * Update files in Syms
     * @param id - The name of the database to be updated
     * @param updateBody - The body for the update request
     * @param options - The options parameters.
     */
    update(id: string, updateBody: MetastoreUpdateObject, options?: MetastoreUpdateOptionalParams): Promise<MetastoreUpdateResponse>;
    /**
     * Remove files in Syms
     * @param id - The name of the database to be deleted
     * @param options - The options parameters.
     */
    delete(id: string, options?: MetastoreDeleteOptionalParams): Promise<void>;
}
//# sourceMappingURL=metastore.d.ts.map