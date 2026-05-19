# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -81,9 +81,10 @@
 // @public
 export function start(context: PostgreSQLManagementFlexibleServerContext, resourceGroupName: string, serverName: string, options?: ServersStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function stop(context: PostgreSQLManagementFlexibleServerContext, resourceGroupName: string, serverName: string, options?: ServersStopOptionalParams): PollerLike<OperationState<void>, void>;
+function stop_2(context: PostgreSQLManagementFlexibleServerContext, resourceGroupName: string, serverName: string, options?: ServersStopOptionalParams): PollerLike<OperationState<void>, void>;
+export { stop_2 as stop }
 
 // @public
 export function update(context: PostgreSQLManagementFlexibleServerContext, resourceGroupName: string, serverName: string, parameters: ServerForPatch, options?: ServersUpdateOptionalParams): PollerLike<OperationState<Server>, Server>;
 

```