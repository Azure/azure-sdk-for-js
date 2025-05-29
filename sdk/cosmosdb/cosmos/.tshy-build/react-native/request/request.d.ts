import { HTTPMethod, OperationType, ResourceType } from "../common/index.js";
import type { CosmosClientOptions } from "../CosmosClientOptions.js";
import type { PartitionKeyInternal } from "../documents/index.js";
import type { CosmosHeaders } from "../queryExecutionContext/index.js";
import { type FeedOptions, type RequestOptions } from "./index.js";
/** @hidden */
export declare function bodyFromData(data: Buffer | string | Record<string, unknown>): string;
/**
 * @hidden
 */
interface GetHeadersOptions {
    clientOptions: CosmosClientOptions;
    defaultHeaders: CosmosHeaders;
    verb: HTTPMethod;
    path: string;
    resourceId: string;
    resourceType: ResourceType;
    options: RequestOptions & FeedOptions;
    operationType?: OperationType;
    partitionKeyRangeId?: string;
    useMultipleWriteLocations?: boolean;
    partitionKey?: PartitionKeyInternal;
}
/**
 * @hidden
 */
export declare function getHeaders({ clientOptions, defaultHeaders, verb, path, resourceId, resourceType, options, operationType, partitionKeyRangeId, useMultipleWriteLocations, partitionKey, }: GetHeadersOptions): Promise<CosmosHeaders>;
export {};
//# sourceMappingURL=request.d.ts.map