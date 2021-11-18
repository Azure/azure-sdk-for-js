import { NoOpInstrumenter } from "./instrumenter";
import { Instrumenter } from "./interfaces";

/** @internal */
globalThis.instrumenterImplementation = new NoOpInstrumenter();

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 *
 * This function is meant to be used by the \@azure/instrumentation-opentelemetry package.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  globalThis.instrumenterImplementation = instrumenter;
}
