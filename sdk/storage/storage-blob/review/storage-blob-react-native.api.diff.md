# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -3225,14 +3225,10 @@
     EXPONENTIAL = 0,
     FIXED = 1
 }
 
-// @public
-export class StorageSharedKeyCredential extends Credential_2 {
-    constructor(accountName: string, accountKey: string);
-    readonly accountName: string;
-    computeHMACSHA256(stringToSign: string): string;
-    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageSharedKeyCredentialPolicy;
+// @public (undocumented)
+export class StorageSharedKeyCredential {
 }
 
 // @public
 export class StorageSharedKeyCredentialPolicy extends CredentialPolicy {

```