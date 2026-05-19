# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -153,9 +153,9 @@
 // @public
 export function getContinuationToken(page: unknown): string | undefined;
 
 // @public (undocumented)
-export interface JsonWebKey {
+interface JsonWebKey_2 {
     alg?: string;
     crv?: string;
     d?: string;
     dp?: string;
@@ -172,12 +172,13 @@
     x?: string;
     x5C?: string[];
     y?: string;
 }
+export { JsonWebKey_2 as JsonWebKey }
 
 // @public (undocumented)
 export interface JsonWebKeySet {
-    keys?: JsonWebKey[];
+    keys?: JsonWebKey_2[];
 }
 
 // @public
 export enum KnownAttestationServiceStatus {

```