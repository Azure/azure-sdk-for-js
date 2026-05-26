# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -161,9 +161,10 @@
 // @public
 export type HybridConnectionsRegenerateKeysResponse = AccessKeys;
 
 // @public
-export type KeyType = "PrimaryKey" | "SecondaryKey";
+type KeyType_2 = "PrimaryKey" | "SecondaryKey";
+export { KeyType_2 as KeyType }
 
 // @public
 export interface Namespaces {
     beginCreateOrUpdate(resourceGroupName: string, namespaceName: string, parameters: RelayNamespace, options?: NamespacesCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<NamespacesCreateOrUpdateResponse>, NamespacesCreateOrUpdateResponse>>;
@@ -336,9 +337,9 @@
 
 // @public
 export interface RegenerateAccessKeyParameters {
     key?: string;
-    keyType: KeyType;
+    keyType: KeyType_2;
 }
 
 // @public (undocumented)
 export class RelayAPI extends coreClient.ServiceClient {

```