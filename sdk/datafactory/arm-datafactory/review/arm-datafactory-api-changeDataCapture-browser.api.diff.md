# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -52,12 +52,14 @@
 // @public
 export function start(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, changeDataCaptureName: string, options?: ChangeDataCaptureStartOptionalParams): Promise<void>;
 
 // @public
-export function status(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, changeDataCaptureName: string, options?: ChangeDataCaptureStatusOptionalParams): Promise<ChangeDataCaptureStatusResponse>;
+function status_2(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, changeDataCaptureName: string, options?: ChangeDataCaptureStatusOptionalParams): Promise<ChangeDataCaptureStatusResponse>;
+export { status_2 as status }
 
 // @public
-export function stop(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, changeDataCaptureName: string, options?: ChangeDataCaptureStopOptionalParams): Promise<void>;
+function stop_2(context: DataFactoryManagementContext, resourceGroupName: string, factoryName: string, changeDataCaptureName: string, options?: ChangeDataCaptureStopOptionalParams): Promise<void>;
+export { stop_2 as stop }
 
 // (No @packageDocumentation comment for this package)
 
 ```

```