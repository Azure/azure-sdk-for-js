import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { Offer } from "./Offer.js";
import type { OfferDefinition } from "./OfferDefinition.js";
export declare class OfferResponse extends ResourceResponse<OfferDefinition & Resource> {
    constructor(resource: OfferDefinition & Resource, headers: CosmosHeaders, statusCode: number, diagnostics: CosmosDiagnostics, offer?: Offer);
    /** A reference to the {@link Offer} corresponding to the returned {@link OfferDefinition}. */
    readonly offer: Offer;
}
//# sourceMappingURL=OfferResponse.d.ts.map