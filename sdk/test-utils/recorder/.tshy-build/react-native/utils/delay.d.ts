/**
 * Usage - `await delay(<milliseconds>)`
 * This `delay` has no effect if the `TEST_MODE` is `"playback"`.
 * If the `TEST_MODE` is not `"playback"`, `delay` is a wrapper for setTimeout that resolves a promise after t milliseconds.
 *
 * @param {number} milliseconds - The number of milliseconds to be delayed.
 */
export declare function delay(milliseconds: number): Promise<void> | void;
//# sourceMappingURL=delay.d.ts.map