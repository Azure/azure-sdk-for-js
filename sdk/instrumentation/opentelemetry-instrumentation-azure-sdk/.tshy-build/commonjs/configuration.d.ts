export declare const SDK_VERSION: string;
/**
 * @internal
 *
 * Keys of known environment variables we look up.
 */
export type KnownEnvironmentKey = "AZURE_HTTP_TRACING_CHILDREN_DISABLED" | "AZURE_TRACING_DISABLED";
/**
 * @internal
 *
 * Cached values of environment variables that were fetched.
 */
export declare const environmentCache: Map<KnownEnvironmentKey, string | undefined>;
/**
 * Converts an environment variable to Boolean.
 * the strings "false" and "0" are treated as falsy values.
 *
 * @internal
 */
export declare function envVarToBoolean(key: KnownEnvironmentKey): boolean;
//# sourceMappingURL=configuration.d.ts.map