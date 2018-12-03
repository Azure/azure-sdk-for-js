import { AuthOptions } from "./auth";
import { ConnectionPolicy, ConsistencyLevel, QueryCompatibilityMode } from "./documents";
import { IHeaders } from "./queryExecutionContext/IHeaders";

// We expose our own Agent interface to avoid taking a dependency on and leaking node types. This interface should mirror the node Agent interface
interface Agent {
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
  connectionPolicy?: ConnectionPolicy | { [P in keyof ConnectionPolicy]?: ConnectionPolicy[P] };
  /** An optional parameter that represents the consistency level.
   * It can take any value from {@link ConsistencyLevel}.
   */
  consistencyLevel?: keyof typeof ConsistencyLevel;
  defaultHeaders?: IHeaders;
  agent?: Agent;
  queryCompatibilityMode?: QueryCompatibilityMode;
}
