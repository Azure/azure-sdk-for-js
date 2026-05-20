# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -30,9 +30,10 @@
 // @public
 export function start(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, triggerName: string, options?: TriggersStartOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function stop(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, triggerName: string, options?: TriggersStopOptionalParams): PollerLike<OperationState<void>, void>;
+function stop_2(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, triggerName: string, options?: TriggersStopOptionalParams): PollerLike<OperationState<void>, void>;
+export { stop_2 as stop }
 
 // @public
 export function subscribeToEvents(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, triggerName: string, options?: TriggersSubscribeToEventsOptionalParams): PollerLike<OperationState<TriggerSubscriptionOperationStatus>, TriggerSubscriptionOperationStatus>;
 

```