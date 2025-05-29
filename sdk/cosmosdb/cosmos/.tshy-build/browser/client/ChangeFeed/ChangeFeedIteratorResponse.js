import { Constants } from "../../common/index.js";
/**
 * A single response page from the Azure Cosmos DB Change Feed
 */
export class ChangeFeedIteratorResponse {
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
    statusCode, 
    /**
     * Headers related to cosmos DB and change feed.
     */
    headers, 
    /**
     * Cosmos Diagnostic Object.
     */
    diagnostics, 
    /**
     * Gets the subStatusCodes of the response from Azure Cosmos DB. Useful in partition split or partition gone.
     */
    subStatusCode) {
        this.result = result;
        this.count = count;
        this.statusCode = statusCode;
        this.diagnostics = diagnostics;
        this.subStatusCode = subStatusCode;
        this.headers = headers;
    }
    /**
     * Gets the request charge for this request from the Azure Cosmos DB service.
     */
    get requestCharge() {
        const rus = this.headers[Constants.HttpHeaders.RequestCharge];
        return rus ? parseInt(rus, 10) : null;
    }
    /**
     * Gets the activity ID for the request from the Azure Cosmos DB service.
     */
    get activityId() {
        return this.headers[Constants.HttpHeaders.ActivityId];
    }
    /**
     * Gets the continuation token to be used for continuing enumeration of the Azure Cosmos DB service.
     */
    get continuationToken() {
        return this.headers[Constants.HttpHeaders.ContinuationToken];
    }
    /**
     * Gets the session token for use in session consistency reads from the Azure Cosmos DB service.
     */
    get sessionToken() {
        return this.headers[Constants.HttpHeaders.SessionToken];
    }
}
//# sourceMappingURL=ChangeFeedIteratorResponse.js.map