import { Agent } from "http";
import { AuthOptions } from "./auth";
import { ConnectionPolicy, ConsistencyLevel, QueryCompatibilityMode } from "./documents";
import { IHeaders } from "./queryExecutionContext/IHeaders";

export interface CosmosClientOptions {
  /** The service endpoint to use to create the client. */
  endpoint: string;
  /** An object that is used for authenticating requests and must contains one of the options */
  auth: AuthOptions;
  /** An instance of {@link ConnectionPolicy} class.
   * This parameter is optional and the default connectionPolicy will be used if omitted.
   */
  connectionPolicy?: ConnectionPolicy;
  /** An optional parameter that represents the consistency level.
   * It can take any value from {@link ConsistencyLevel}.
   */
  consistencyLevel?: keyof typeof ConsistencyLevel;
  defaultHeaders?: IHeaders;
  agent?: Agent;
  queryCompatibilityMode?: QueryCompatibilityMode;
}
