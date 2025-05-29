import { ResourceResponse } from "../../request/index.js";
export class OfferResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, diagnostics, offer) {
        super(resource, headers, statusCode, diagnostics);
        this.offer = offer;
    }
}
//# sourceMappingURL=OfferResponse.js.map