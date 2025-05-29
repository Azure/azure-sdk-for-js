import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { SqlScriptOperations } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import type { SqlScriptResource, SqlScriptGetSqlScriptsByWorkspaceOptionalParams, SqlScriptCreateOrUpdateSqlScriptOptionalParams, SqlScriptCreateOrUpdateSqlScriptResponse, SqlScriptGetSqlScriptOptionalParams, SqlScriptGetSqlScriptResponse, SqlScriptDeleteSqlScriptOptionalParams, ArtifactRenameRequest, SqlScriptRenameSqlScriptOptionalParams } from "../models/index.js";
/** Class containing SqlScriptOperations operations. */
export declare class SqlScriptOperationsImpl implements SqlScriptOperations {
    private readonly client;
    /**
     * Initialize a new instance of the class SqlScriptOperations class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Lists sql scripts.
     * @param options - The options parameters.
     */
    listSqlScriptsByWorkspace(options?: SqlScriptGetSqlScriptsByWorkspaceOptionalParams): PagedAsyncIterableIterator<SqlScriptResource>;
    private getSqlScriptsByWorkspacePagingPage;
    private getSqlScriptsByWorkspacePagingAll;
    /**
     * Lists sql scripts.
     * @param options - The options parameters.
     */
    private _getSqlScriptsByWorkspace;
    /**
     * Creates or updates a Sql Script.
     * @param sqlScriptName - The sql script name.
     * @param sqlScript - Sql Script resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateSqlScript(sqlScriptName: string, sqlScript: SqlScriptResource, options?: SqlScriptCreateOrUpdateSqlScriptOptionalParams): Promise<SimplePollerLike<OperationState<SqlScriptCreateOrUpdateSqlScriptResponse>, SqlScriptCreateOrUpdateSqlScriptResponse>>;
    /**
     * Creates or updates a Sql Script.
     * @param sqlScriptName - The sql script name.
     * @param sqlScript - Sql Script resource definition.
     * @param options - The options parameters.
     */
    beginCreateOrUpdateSqlScriptAndWait(sqlScriptName: string, sqlScript: SqlScriptResource, options?: SqlScriptCreateOrUpdateSqlScriptOptionalParams): Promise<SqlScriptCreateOrUpdateSqlScriptResponse>;
    /**
     * Gets a sql script.
     * @param sqlScriptName - The sql script name.
     * @param options - The options parameters.
     */
    getSqlScript(sqlScriptName: string, options?: SqlScriptGetSqlScriptOptionalParams): Promise<SqlScriptGetSqlScriptResponse>;
    /**
     * Deletes a Sql Script.
     * @param sqlScriptName - The sql script name.
     * @param options - The options parameters.
     */
    beginDeleteSqlScript(sqlScriptName: string, options?: SqlScriptDeleteSqlScriptOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a Sql Script.
     * @param sqlScriptName - The sql script name.
     * @param options - The options parameters.
     */
    beginDeleteSqlScriptAndWait(sqlScriptName: string, options?: SqlScriptDeleteSqlScriptOptionalParams): Promise<void>;
    /**
     * Renames a sqlScript.
     * @param sqlScriptName - The sql script name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameSqlScript(sqlScriptName: string, request: ArtifactRenameRequest, options?: SqlScriptRenameSqlScriptOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Renames a sqlScript.
     * @param sqlScriptName - The sql script name.
     * @param request - proposed new name.
     * @param options - The options parameters.
     */
    beginRenameSqlScriptAndWait(sqlScriptName: string, request: ArtifactRenameRequest, options?: SqlScriptRenameSqlScriptOptionalParams): Promise<void>;
    /**
     * GetSqlScriptsByWorkspaceNext
     * @param nextLink - The nextLink from the previous successful call to the GetSqlScriptsByWorkspace
     *                 method.
     * @param options - The options parameters.
     */
    private _getSqlScriptsByWorkspaceNext;
}
//# sourceMappingURL=sqlScriptOperations.d.ts.map