import { Query } from "../operationsInterfaces/index.js";
import { AzureDigitalTwinsAPI } from "../azureDigitalTwinsAPI.js";
import { QuerySpecification, QueryQueryTwinsOptionalParams, QueryQueryTwinsResponse } from "../models/index.js";
/** Class containing Query operations. */
export declare class QueryImpl implements Query {
    private readonly client;
    /**
     * Initialize a new instance of the class Query class.
     * @param client Reference to the service client
     */
    constructor(client: AzureDigitalTwinsAPI);
    /**
     * Executes a query that allows traversing relationships and filtering by property values.
     * Status codes:
     * * 200 OK
     * * 400 Bad Request
     *   * BadRequest - The continuation token is invalid.
     *   * SqlQueryError - The query contains some errors.
     *   * TimeoutError - The query execution timed out after 60 seconds. Try simplifying the query or
     * adding conditions to reduce the result size.
     *  * 429 Too Many Requests
     *   * QuotaReachedError - The maximum query rate limit has been reached.
     * @param querySpecification The query specification to execute.
     * @param options The options parameters.
     */
    queryTwins(querySpecification: QuerySpecification, options?: QueryQueryTwinsOptionalParams): Promise<QueryQueryTwinsResponse>;
}
//# sourceMappingURL=query.d.ts.map