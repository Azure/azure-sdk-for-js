// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConnectionPolicy, PartitionKey } from "../documents";
import { HTTPMethod, OperationType, ResourceType } from "../common";
import { Agent } from "../CosmosClientOptions";
import { ClientContext } from "../ClientContext";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { FeedOptions } from "./FeedOptions";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { Pipeline } from "@azure/core-rest-pipeline";
import { PluginConfig } from "../plugins/Plugin";
import { RequestOptions } from "./RequestOptions";

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
}
