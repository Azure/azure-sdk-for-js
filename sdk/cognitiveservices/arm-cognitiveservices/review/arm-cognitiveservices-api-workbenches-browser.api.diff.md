# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -27,9 +27,10 @@
 // @public
 export function start(context: CognitiveServicesManagementContext, resourceGroupName: string, accountName: string, projectName: string, workbenchName: string, options?: WorkbenchesStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function stop(context: CognitiveServicesManagementContext, resourceGroupName: string, accountName: string, projectName: string, workbenchName: string, options?: WorkbenchesStopOptionalParams): PollerLike<OperationState<void>, void>;
+function stop_2(context: CognitiveServicesManagementContext, resourceGroupName: string, accountName: string, projectName: string, workbenchName: string, options?: WorkbenchesStopOptionalParams): PollerLike<OperationState<void>, void>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: CognitiveServicesManagementContext, resourceGroupName: string, accountName: string, projectName: string, workbenchName: string, properties: Workbench, options?: WorkbenchesUpdateOptionalParams): PollerLike<OperationState<Workbench>, Workbench>;
 

```