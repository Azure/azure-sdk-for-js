# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -27,9 +27,10 @@
 // @public
 export function start(context: OperationalInsightsManagementContext, resourceGroupName: string, workspaceName: string, summaryLogsName: string, options?: SummaryLogsStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function stop(context: OperationalInsightsManagementContext, resourceGroupName: string, workspaceName: string, summaryLogsName: string, options?: SummaryLogsStopOptionalParams): Promise<void>;
+function stop_2(context: OperationalInsightsManagementContext, resourceGroupName: string, workspaceName: string, summaryLogsName: string, options?: SummaryLogsStopOptionalParams): Promise<void>;
+export { stop_2 as stop }
 
 // @public
 export interface SummaryLogsCreateOrUpdateOptionalParams extends OperationOptions {
     updateIntervalInMs?: number;

```