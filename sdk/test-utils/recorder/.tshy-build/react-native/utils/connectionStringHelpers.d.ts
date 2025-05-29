/**
 * Get real and fake values mapped from the provided connection strings.
 *
 * Example:
 *  connectionString = "endpoint=secretive.azure.io;token=a1b2c3d4;secret=totally_secret"
 *  fakeConnString   = "endpoint=randomval.azure.io;token=mask_tok;secret=totally_faked"
 *
 *  // Ordering/spaces are not important
 *
 * Returns
 * ```
 * {
 *   "secretive.azure.io": "randomval.azure.io",
 *   "a1b2c3d4"          : "mask_tok",
 *   "totally_secret"    : "totally_faked"
 * }
 * ```
 */
export declare function getRealAndFakePairs(connectionString: string, fakeConnString: string): Record<string, string>;
//# sourceMappingURL=connectionStringHelpers.d.ts.map