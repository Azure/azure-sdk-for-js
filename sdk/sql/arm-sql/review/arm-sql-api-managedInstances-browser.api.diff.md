# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -126,9 +126,10 @@
 // @public
 export function start(context: SqlManagementContext, resourceGroupName: string, managedInstanceName: string, options?: ManagedInstancesStartOptionalParams): PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
 
 // @public
-export function stop(context: SqlManagementContext, resourceGroupName: string, managedInstanceName: string, options?: ManagedInstancesStopOptionalParams): PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
+function stop_2(context: SqlManagementContext, resourceGroupName: string, managedInstanceName: string, options?: ManagedInstancesStopOptionalParams): PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: SqlManagementContext, resourceGroupName: string, managedInstanceName: string, parameters: ManagedInstanceUpdate, options?: ManagedInstancesUpdateOptionalParams): PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
 

```