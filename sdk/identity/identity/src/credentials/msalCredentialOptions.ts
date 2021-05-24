// Copyright (c) Microsoft Corporation
// Licensed under the MIT license

import { TokenCachePersistenceOptions } from "../msal/nodeFlows/tokenCachePersistenceOptions";

/**
 * Shared configuration options for credentials based on MSAL Node.
 */
export interface MsalCredentialOptions {
  /**
   * Options to provide to the persistence layer (if one is available) when storing credentials.
   * 
   * You must first register a persistence provider as an extension. See the `@azure/identity-persistence` package on NPM.
   * 
   * Example:
   * 
   * ```typescript
   * import persistence from "@azure/identity-persistence";
   * import { useIdentityExtension, DeviceCodeCredential } from "@azure/identity";
   * 
   * useIdentityExtension(persistence);
   * 
   * async function main() {
   *   const credential = new DeviceCodeCredential({
   *     tokenCachePersistenceOptions: {
   *       name: "mycustomcachename"
   *     }
   *   });
   * }
   * 
   * main().catch((error) => {
   *   console.error("An error occured:", error);
   *   process.exit(1);
   * });
   * ```
-  */
  tokenCachePersistenceOptions?: TokenCachePersistenceOptions;
}
