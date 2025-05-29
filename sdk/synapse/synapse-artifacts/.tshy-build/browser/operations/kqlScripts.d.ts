import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { KqlScripts } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { KqlScriptResource, KqlScriptsGetAllOptionalParams } from "../models/index.js";
/** Class containing KqlScripts operations. */
export declare class KqlScriptsImpl implements KqlScripts {
    private readonly client;
    /**
     * Initialize a new instance of the class KqlScripts class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Get all KQL scripts
     * @param options - The options parameters.
     */
    listAll(options?: KqlScriptsGetAllOptionalParams): PagedAsyncIterableIterator<KqlScriptResource>;
    private getAllPagingPage;
    private getAllPagingAll;
    /**
     * Get all KQL scripts
     * @param options - The options parameters.
     */
    private _getAll;
    /**
     * GetAllNext
     * @param nextLink - The nextLink from the previous successful call to the GetAll method.
     * @param options - The options parameters.
     */
    private _getAllNext;
}
//# sourceMappingURL=kqlScripts.d.ts.map