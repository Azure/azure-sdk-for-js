import type { Instrumentation, InstrumentationConfig, InstrumentationModuleDefinition } from "@opentelemetry/instrumentation";
import { InstrumentationBase } from "@opentelemetry/instrumentation";
/**
 * Configuration options that can be passed to {@link createAzureSdkInstrumentation} function.
 */
export interface AzureSdkInstrumentationOptions extends InstrumentationConfig {
}
/**
 * The instrumentation module for the Azure SDK. Implements OpenTelemetry's {@link Instrumentation}.
 */
export declare class AzureSdkInstrumentation extends InstrumentationBase {
    constructor(options?: AzureSdkInstrumentationOptions);
    /**
     * Entrypoint for the module registration.
     *
     * @returns The patched \@azure/core-tracing module after setting its instrumenter.
     */
    protected init(): void | InstrumentationModuleDefinition | InstrumentationModuleDefinition[];
}
/**
 * Enables Azure SDK Instrumentation using OpenTelemetry for Azure SDK client libraries.
 *
 * When registered, any Azure data plane package will begin emitting tracing spans for internal calls
 * as well as network calls
 *
 * Example usage:
 * ```ts snippet:instrumentation_usage
 * import { registerInstrumentations } from "@opentelemetry/instrumentation";
 * import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
 *
 * registerInstrumentations({
 *   instrumentations: [createAzureSdkInstrumentation()],
 * });
 * ```
 *
 * @remarks
 *
 * As OpenTelemetry instrumentations rely on patching required modules, you should register
 * this instrumentation as early as possible and before loading any Azure Client Libraries.
 */
export declare function createAzureSdkInstrumentation(options?: AzureSdkInstrumentationOptions): Instrumentation;
//# sourceMappingURL=instrumentation.d.ts.map