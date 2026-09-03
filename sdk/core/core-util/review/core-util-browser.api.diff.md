# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -44,13 +44,14 @@
     cleanupBeforeAbort?: () => void;
 }
 
 // @public
-export function delay(timeInMs: number, options?: DelayOptions): Promise<void>;
+export function delay(timeInMs: number, options?: DelayOptions_2): Promise<void>;
 
 // @public
-export interface DelayOptions extends AbortOptions {
+interface DelayOptions_2 extends AbortOptions {
 }
+export { DelayOptions_2 as DelayOptions }
 
 // @public
 export type EncodingType = "utf-8" | "base64" | "base64url" | "hex";
 

```