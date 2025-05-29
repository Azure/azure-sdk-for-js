import type { MsalPersistenceOptions } from "./platforms.js";
import type { IPersistence as Persistence } from "@azure/msal-node-extensions";
import type { ICachePlugin as CachePlugin } from "@azure/msal-node";
/**
 * This is used to gain access to the underlying Persistence instance, which we use for testing
 *
 * @returns a raw persistence instance
 * @internal
 */
export declare function createPersistence(options: MsalPersistenceOptions): Promise<Persistence>;
export declare function createPersistenceCachePlugin(options?: MsalPersistenceOptions): Promise<CachePlugin>;
//# sourceMappingURL=provider.d.ts.map