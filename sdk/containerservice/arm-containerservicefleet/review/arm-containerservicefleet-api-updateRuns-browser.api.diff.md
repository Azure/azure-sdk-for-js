# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -27,9 +27,10 @@
 // @public
 export function start(context: ContainerServiceFleetContext, resourceGroupName: string, fleetName: string, updateRunName: string, options?: UpdateRunsStartOptionalParams): PollerLike<OperationState<UpdateRun>, UpdateRun>;
 
 // @public
-export function stop(context: ContainerServiceFleetContext, resourceGroupName: string, fleetName: string, updateRunName: string, options?: UpdateRunsStopOptionalParams): PollerLike<OperationState<UpdateRun>, UpdateRun>;
+function stop_2(context: ContainerServiceFleetContext, resourceGroupName: string, fleetName: string, updateRunName: string, options?: UpdateRunsStopOptionalParams): PollerLike<OperationState<UpdateRun>, UpdateRun>;
+export { stop_2 as stop }
 
 // @public
 export interface UpdateRunsCreateOrUpdateOptionalParams extends OperationOptions {
     ifMatch?: string;

```