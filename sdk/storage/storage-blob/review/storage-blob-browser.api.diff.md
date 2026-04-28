# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -12,9 +12,9 @@
 import type { CancelOnProgress } from '@azure/core-lro';
 import * as coreClient from '@azure/core-client';
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
-import { Credential } from '@azure/storage-common';
+import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
 import { CredentialPolicyCreator } from '@azure/storage-common';
 import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
 import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
@@ -1557,9 +1557,9 @@
     abortSignal?: AbortSignalLike;
     conditions?: LeaseAccessConditions;
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
-    range?: Range;
+    range?: Range_2;
     sourceAuthorization?: HttpAuthorization;
     sourceContentCrc64?: Uint8Array;
     sourceContentMD5?: Uint8Array;
     sourceCustomerProvidedKey?: CpkInfo;
@@ -2180,9 +2180,9 @@
     encryptionKey?: string;
     encryptionKeySha256?: string;
 }
 
-export { Credential }
+export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
 export { CredentialPolicyCreator }
@@ -2787,10 +2787,10 @@
 export type PageBlobUploadPagesResponse = WithResponse<PageBlobUploadPagesHeaders, PageBlobUploadPagesHeaders>;
 
 // @public
 export interface PageList {
-    clearRange?: Range[];
-    pageRange?: Range[];
+    clearRange?: Range_2[];
+    pageRange?: Range_2[];
 }
 
 // @public
 export interface PageListInternal {
@@ -2887,12 +2887,13 @@
 // @public
 export type PublicAccessType = "container" | "blob";
 
 // @public
-export interface Range {
+interface Range_2 {
     count?: number;
     offset: number;
 }
+export { Range_2 as Range }
 
 // @public
 export type RehydratePriority = "High" | "Standard";
 

```