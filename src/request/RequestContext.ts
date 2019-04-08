import { ClientContext } from "../ClientContext";
import { HTTPMethod, OperationType, ResourceType } from "../common";
import { Agent } from "../CosmosClientOptions";
import { ConnectionPolicy } from "../documents";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { PluginConfig } from "../plugins/Plugin";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { FeedOptions } from "./FeedOptions";
import { LocationRouting } from "./LocationRouting";
import { RequestOptions } from "./RequestOptions";

export interface RequestContext {
  path?: string;
  operationType?: OperationType;
  client?: ClientContext;
  retryCount?: number;
  resourceType?: ResourceType;
  resourceId?: string;
  locationRouting?: LocationRouting;
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
}
