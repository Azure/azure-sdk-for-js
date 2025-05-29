import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { KqlScriptResource, KqlScriptsGetAllOptionalParams } from "../models/index.js";
/** Interface representing a KqlScripts. */
export interface KqlScripts {
    /**
     * Get all KQL scripts
     * @param options - The options parameters.
     */
    listAll(options?: KqlScriptsGetAllOptionalParams): PagedAsyncIterableIterator<KqlScriptResource>;
}
//# sourceMappingURL=kqlScripts.d.ts.map