import type { ServiceSubmitBatchResponseModel } from "./generatedModels.js";
import type { BatchSubRequest } from "./BlobBatch.js";
import type { ParsedBatchResponse } from "./BatchResponse.js";
/**
 * Util class for parsing batch response.
 */
export declare class BatchResponseParser {
    private readonly batchResponse;
    private readonly responseBatchBoundary;
    private readonly perResponsePrefix;
    private readonly batchResponseEnding;
    private readonly subRequests;
    constructor(batchResponse: ServiceSubmitBatchResponseModel, subRequests: Map<number, BatchSubRequest>);
    parseBatchResponse(): Promise<ParsedBatchResponse>;
}
//# sourceMappingURL=BatchResponseParser.d.ts.map