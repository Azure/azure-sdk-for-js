"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferResponse = void 0;
const index_js_1 = require("../../request/index.js");
class OfferResponse extends index_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, diagnostics, offer) {
        super(resource, headers, statusCode, diagnostics);
        this.offer = offer;
    }
}
exports.OfferResponse = OfferResponse;
//# sourceMappingURL=OfferResponse.js.map