# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -279,9 +279,9 @@
 
 // @public
 export interface LinkedSubscriptionParameter {
     linkedSubscriptionId: string;
-    location: Location;
+    location: Location_2;
     registrationResourceId: string;
 }
 
 // @public
@@ -353,9 +353,10 @@
 // @public
 export type LinkedSubscriptionsUpdateResponse = LinkedSubscription;
 
 // @public
-export type Location = string;
+type Location_2 = string;
+export { Location_2 as Location }
 
 // @public
 export interface MarketplaceProductLogUpdate {
     readonly details?: string;
@@ -539,9 +540,9 @@
 }
 
 // @public
 export interface RegistrationParameter {
-    location: Location;
+    location: Location_2;
     registrationToken: string;
 }
 
 // @public
@@ -642,9 +643,9 @@
 export interface TrackedResource {
     etag?: string;
     readonly id?: string;
     readonly kind?: string;
-    location: Location;
+    location: Location_2;
     readonly name?: string;
     readonly systemData?: SystemData;
     tags?: {
         [propertyName: string]: string;

```