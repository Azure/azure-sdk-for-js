# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -173,12 +173,13 @@
 // @public
 export type EventHubEndpointView = EventHubEndpointInput;
 
 // @public
-export interface EventListener {
+interface EventListener_2 {
     endpoint: EventListenerEndpoint;
     filter: EventListenerFilter;
 }
+export { EventListener_2 as EventListener }
 
 // @public
 export type EventListenerEndpoint = EventHubEndpoint;
 
@@ -203,9 +204,9 @@
 // @public
 export type EventListenerFilterView = EventNameFilterView;
 
 // @public
-export interface EventListenerInput extends InputOf<EventListener> {
+export interface EventListenerInput extends InputOf<EventListener_2> {
     endpoint: EventListenerEndpointInput;
     filter: EventListenerFilterInput;
 }
 
@@ -858,18 +859,18 @@
 export interface WebPubSubHubProperties {
     anonymousConnectPolicy?: string;
     chat?: ChatSettings;
     eventHandlers?: EventHandler[];
-    eventListeners?: EventListener[];
+    eventListeners?: EventListener_2[];
     webSocketKeepAliveIntervalInSeconds?: number;
 }
 
 // @public
 export interface WebPubSubHubPropertiesInput extends InputOf<WebPubSubHubProperties> {
     anonymousConnectPolicy?: ExpressionOrValue<string> | undefined;
     chat?: ChatSettingsInput | undefined;
     eventHandlers?: InputArray<EventHandlerInput, EventHandler[]> | undefined;
-    eventListeners?: InputArray<EventListenerInput, EventListener[]> | undefined;
+    eventListeners?: InputArray<EventListenerInput, EventListener_2[]> | undefined;
     webSocketKeepAliveIntervalInSeconds?: ExpressionOrValue<number> | undefined;
 }
 
 // @public (undocumented)

```