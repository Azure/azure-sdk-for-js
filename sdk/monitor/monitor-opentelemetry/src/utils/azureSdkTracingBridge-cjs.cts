// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Eagerly installs the OpenTelemetry bridge for \@azure/core-tracing.
 *
 * The \@azure/opentelemetry-instrumentation-azure-sdk package normally installs
 * the bridge via a require-in-the-middle (RITM) hook that intercepts future
 * `require("@azure/core-tracing")` calls. However, if \@azure/core-tracing is
 * already loaded before useAzureMonitor() is called (e.g. because the customer
 * imported \@azure/ai-projects or any other Azure SDK package first), the hook
 * never fires, and Azure SDK spans are silently dropped.
 *
 * This function works around the issue by directly calling useInstrumenter()
 * with an instrumenter created via createOpenTelemetryInstrumenter(), which
 * patches the already-loaded \@azure/core-tracing singleton state.
 *
 * @internal
 */
export function ensureAzureSdkTracingBridge(): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useInstrumenter } = require("@azure/core-tracing");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createOpenTelemetryInstrumenter } = require(
      "@azure/opentelemetry-instrumentation-azure-sdk",
    );

    useInstrumenter(createOpenTelemetryInstrumenter());
  } catch {
    // Fail silently if the modules cannot be resolved
  }
}
