# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -55,9 +55,10 @@
 // @public
 export function start(context: CognitiveServicesManagementContext, resourceGroupName: string, accountName: string, projectName: string, appName: string, deploymentName: string, options?: AgentDeploymentsStartOptionalParams): Promise<void>;
 
 // @public
-export function stop(context: CognitiveServicesManagementContext, resourceGroupName: string, accountName: string, projectName: string, appName: string, deploymentName: string, options?: AgentDeploymentsStopOptionalParams): Promise<void>;
+function stop_2(context: CognitiveServicesManagementContext, resourceGroupName: string, accountName: string, projectName: string, appName: string, deploymentName: string, options?: AgentDeploymentsStopOptionalParams): Promise<void>;
+export { stop_2 as stop }
 
 // (No @packageDocumentation comment for this package)
 
 ```

```