import type { ClientContext } from "../ClientContext.js";
import type { HTTPMethod, OperationType, ResourceType } from "../common/index.js";
import type { Agent } from "../CosmosClientOptions.js";
import type { ConnectionPolicy, PartitionKey } from "../documents/index.js";
import type { GlobalEndpointManager } from "../globalEndpointManager.js";
import type { PluginConfig } from "../plugins/Plugin.js";
import type { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders.js";
import type { FeedOptions } from "./FeedOptions.js";
import type { RequestOptions } from "./RequestOptions.js";
import type { HttpClient, Pipeline } from "@azure/core-rest-pipeline";
/**
 * @hidden
 */
export interface RequestContext {
    path?: string;
    operationType?: OperationType;
    client?: ClientContext;
    retryCount?: number;
    resourceType?: ResourceType;
    resourceId?: string;
    globalEndpointManager: GlobalEndpointManager;
    connectionPolicy: ConnectionPolicy;
    requestAgent: Agent;
    body?: any;
    headers?: CosmosHeaders;
    endpoint?: string;
    method: HTTPMethod;
    partitionKeyRangeId?: string;
    options: FeedOptions | RequestOptions;
    plugins: PluginConfig[];
    partitionKey?: PartitionKey;
    pipeline?: Pipeline;
    httpClient?: HttpClient;
}
//# sourceMappingURL=RequestContext.d.ts.map