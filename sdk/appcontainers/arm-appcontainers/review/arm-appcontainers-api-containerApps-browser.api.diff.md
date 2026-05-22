# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -86,9 +86,10 @@
 // @public
 export function start(context: ContainerAppsAPIContext, resourceGroupName: string, containerAppName: string, options?: ContainerAppsStartOptionalParams): PollerLike<OperationState<ContainerApp>, ContainerApp>;
 
 // @public
-export function stop(context: ContainerAppsAPIContext, resourceGroupName: string, containerAppName: string, options?: ContainerAppsStopOptionalParams): PollerLike<OperationState<ContainerApp>, ContainerApp>;
+function stop_2(context: ContainerAppsAPIContext, resourceGroupName: string, containerAppName: string, options?: ContainerAppsStopOptionalParams): PollerLike<OperationState<ContainerApp>, ContainerApp>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: ContainerAppsAPIContext, resourceGroupName: string, containerAppName: string, containerAppEnvelope: ContainerApp, options?: ContainerAppsUpdateOptionalParams): PollerLike<OperationState<ContainerApp>, ContainerApp>;
 

```