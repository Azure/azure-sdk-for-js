// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CachePluginControl } from "../../../identity/src/plugins/provider";
import { VSCodeCredentialFinder } from "../visualStudioCodeCredentialPlugin";

/**
 * The type of an Azure Identity plugin, a function accepting a plugin
 * context.
 */
export type IdentityPlugin = (context: unknown) => void;

/**
 * Plugin context entries for controlling VisualStudioCodeCredential.
 */
export interface VisualStudioCodeCredentialControl {
  setVsCodeCredentialFinder(finder: VSCodeCredentialFinder): void;
}

/**
 * Context options passed to a plugin during initialization.
 *
 * Plugin authors are responsible for casting their plugin context values
 * to this type.
 *
 * @internal
 */
export interface AzurePluginContext {
  cachePluginControl: CachePluginControl;
  vsCodeCredentialControl: VisualStudioCodeCredentialControl;
}
