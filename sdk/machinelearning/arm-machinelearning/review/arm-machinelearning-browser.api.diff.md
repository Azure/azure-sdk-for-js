# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1613,9 +1613,9 @@
     endpoints?: Endpoint[];
     environmentVariables?: {
         [propertyName: string]: EnvironmentVariable;
     };
-    image?: Image;
+    image?: Image_2;
     name?: string;
     volumes?: VolumeDefinition[];
 }
 
@@ -3093,13 +3093,14 @@
     idleTimeBeforeShutdown?: string;
 }
 
 // @public
-export interface Image {
+interface Image_2 {
     [property: string]: any;
     reference?: string;
     type?: ImageType;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageClassification extends ImageClassificationBase, AutoMLVertical {
     primaryMetric?: ClassificationPrimaryMetrics;
@@ -3494,9 +3495,10 @@
 // @public
 export type JobType = string;
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export enum KnownActionType {
     Internal = "Internal"
@@ -6518,9 +6520,9 @@
 export type ReferenceType = string;
 
 // @public (undocumented)
 export interface RegenerateEndpointKeysRequest {
-    keyType: KeyType;
+    keyType: KeyType_2;
     keyValue?: string;
 }
 
 // @public

```