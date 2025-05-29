/**
 * The \@azure/logger configuration for this package.
 * This will output logs using the `azure:event-hubs` namespace prefix.
 */
export declare const logger: import("@azure/logger").AzureLogger;
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export declare function logErrorStackTrace(error: unknown): void;
//# sourceMappingURL=log.d.ts.map