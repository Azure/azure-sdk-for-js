# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -32,9 +32,10 @@
 export interface NewRegionFrontloadReleaseStopOptionalParams extends OperationOptions {
 }
 
 // @public
-export function stop(context: ProviderHubContext, providerNamespace: string, releaseName: string, options?: NewRegionFrontloadReleaseStopOptionalParams): Promise<void>;
+function stop_2(context: ProviderHubContext, providerNamespace: string, releaseName: string, options?: NewRegionFrontloadReleaseStopOptionalParams): Promise<void>;
+export { stop_2 as stop }
 
 // (No @packageDocumentation comment for this package)
 
 ```

```