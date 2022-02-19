import { TokenCachePersistenceOptions } from "../../../identity-common/src/tokenCachePersistenceOptions";

/**
 * Plugin context entries for controlling cache plugins.
 */
export interface CachePluginControl {
  setPersistence(
    persistenceFactory: (
      options?: TokenCachePersistenceOptions
    ) => Promise<import("@azure/msal-common").ICachePlugin>
  ): void;
}
