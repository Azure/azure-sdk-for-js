/// <reference lib="es5" />

// Changes to Aborter
// * Rename Aborter to AbortSignal
// * Remove withValue and getValue - async context should be solved differently/wholistically, not tied to cancellation
// * Remove withTimeout, it's moved to the controller
// * AbortSignal constructor no longer takes a parent. Cancellation graphs are created from the controller.

// Potential changes to align with DOM Spec
// * dispatchEvent on Signal

export { AbortController, AbortError } from "./AbortController";
export { AbortSignal } from "./AbortSignal";

// Compatability with previous version of this library
export { AbortSignal as Aborter } from "./AbortSignal";
