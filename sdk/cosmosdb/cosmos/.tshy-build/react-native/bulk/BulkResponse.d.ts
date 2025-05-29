import type { CosmosDiagnostics, Response } from "../index.js";
import { ErrorResponse } from "../index.js";
import type { CosmosHeaders } from "../queryExecutionContext/headerUtils.js";
import type { StatusCode, SubStatusCode } from "../request/StatusCodes.js";
import type { ExtendedOperationResponse } from "../utils/batch.js";
import type { ItemOperation } from "./index.js";
/**
 * Represents a batch response for bulk request.
 * @hidden
 */
export declare class BulkResponse {
    statusCode: StatusCode;
    subStatusCode: SubStatusCode;
    headers: CosmosHeaders;
    operations: ItemOperation[];
    results: (ExtendedOperationResponse | ErrorResponse)[];
    diagnostics: CosmosDiagnostics;
    constructor(statusCode: StatusCode, subStatusCode: SubStatusCode, headers: CosmosHeaders, operations: ItemOperation[]);
    /**
     * Generate empty response object
     */
    static createEmptyResponse(operations: ItemOperation[], statusCode: StatusCode, subStatusCode: SubStatusCode, headers: CosmosHeaders): BulkResponse;
    /**
     * static method to create BulkResponse from Response object
     */
    static fromResponseMessage(responseMessage: Response<any>, operations: ItemOperation[]): BulkResponse;
    private static populateFromResponse;
    private createAndPopulateResults;
}
//# sourceMappingURL=BulkResponse.d.ts.map