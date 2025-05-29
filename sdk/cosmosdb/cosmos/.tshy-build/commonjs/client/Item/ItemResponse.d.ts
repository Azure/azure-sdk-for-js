import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/ResourceResponse.js";
import type { Resource } from "../Resource.js";
import type { Item } from "./Item.js";
import type { ItemDefinition } from "./ItemDefinition.js";
export declare class ItemResponse<T extends ItemDefinition> extends ResourceResponse<T & Resource> {
    constructor(resource: T & Resource, headers: CosmosHeaders, statusCode: number, subsstatusCode: number, item: Item, diagnostics: CosmosDiagnostics);
    /** Reference to the {@link Item} the response corresponds to. */
    readonly item: Item;
}
//# sourceMappingURL=ItemResponse.d.ts.map