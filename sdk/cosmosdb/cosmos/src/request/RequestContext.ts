// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../ClientContext";
import type { HTTPMethod, OperationType, ResourceType } from "../common";
import type { Agent } from "../CosmosClientOptions";
import type { ConnectionPolicy, PartitionKey } from "../documents";
import type { GlobalEndpointManager } from "../globalEndpointManager";
import type { PluginConfig } from "../plugins/Plugin";
import type { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import type { FeedOptions } from "./FeedOptions";
import type { RequestOptions } from "./RequestOptions";
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
