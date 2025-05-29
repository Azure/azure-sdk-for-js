"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedResponse = void 0;
const index_js_1 = require("./common/index.js");
/**
 * A single response page from the Azure Cosmos DB Change Feed
 */
class ChangeFeedResponse {
    /**
     * @internal
     */
    constructor(
    /**
     * Gets the items returned in the response from Azure Cosmos DB
     */
    result, 
    /**
     * Gets the number of items returned in the response from Azure Cosmos DB
     */
    count, 
    /**
     * Gets the status code of the response from Azure Cosmos DB
     */
    statusCode, headers, diagnostics) {
        this.result = result;
        this.count = count;
        this.statusCode = statusCode;
        this.diagnostics = diagnostics;
        this.headers = Object.freeze(headers);
    }
    /**
     * Gets the request charge for this request from the Azure Cosmos DB service.
     */
    get requestCharge() {
        const rus = this.headers[index_js_1.Constants.HttpHeaders.RequestCharge];
        return rus ? parseInt(rus, 10) : null;
    }
    /**
     * Gets the activity ID for the request from the Azure Cosmos DB service.
     */
    get activityId() {
        return this.headers[index_js_1.Constants.HttpHeaders.ActivityId];
    }
    /**
     * Gets the continuation token to be used for continuing enumeration of the Azure Cosmos DB service.
     *
     * This is equivalent to the `etag` property.
     */
    get continuation() {
        return this.etag;
    }
    /**
     * Gets the session token for use in session consistency reads from the Azure Cosmos DB service.
     */
    get sessionToken() {
        return this.headers[index_js_1.Constants.HttpHeaders.SessionToken];
    }
    /**
     * Gets the entity tag associated with last transaction in the Azure Cosmos DB service,
     * which can be used as If-Non-Match Access condition for ReadFeed REST request or
     * `continuation` property of `ChangeFeedOptions` parameter for
     * `Items.changeFeed()`
     * to get feed changes since the transaction specified by this entity tag.
     *
     * This is equivalent to the `continuation` property.
     */
    get etag() {
        return this.headers[index_js_1.Constants.HttpHeaders.ETag];
    }
}
exports.ChangeFeedResponse = ChangeFeedResponse;
//# sourceMappingURL=ChangeFeedResponse.js.map