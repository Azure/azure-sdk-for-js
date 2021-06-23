// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { VSCodeCredentialFinder } from "../credentials/visualStudioCodeCredentialExtension";
import { TokenCachePersistenceOptions } from "../msal/nodeFlows/tokenCachePersistenceOptions";

/**
 * The type of an Azure Identity Extension, a function accepting an extension
 * context.
 */
export type IdentityExtension = (context: unknown) => void;

/**
 * Extension context entries for controlling cache plugins.
 */
export interface CachePluginControl {
  setPersistence(
    persistenceFactory: (
      options?: TokenCachePersistenceOptions
    ) => Promise<import("@azure/msal-common").ICachePlugin>
  ): void;
}

/**
 * Extension context entries for controlling VisualStudioCodeCredential.
 */
export interface VisualStudioCodeCredentialControl {
  setVsCodeCredentialFinder(finder: VSCodeCredentialFinder): void;
}

/**
 * Context options passed to an extension during initialization.
 *
 * Extension authors are responsible for casting their extension context values
 * to this type.
 *
 * @internal
 */
export interface AzureExtensionContext {
  cachePluginControl: CachePluginControl;
  vsCodeCredentialControl: VisualStudioCodeCredentialControl;
}
