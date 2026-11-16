# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -66,13 +66,14 @@
 // @public
 export function randomUUID(): string;
 
 // @public
-export class Sanitizer {
+class Sanitizer_2 {
     constructor(input?: SanitizerOptions);
     sanitize(obj: unknown): string;
     sanitizeUrl(value: string): string;
 }
+export { Sanitizer_2 as Sanitizer }
 
 // @public
 export interface SanitizerOptions {
     additionalAllowedHeaderNames?: string[];

```