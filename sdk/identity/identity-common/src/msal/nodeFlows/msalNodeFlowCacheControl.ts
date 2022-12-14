import * as msalCommon from "@azure/msal-common";
import { TokenCachePersistenceOptions } from "./tokenCachePersistenceOptions";

/**
 * The current persistence provider, undefined by default.
 * @internal
 */
let persistenceProvider:
  | ((options?: TokenCachePersistenceOptions) => Promise<msalCommon.ICachePlugin>)
  | undefined = undefined;

/**
 * An object that allows setting the persistence provider.
 * @internal
 */
export const msalNodeFlowCacheControl = {
  setPersistence(pluginProvider: Exclude<typeof persistenceProvider, undefined>): void {
    persistenceProvider = pluginProvider;
  },
};