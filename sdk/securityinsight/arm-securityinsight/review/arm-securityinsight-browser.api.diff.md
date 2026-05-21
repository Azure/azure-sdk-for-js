# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1114,9 +1114,9 @@
     descriptionMarkdown: string;
     graphQueries: CodelessUiConnectorConfigPropertiesGraphQueriesItem[];
     graphQueriesTableName: string;
     instructionSteps: CodelessUiConnectorConfigPropertiesInstructionStepsItem[];
-    permissions: Permissions;
+    permissions: Permissions_2;
     publisher: string;
     sampleQueries: CodelessUiConnectorConfigPropertiesSampleQueriesItem[];
     title: string;
 }
@@ -5263,12 +5263,13 @@
 // @public
 export type PermissionProviderScope = string;
 
 // @public
-export interface Permissions {
+interface Permissions_2 {
     customs?: PermissionsCustomsItem[];
     resourceProvider?: PermissionsResourceProviderItem[];
 }
+export { Permissions_2 as Permissions }
 
 // @public
 export interface PermissionsCustomsItem extends Customs {
 }

```