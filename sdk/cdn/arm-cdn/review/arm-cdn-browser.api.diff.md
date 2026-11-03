# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -572,17 +572,18 @@
 }
 
 // @public
 export interface AfdUrlSigningActionParameters {
-    algorithm?: Algorithm;
+    algorithm?: Algorithm_2;
     keyGroupReference: ResourceReference;
     parameterNameOverride?: UrlSigningParamIdentifier[];
     // (undocumented)
     typeName: TypeName;
 }
 
 // @public
-export type Algorithm = string;
+type Algorithm_2 = string;
+export { Algorithm_2 as Algorithm }
 
 // @public
 export type AuthLocation = "Header";
 
@@ -4730,9 +4731,9 @@
 }
 
 // @public
 export interface UrlSigningActionParameters extends DeliveryRuleActionParameters {
-    algorithm?: Algorithm;
+    algorithm?: Algorithm_2;
     parameterNameOverride?: UrlSigningParamIdentifier[];
     // (undocumented)
     typeName: "DeliveryRuleUrlSigningActionParameters";
 }

```