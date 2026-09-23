# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -403,9 +403,9 @@
         extensionResourceId,
         int,
         min,
         max,
-        length,
+        length_2 as length,
         empty,
         first,
         last,
         contains,
@@ -538,9 +538,9 @@
 // @public (undocumented)
 function lastIndexOf(value: ExpressionOrValue<string>, searchString: ExpressionOrValue<string>): Expression<number>;
 
 // @public (undocumented)
-function length(value: ExpressionOrValue<unknown>): Expression<number>;
+function length_2(value: ExpressionOrValue<unknown>): Expression<number>;
 
 // @public (undocumented)
 function lt(left: ExpressionOrValue<unknown>, right: ExpressionOrValue<unknown>): Expression<boolean>;
 

```