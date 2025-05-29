import type { Instrumentation, InstrumentationConfig } from "@opentelemetry/instrumentation";
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
    /** In the browser we rely on overriding the `enable` function instead as there are no modules to patch. */
    protected init(): void;
    /**
     * Entrypoint for the module registration. Ensures the global instrumenter is set to use OpenTelemetry.
     */
    enable(): void;
    disable(): void;
}
/**
 * Enables Azure SDK Instrumentation using OpenTelemetry for Azure SDK client libraries.
 *
 * When registered, any Azure data plane package will begin emitting tracing spans for internal calls
 * as well as network calls
 *
 * Example usage:
 * ```ts
 * const openTelemetryInstrumentation = require("@opentelemetry/instrumentation");
 * openTelemetryInstrumentation.registerInstrumentations({
 *   instrumentations: [createAzureSdkInstrumentation()],
 * })
 * ```
 */
export declare function createAzureSdkInstrumentation(options?: AzureSdkInstrumentationOptions): Instrumentation;
//# sourceMappingURL=instrumentation-browser.d.mts.map