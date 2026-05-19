# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -94,9 +94,10 @@
 // @public
 export function start(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStartOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
 
 // @public
-export function stop(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
+function stop_2(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, properties: UpdateSAPVirtualInstanceRequest, options?: SAPVirtualInstancesUpdateOptionalParams): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
 

```