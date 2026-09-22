# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -406,9 +406,9 @@
 // @public
 export interface EntityTypeDefinition extends MetadataDefinitionBase {
     apiEntitySetName?: string;
     entityType?: EntityTypes;
-    fields?: PropertyDefinition[];
+    fields?: PropertyDefinition_2[];
     instancesCount?: number;
     readonly lastChangedUtc?: Date;
     readonly provisioningState?: ProvisioningStates;
     schemaItemTypeLink?: string;
@@ -575,9 +575,9 @@
     displayName?: {
         [propertyName: string]: string;
     };
     entityType?: EntityTypes;
-    fields?: PropertyDefinition[];
+    fields?: PropertyDefinition_2[];
     readonly idPropertiesDefaultDataSourceId?: number;
     idPropertyNames?: string[];
     instancesCount?: number;
     isActivity?: boolean;
@@ -1226,9 +1226,9 @@
     displayName?: {
         [propertyName: string]: string;
     };
     entityType?: EntityTypes;
-    fields?: PropertyDefinition[];
+    fields?: PropertyDefinition_2[];
     instancesCount?: number;
     largeImage?: string;
     readonly lastChangedUtc?: Date;
     localizedAttributes?: {
@@ -1309,9 +1309,9 @@
     strongIds?: StrongId[];
 }
 
 // @public
-export interface PropertyDefinition {
+interface PropertyDefinition_2 {
     arrayValueSeparator?: string;
     readonly dataSourcePrecedenceRules?: DataSourcePrecedence[];
     enumValidValues?: ProfileEnumValidValuesFormat[];
     fieldName: string;
@@ -1327,8 +1327,9 @@
     maxLength?: number;
     propertyId?: string;
     schemaItemPropLink?: string;
 }
+export { PropertyDefinition_2 as PropertyDefinition }
 
 // @public
 export type ProvisioningStates = string;
 
@@ -1432,9 +1433,9 @@
     displayName?: {
         [propertyName: string]: string;
     };
     expiryDateTimeUtc?: Date;
-    fields?: PropertyDefinition[];
+    fields?: PropertyDefinition_2[];
     lookupMappings?: RelationshipTypeMapping[];
     profileType?: string;
     readonly provisioningState?: ProvisioningStates;
     relatedProfileType?: string;

```