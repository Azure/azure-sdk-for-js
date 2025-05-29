import { type KeyCredential, type TokenCredential } from "@azure/core-auth";
/**
 * Checks whether a value is a KeyCredential.
 *
 * @param credential - The credential being checked.
 */
export declare const isKeyCredential: (credential: unknown) => credential is KeyCredential;
/**
 * The URL and credential from parsing the arguments of a communication client.
 * @hidden
 */
export type UrlWithCredential = {
    url: string;
    credential: TokenCredential | KeyCredential;
};
/**
 * Parses arguments passed to a communication client.
 * @hidden
 */
export declare const parseClientArguments: (connectionStringOrUrl: string, credentialOrOptions?: unknown) => UrlWithCredential;
//# sourceMappingURL=clientArguments.d.ts.map