// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenProvider } from "./auth";
import { PermissionDefinition } from "./client";
import { ConnectionPolicy, ConsistencyLevel } from "./documents";
import { PluginConfig } from "./plugins/Plugin";
import { CosmosHeaders } from "./queryExecutionContext/CosmosHeaders";

// We expose our own Agent interface to avoid taking a dependency on and leaking node types. This interface should mirror the node Agent interface
export interface Agent {
  maxFreeSockets: number;
  maxSockets: number;
  sockets: any;
  requests: any;
  destroy(): void;
}

export interface CosmosClientOptions {
  /** The service endpoint to use to create the client. */
  endpoint: string;
  /** The account master or readonly key */
  key?: string;
  /** An object that contains resources tokens.
   * Keys for the object are resource Ids and values are the resource tokens.
   */
  resourceTokens?: { [resourcePath: string]: string };
  /** A user supplied function for resolving header authorization tokens.
   * Allows users to generating their own auth tokens, potentially using a separate service
   */
  tokenProvider?: TokenProvider;
  /** An array of {@link Permission} objects. */
  permissionFeed?: PermissionDefinition[];
  /** An instance of {@link ConnectionPolicy} class.
   * This parameter is optional and the default connectionPolicy will be used if omitted.
   */
  connectionPolicy?: ConnectionPolicy;
  /** An optional parameter that represents the consistency level.
   * It can take any value from {@link ConsistencyLevel}.
   */
  consistencyLevel?: keyof typeof ConsistencyLevel;
  defaultHeaders?: CosmosHeaders;
  /** An optional custom http(s) Agent to be used in NodeJS enironments
   * Use an agent such as https://github.com/TooTallNate/node-proxy-agent if you need to connect to Cosmos via a proxy
   */
  agent?: Agent;
  /** A custom string to append to the default SDK user agent. */
  userAgentSuffix?: string;
  /** @internal */
  plugins?: PluginConfig[];
}
