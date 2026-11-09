# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -239,9 +239,9 @@
 // @public
 type EventHubEndpointView = EventHubEndpointInput;
 
 // @public
-interface EventListener {
+interface EventListener_2 {
     endpoint: EventListenerEndpoint;
     filter: EventListenerFilter;
 }
 
@@ -269,9 +269,9 @@
 // @public
 type EventListenerFilterView = EventNameFilterView;
 
 // @public
-interface EventListenerInput extends InputOf<EventListener> {
+interface EventListenerInput extends InputOf<EventListener_2> {
     endpoint: EventListenerEndpointInput;
     filter: EventListenerFilterInput;
 }
 
@@ -1044,9 +1044,9 @@
         EventHubEndpoint,
         EventHubEndpointInput,
         EventHubEndpointView,
         eventHubEndpointShape,
-        EventListener,
+        EventListener_2 as EventListener,
         EventListenerInput,
         EventListenerView,
         eventListenerShape,
         EventListenerEndpoint,
@@ -1289,18 +1289,18 @@
 interface WebPubSubHubProperties {
     anonymousConnectPolicy?: string;
     chat?: ChatSettings;
     eventHandlers?: EventHandler[];
-    eventListeners?: EventListener[];
+    eventListeners?: EventListener_2[];
     webSocketKeepAliveIntervalInSeconds?: number;
 }
 
 // @public
 interface WebPubSubHubPropertiesInput extends InputOf<WebPubSubHubProperties> {
     anonymousConnectPolicy?: ExpressionOrValue<string> | undefined;
     chat?: ChatSettingsInput | undefined;
     eventHandlers?: InputArray<EventHandlerInput, EventHandler[]> | undefined;
-    eventListeners?: InputArray<EventListenerInput, EventListener[]> | undefined;
+    eventListeners?: InputArray<EventListenerInput, EventListener_2[]> | undefined;
     webSocketKeepAliveIntervalInSeconds?: ExpressionOrValue<number> | undefined;
 }
 
 // @public (undocumented)

```