import { NoOpInstrumenter } from "./instrumenter";
import { Instrumenter } from "./interfaces";

/** @internal */
export let instrumenterImplementation: Instrumenter = new NoOpInstrumenter();

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 *
 * Example:
 *
 * ```ts
 * import { openTelemetryInstrumenter } from "@azure/core-tracing-opentelemetry";
 * import { MyClient } from "@azure/package-name"
 * useInstrumenter(openTelemetryInstrumenter);
 *
 * const client = new MyClient(); // uses the OpenTelemetry instrumenter
 * ```
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  instrumenterImplementation = instrumenter;
}
