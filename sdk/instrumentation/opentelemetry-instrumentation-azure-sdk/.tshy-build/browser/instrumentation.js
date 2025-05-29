// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { InstrumentationBase } from "@opentelemetry/instrumentation";
import { OpenTelemetryInstrumenter } from "./instrumenter.js";
import { SDK_VERSION } from "./configuration.js";
import { useInstrumenter } from "@azure/core-tracing";
/**
 * The instrumentation module for the Azure SDK. Implements OpenTelemetry's {@link Instrumentation}.
 */
export class AzureSdkInstrumentation extends InstrumentationBase {
    constructor(options = {}) {
        super("@azure/opentelemetry-instrumentation-azure-sdk", SDK_VERSION, Object.assign({}, options));
    }
    /** In the browser we rely on overriding the `enable` function instead as there are no modules to patch. */
    init() {
        // no-op
    }
    /**
     * Entrypoint for the module registration. Ensures the global instrumenter is set to use OpenTelemetry.
     */
    enable() {
        useInstrumenter(new OpenTelemetryInstrumenter());
    }
    disable() {
        // no-op
    }
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
export function createAzureSdkInstrumentation(options = {}) {
    return new AzureSdkInstrumentation(options);
}
//# sourceMappingURL=instrumentation-browser.mjs.map