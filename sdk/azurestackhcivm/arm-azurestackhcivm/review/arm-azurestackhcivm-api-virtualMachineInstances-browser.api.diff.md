# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -33,9 +33,10 @@
 // @public
 export function start(context: AzureStackHCIVMManagementContext, resourceUri: string, options?: VirtualMachineInstancesStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function stop(context: AzureStackHCIVMManagementContext, resourceUri: string, options?: VirtualMachineInstancesStopOptionalParams): PollerLike<OperationState<void>, void>;
+function stop_2(context: AzureStackHCIVMManagementContext, resourceUri: string, options?: VirtualMachineInstancesStopOptionalParams): PollerLike<OperationState<void>, void>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: AzureStackHCIVMManagementContext, resourceUri: string, properties: VirtualMachineInstanceUpdateRequest, options?: VirtualMachineInstancesUpdateOptionalParams): PollerLike<OperationState<VirtualMachineInstance>, VirtualMachineInstance>;
 

```