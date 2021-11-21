// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCachePersistenceOptions } from "../msal/nodeFlows/tokenCachePersistenceOptions";

/**
 * Shared configuration options for credentials that support persistent token
 * caching.
 */
export interface CredentialPersistenceOptions {
  /**
   * Options to provide to the persistence layer (if one is available) when
   * storing credentials.
   *
   * You must first register a persistence provider plugin. See the
   * `@azure/identity-cache-persistence` package on NPM.
   *
   * Example:
   *
   * ```javascript
   * import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
   * import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";
   *
   * useIdentityPlugin(cachePersistencePlugin);
   *
   * async function main() {
   *   const credential = new DeviceCodeCredential({
   *     tokenCachePersistenceOptions: {
   *       enabled: true
   *     }
   *   });
   * }
   *
   * main().catch((error) => {
   *   console.error("An error occurred:", error);
   *   process.exit(1);
   * });
   * ```
   */

  tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
}
