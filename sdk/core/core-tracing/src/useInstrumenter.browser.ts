import { NoOpInstrumenter } from "./instrumenter";
import { Instrumenter } from "./interfaces";

/** @internal */
globalThis.instrumenterImplementation = new NoOpInstrumenter();

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  globalThis.instrumenterImplementation = instrumenter;
}
