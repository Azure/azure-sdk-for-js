import { AuthOptions } from "./auth";
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
  /** The account master or readonly key (alias of auth.key) */
  key?: string;
  /** An object that is used for authenticating requests and must contains one of the options */
  auth?: AuthOptions;
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
  plugins?: PluginConfig[];
}
