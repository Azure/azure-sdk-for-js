# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -120,9 +120,10 @@
 // @public
 export function start(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, integrationRuntimeName: string, options?: IntegrationRuntimesStartOptionalParams): PollerLike<OperationState<IntegrationRuntimeStatusResponse>, IntegrationRuntimeStatusResponse>;
 
 // @public
-export function stop(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, integrationRuntimeName: string, options?: IntegrationRuntimesStopOptionalParams): PollerLike<OperationState<void>, void>;
+function stop_2(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, integrationRuntimeName: string, options?: IntegrationRuntimesStopOptionalParams): PollerLike<OperationState<void>, void>;
+export { stop_2 as stop }
 
 // @public
 export function syncCredentials(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, integrationRuntimeName: string, options?: IntegrationRuntimesSyncCredentialsOptionalParams): Promise<void>;
 

```