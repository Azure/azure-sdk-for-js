# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -402,9 +402,9 @@
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
@@ -537,9 +537,9 @@
 // @public
 function lastIndexOf(value: ExpressionOrValue<string>, searchString: ExpressionOrValue<string>): Expression<number>;
 
 // @public
-function length(value: ExpressionOrValue<unknown>): Expression<number>;
+function length_2(value: ExpressionOrValue<unknown>): Expression<number>;
 
 // @public
 function lt(left: ExpressionOrValue<unknown>, right: ExpressionOrValue<unknown>): Expression<boolean>;
 

```