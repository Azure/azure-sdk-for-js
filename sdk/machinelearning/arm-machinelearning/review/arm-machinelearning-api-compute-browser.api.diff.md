# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -80,9 +80,10 @@
 // @public
 export function start(context: AzureMachineLearningServicesManagementContext, resourceGroupName: string, workspaceName: string, computeName: string, options?: ComputeStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function stop(context: AzureMachineLearningServicesManagementContext, resourceGroupName: string, workspaceName: string, computeName: string, options?: ComputeStopOptionalParams): PollerLike<OperationState<void>, void>;
+function stop_2(context: AzureMachineLearningServicesManagementContext, resourceGroupName: string, workspaceName: string, computeName: string, options?: ComputeStopOptionalParams): PollerLike<OperationState<void>, void>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: AzureMachineLearningServicesManagementContext, resourceGroupName: string, workspaceName: string, computeName: string, parameters: ClusterUpdateParameters, options?: ComputeUpdateOptionalParams): PollerLike<OperationState<ComputeResource>, ComputeResource>;
 

```