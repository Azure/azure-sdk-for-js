import { ConnectionPolicy, ConsistencyLevel } from "./documents";

export interface CosmosClientOptions {
  /** The service endpoint to use to create the client. */
  endpoint: string;
  /** An object that is used for authenticating requests and must contains one of the options */
  auth: {
    /** The authorization master key to use to create the client. */
    masterKey?: string;
    /** An array of {@link Permission} objects. */
    permissionFeed?: any; // TODO: any
    /** An object that contains resources tokens.
     * Keys for the object are resource Ids and values are the resource tokens.
     */
    resourceTokens?: any; // TODO: any
    tokenProvider?: any; // TODO: any
  };
  /** An instance of {@link ConnectionPolicy} class.
   * This parameter is optional and the default connectionPolicy will be used if omitted.
   */
  connectionPolicy?: ConnectionPolicy;
  /** An optional parameter that represents the consistency level.
   * It can take any value from {@link ConsistencyLevel}.
   */
  consistencyLevel?: ConsistencyLevel;
}
