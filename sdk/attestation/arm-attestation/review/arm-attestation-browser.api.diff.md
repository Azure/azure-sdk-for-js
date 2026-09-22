# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -148,9 +148,9 @@
 
 export { isRestError }
 
 // @public
-export interface JsonWebKey {
+interface JsonWebKey_2 {
     alg?: string;
     crv?: string;
     d?: string;
     dp?: string;
@@ -167,12 +167,13 @@
     x?: string;
     x5C?: string[];
     y?: string;
 }
+export { JsonWebKey_2 as JsonWebKey }
 
 // @public
 export interface JsonWebKeySet {
-    keys?: JsonWebKey[];
+    keys?: JsonWebKey_2[];
 }
 
 // @public
 export enum KnownAttestationServiceStatus {

```