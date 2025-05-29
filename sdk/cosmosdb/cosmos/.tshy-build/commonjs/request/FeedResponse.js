"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedResponse = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const index_js_1 = require("../common/index.js");
const headerUtils_js_1 = require("../queryExecutionContext/headerUtils.js");
class FeedResponse {
    constructor(resources, headers, hasMoreResults, diagnostics) {
        this.resources = resources;
        this.headers = headers;
        this.hasMoreResults = hasMoreResults;
        this.diagnostics = diagnostics;
    }
    get continuation() {
        return this.continuationToken;
    }
    get continuationToken() {
        return this.headers[index_js_1.Constants.HttpHeaders.Continuation];
    }
    get queryMetrics() {
        return this.headers[index_js_1.Constants.HttpHeaders.QueryMetrics];
    }
    get requestCharge() {
        return (0, headerUtils_js_1.getRequestChargeIfAny)(this.headers);
    }
    get activityId() {
        return this.headers[index_js_1.Constants.HttpHeaders.ActivityId];
    }
    get correlatedActivityId() {
        return this.headers[index_js_1.Constants.HttpHeaders.CorrelatedActivityId];
    }
    get indexMetrics() {
        return (0, headerUtils_js_1.decodeAndParseJSONString)(this.headers[index_js_1.Constants.HttpHeaders.IndexUtilization]);
    }
}
exports.FeedResponse = FeedResponse;
//# sourceMappingURL=FeedResponse.js.map