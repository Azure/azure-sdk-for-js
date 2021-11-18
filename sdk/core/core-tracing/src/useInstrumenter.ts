import { NoOpInstrumenter } from "./instrumenter";
import { Instrumenter } from "./interfaces";

/** @internal */
export let instrumenterImplementation: Instrumenter = new NoOpInstrumenter();

/**
 * Extends the Azure SDK with support for a given instrumenter implementation.
 *
 * @param instrumenter - The instrumenter implementation to use.
 */
export function useInstrumenter(instrumenter: Instrumenter): void {
  instrumenterImplementation = instrumenter;
}
