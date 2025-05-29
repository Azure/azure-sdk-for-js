import type { TokenCredential } from "@azure/core-auth";
import type { TokenProvider } from "./auth.js";
import type { PermissionDefinition } from "./client/index.js";
import type { ConnectionPolicy, ConsistencyLevel } from "./documents/index.js";
import type { CosmosHeaders } from "./queryExecutionContext/CosmosHeaders.js";
import type { CosmosDbDiagnosticLevel } from "./diagnostics/CosmosDbDiagnosticLevel.js";
import type { HttpClient } from "@azure/core-rest-pipeline";
import type { ClientEncryptionOptions } from "./encryption/ClientEncryptionOptions.js";
export interface Agent {
    maxFreeSockets: number;
    maxSockets: number;
    sockets: any;
    requests: any;
    destroy(): void;
}
export interface CosmosClientOptions {
    /** The service endpoint to use to create the client. */
    endpoint?: string;
    /** The account master or readonly key */
    key?: string;
    /** An object that contains resources tokens.
     * Keys for the object are resource Ids and values are the resource tokens.
     */
    resourceTokens?: {
        [resourcePath: string]: string;
    };
    /** A user supplied function for resolving header authorization tokens.
     * Allows users to generating their own auth tokens, potentially using a separate service
     */
    tokenProvider?: TokenProvider;
    /** AAD token from `@azure/identity`
     * Obtain a credential object by creating an `@azure/identity` credential object
     * We will then use your credential object and a scope URL (your cosmos db endpoint)
     * to authenticate requests to Cosmos
     */
    aadCredentials?: TokenCredential;
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
    /** An optional custom http(s) Agent to be used in NodeJS environments
     * Use an agent such as https://github.com/TooTallNate/node-proxy-agent if you need to connect to Cosmos via a proxy
     */
    agent?: Agent;
    /** An optional custom `HttpClient` shape to customize how requests are made by the HTTP pipeline.
     * See `@azure/core-rest-pipeline` for details on how to implement this interface. */
    httpClient?: HttpClient;
    /** A custom string to append to the default SDK user agent. */
    userAgentSuffix?: string;
    diagnosticLevel?: CosmosDbDiagnosticLevel;
    /** encryption policy for operations involving encryption
     * must be set on the client if using client-side encryption
     * @see {@link ClientEncryptionOptions}
     */
    clientEncryptionOptions?: ClientEncryptionOptions;
    /** An optional parameter to set throughput bucket number. This value can be overridden at request level
     * For more information, visit [Cosmos DB throughput Bucketing](https://aka.ms/cosmsodb-bucketing).
     */
    throughputBucket?: number;
    /** An optional parameter that represents the connection string. Your database connection string can be found in the Azure Portal. */
    connectionString?: string;
}
//# sourceMappingURL=CosmosClientOptions.d.ts.map