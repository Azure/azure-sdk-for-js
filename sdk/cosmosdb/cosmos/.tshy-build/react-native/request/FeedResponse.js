// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/index.js";
import { decodeAndParseJSONString, getRequestChargeIfAny, } from "../queryExecutionContext/headerUtils.js";
export class FeedResponse {
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
        return this.headers[Constants.HttpHeaders.Continuation];
    }
    get queryMetrics() {
        return this.headers[Constants.HttpHeaders.QueryMetrics];
    }
    get requestCharge() {
        return getRequestChargeIfAny(this.headers);
    }
    get activityId() {
        return this.headers[Constants.HttpHeaders.ActivityId];
    }
    get correlatedActivityId() {
        return this.headers[Constants.HttpHeaders.CorrelatedActivityId];
    }
    get indexMetrics() {
        return decodeAndParseJSONString(this.headers[Constants.HttpHeaders.IndexUtilization]);
    }
}
//# sourceMappingURL=FeedResponse.js.map