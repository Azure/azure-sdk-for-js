import type { IPersistence as Persistence } from "@azure/msal-node-extensions";
import type { TokenCachePersistenceOptions } from "@azure/identity";
/**
 * Dictionary of values that we use as default as we discover, pick and enable the persistence layer.
 * @internal
 */
export declare const defaultMsalValues: {
    tokenCache: {
        name: string;
        directory: string;
    };
    keyRing: {
        label: string;
        schema: string;
        collection: string;
        attributes: {
            MsalClientID: string;
            "Microsoft.Developer.IdentityService": string;
        };
        service: string;
        account: string;
    };
    keyChain: {
        service: string;
        account: string;
    };
};
/**
 * Options that are used by the underlying MSAL cache provider.
 * @internal
 */
export type MsalPersistenceOptions = Omit<TokenCachePersistenceOptions, "enabled">;
/**
 * A function that returns a persistent token cache instance.
 * @internal
 */
type MsalPersistenceFactory = (options?: MsalPersistenceOptions) => Promise<Persistence>;
/**
 * Set of the platforms we attempt to deliver persistence on.
 *
 * - On Windows we use DPAPI.
 * - On OSX (Darwin), we try to use the system's Keychain, otherwise if the property `unsafeAllowUnencryptedStorage` is set to true, we use an unencrypted file.
 * - On Linux, we try to use the system's Keyring, otherwise if the property `unsafeAllowUnencryptedStorage` is set to true, we use an unencrypted file.
 *
 * Other platforms _are not supported_ at this time.
 *
 * @internal
 */
export declare const msalPersistencePlatforms: Partial<Record<NodeJS.Platform, MsalPersistenceFactory>>;
export {};
//# sourceMappingURL=platforms.d.ts.map