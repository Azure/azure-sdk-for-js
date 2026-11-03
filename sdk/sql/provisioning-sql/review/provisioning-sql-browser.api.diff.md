# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -426,9 +426,9 @@
 // @public
 type CreateMode = string;
 
 // @public
-export class Credential extends Resource<"Microsoft.Sql/servers/jobAgents/credentials"> {
+class Credential_2 extends Resource<"Microsoft.Sql/servers/jobAgents/credentials"> {
     constructor(context: JobAgent, props?: (CredentialProps & {
         existing?: false;
     }) | (ExistingResourceProps & {
         existing: true;
@@ -448,8 +448,9 @@
     set properties(value: JobCredentialPropertiesInput | undefined);
     // (undocumented)
     static resourceType: "Microsoft.Sql/servers/jobAgents/credentials";
 }
+export { Credential_2 as Credential }
 
 // @public (undocumented)
 export interface CredentialProps {
     name?: ExpressionOrValue<string> | undefined;

```