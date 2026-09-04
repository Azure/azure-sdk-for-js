# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -149,12 +149,13 @@
     type: "EventHub";
 }
 
 // @public
-export interface EventListener {
+interface EventListener_2 {
     endpoint: EventListenerEndpointUnion;
     filter: EventListenerFilterUnion;
 }
+export { EventListener_2 as EventListener }
 
 // @public
 export interface EventListenerEndpoint {
     // (undocumented)
@@ -204,9 +205,10 @@
 
 export { isRestError }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownACLAction {
     Allow = "Allow",
@@ -517,9 +519,9 @@
 }
 
 // @public
 export interface RegenerateKeyParameters {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface Replica extends TrackedResource {
@@ -865,9 +867,9 @@
 export interface WebPubSubHubProperties {
     anonymousConnectPolicy?: string;
     chat?: ChatSettings;
     eventHandlers?: EventHandler[];
-    eventListeners?: EventListener[];
+    eventListeners?: EventListener_2[];
     webSocketKeepAliveIntervalInSeconds?: number;
 }
 
 // @public

```