"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceResponse = void 0;
const index_js_1 = require("../common/index.js");
class ResourceResponse {
    constructor(resource, headers, statusCode, diagnostics, substatus) {
        this.resource = resource;
        this.headers = headers;
        this.statusCode = statusCode;
        this.diagnostics = diagnostics;
        this.substatus = substatus;
    }
    get requestCharge() {
        return Number(this.headers[index_js_1.Constants.HttpHeaders.RequestCharge]) || 0;
    }
    get activityId() {
        return this.headers[index_js_1.Constants.HttpHeaders.ActivityId];
    }
    get etag() {
        return this.headers[index_js_1.Constants.HttpHeaders.ETag];
    }
}
exports.ResourceResponse = ResourceResponse;
//# sourceMappingURL=ResourceResponse.js.map