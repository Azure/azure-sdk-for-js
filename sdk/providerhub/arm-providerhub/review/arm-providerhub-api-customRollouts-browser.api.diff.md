# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -42,9 +42,10 @@
 // @public
 export function listByProviderRegistration(context: ProviderHubContext, providerNamespace: string, options?: CustomRolloutsListByProviderRegistrationOptionalParams): PagedAsyncIterableIterator<CustomRollout>;
 
 // @public
-export function stop(context: ProviderHubContext, providerNamespace: string, rolloutName: string, options?: CustomRolloutsStopOptionalParams): Promise<void>;
+function stop_2(context: ProviderHubContext, providerNamespace: string, rolloutName: string, options?: CustomRolloutsStopOptionalParams): Promise<void>;
+export { stop_2 as stop }
 
 // (No @packageDocumentation comment for this package)
 
 ```

```