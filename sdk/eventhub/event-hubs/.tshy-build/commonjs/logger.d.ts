import type { AzureLogger, Debugger } from "@azure/logger";
/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:event-hubs` namespace prefix.
 */
export declare const logger: AzureLogger;
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export declare function logErrorStackTrace(error: unknown): void;
/**
 * @internal
 */
export declare function createReceiverLogPrefix(consumerId: string, connectionId: string, partitionId: string): string;
/**
 * @internal
 */
export declare function createSenderLogPrefix(senderId: string, connectionId: string): string;
/**
 * @internal
 */
export declare function createManagementLogPrefix(connectionId: string): string;
/**
 * @internal
 */
export type SimpleLogger = {
    [Property in keyof AzureLogger]: Debugger["log"];
};
/**
 * @internal
 */
export declare function createSimpleLogger(azureLogger: AzureLogger, prefix: string): SimpleLogger;
/** @internal */
export declare function logObj(obj: unknown): void;
//# sourceMappingURL=logger.d.ts.map