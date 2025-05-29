import { type KeyCredential } from "@azure/core-auth";
/**
 * Represents different properties of connection string
 * using format "/endpoint=(.*);accesskey=(.*)".
 * @hidden
 */
export interface EndpointCredential {
    /**
     * The endpoint as string
     */
    endpoint: string;
    /**
     * The access key represented as a KeyCredential object
     */
    credential: KeyCredential;
}
/**
 * Returns an EndpointCredential to easily access properties of the connection string.
 * @hidden
 *
 * @param connectionString - The connection string to parse
 * @returns Object to access the endpoint and the credentials
 */
export declare const parseConnectionString: (connectionString: string) => EndpointCredential;
//# sourceMappingURL=connectionString.d.ts.map