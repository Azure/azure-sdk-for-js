# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -212,11 +212,12 @@
 // @public
 export type CreatedByType = string;
 
 // @public
-export interface Credential extends TrackedResource {
+interface Credential_2 extends TrackedResource {
     properties?: CredentialProperties;
 }
+export { Credential_2 as Credential }
 
 // @public
 export interface CredentialProperties {
     readonly provisioningState?: ProvisioningState;

```