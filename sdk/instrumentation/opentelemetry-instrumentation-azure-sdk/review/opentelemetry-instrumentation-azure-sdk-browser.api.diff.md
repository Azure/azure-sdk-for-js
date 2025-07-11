# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -7,14 +7,16 @@
 import { AzureLogger } from '@azure/logger';
 import type { Instrumentation } from '@opentelemetry/instrumentation';
 import { InstrumentationBase } from '@opentelemetry/instrumentation';
 import type { InstrumentationConfig } from '@opentelemetry/instrumentation';
-import type { InstrumentationModuleDefinition } from '@opentelemetry/instrumentation';
 
 // @public
 export class AzureSdkInstrumentation extends InstrumentationBase {
     constructor(options?: AzureSdkInstrumentationOptions);
-    protected init(): void | InstrumentationModuleDefinition | InstrumentationModuleDefinition[];
+    // (undocumented)
+    disable(): void;
+    enable(): void;
+    protected init(): void;
 }
 
 // @public
 export interface AzureSdkInstrumentationOptions extends InstrumentationConfig {

```