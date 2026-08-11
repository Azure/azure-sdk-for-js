# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -143,12 +143,13 @@
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
@@ -198,9 +199,10 @@
 
 export { isRestError }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownACLAction {
     Allow = "Allow",
@@ -498,9 +500,9 @@
 }
 
 // @public
 export interface RegenerateKeyParameters {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface Replica extends TrackedResource {
@@ -845,9 +847,9 @@
 // @public
 export interface WebPubSubHubProperties {
     anonymousConnectPolicy?: string;
     eventHandlers?: EventHandler[];
-    eventListeners?: EventListener[];
+    eventListeners?: EventListener_2[];
     webSocketKeepAliveIntervalInSeconds?: number;
 }
 
 // @public

```