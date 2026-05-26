# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -86,12 +86,13 @@
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
     type: "EventHub";
@@ -130,9 +131,10 @@
     value?: string;
 }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownACLAction {
     Allow = "Allow",
@@ -406,9 +408,9 @@
 }
 
 // @public
 export interface RegenerateKeyParameters {
-    keyType?: KeyType;
+    keyType?: KeyType_2;
 }
 
 // @public
 export interface Replica extends TrackedResource {
@@ -748,9 +750,9 @@
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