# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1719,9 +1719,9 @@
     additionalProperties?: Record<string, any>;
     docker?: Docker;
     endpoints?: Endpoint[];
     environmentVariables?: Record<string, EnvironmentVariable>;
-    image?: Image;
+    image?: Image_2;
     kernel?: JupyterKernelConfig;
     name?: string;
     volumes?: VolumeDefinition[];
 }
@@ -3234,14 +3234,15 @@
     idleTimeBeforeShutdown?: string;
 }
 
 // @public
-export interface Image {
+interface Image_2 {
     additionalProperties?: Record<string, any>;
     reference?: string;
     type?: ImageType;
     version?: string;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageClassification extends AutoMLVertical {
     limitSettings: ImageLimitSettings;
@@ -3864,9 +3865,10 @@
     language?: string;
 }
 
 // @public
-export type KeyType = string;
+type KeyType_2 = string;
+export { KeyType_2 as KeyType }
 
 // @public
 export interface KeyVaultProperties {
     identityClientId?: string;
@@ -7247,9 +7249,9 @@
 export type ReferenceType = string;
 
 // @public
 export interface RegenerateEndpointKeysRequest {
-    keyType: KeyType;
+    keyType: KeyType_2;
     keyValue?: string;
 }
 
 // @public

```