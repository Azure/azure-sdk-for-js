# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- import type { InstrumentationModuleDefinition } from '@opentelemetry/instrumentation';
+ 
- 
+ // @public
- // @public
+ export class AzureSdkInstrumentation extends InstrumentationBase {
- export class AzureSdkInstrumentation extends InstrumentationBase {
+     constructor(options?: AzureSdkInstrumentationOptions);
-     constructor(options?: AzureSdkInstrumentationOptions);
+     // (undocumented)
-     protected init(): void | InstrumentationModuleDefinition | InstrumentationModuleDefinition[];
+     disable(): void;
- }
+     enable(): void;
- 
+     protected init(): void;
- // @public
+ }
- export interface AzureSdkInstrumentationOptions extends InstrumentationConfig {
+ 
- }
+ // @public
- 
+ export interface AzureSdkInstrumentationOptions extends InstrumentationConfig {
- // @public
+ }
- export function createAzureSdkInstrumentation(options?: AzureSdkInstrumentationOptions): Instrumentation;
+ 
- 
+ // @public
- // @public
+ export function createAzureSdkInstrumentation(options?: AzureSdkInstrumentationOptions): Instrumentation;
- export const logger: AzureLogger;
+ 
- 
+ // @public
- // (No @packageDocumentation comment for this package)
+ export const logger: AzureLogger;
- ```
+ // (No @packageDocumentation comment for this package)
- 
+ 
- 
+ ```
```