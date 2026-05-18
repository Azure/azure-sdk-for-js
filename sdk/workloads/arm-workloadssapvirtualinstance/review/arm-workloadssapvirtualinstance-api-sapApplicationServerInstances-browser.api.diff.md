# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -58,9 +58,10 @@
 // @public
 export function start(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesStartOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
 
 // @public
-export function stop(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
+function stop_2(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, options?: SAPApplicationServerInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: WorkloadsContext, resourceGroupName: string, sapVirtualInstanceName: string, applicationInstanceName: string, properties: UpdateSAPApplicationInstanceRequest, options?: SAPApplicationServerInstancesUpdateOptionalParams): Promise<SAPApplicationServerInstance>;
 

```