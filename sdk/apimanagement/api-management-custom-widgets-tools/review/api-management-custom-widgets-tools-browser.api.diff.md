# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -44,10 +44,10 @@
     rootLocal?: string;
     interactiveBrowserCredentialOptions?: InteractiveBrowserCredentialNodeOptions;
 };
 
-// @public
-export function deployNodeJS(serviceInformation: ServiceInformation, name: string, fallbackConfigPath?: string, { rootLocal, interactiveBrowserCredentialOptions, }?: DeployConfig): Promise<void>;
+// @public (undocumented)
+export function deployNodeJS(_serviceInformation: unknown, _name: string, _fallbackConfigPath: string): Promise<void>;
 
 // @public
 export interface EditorData<Values extends ValuesCommon> extends PortalData {
     values: Partial<Values>;

```