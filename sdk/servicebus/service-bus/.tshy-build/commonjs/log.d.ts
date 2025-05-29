import type { AzureLogger } from "@azure/logger";
import type { AmqpError } from "rhea-promise";
/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:service-bus` namespace prefix.
 * @internal
 */
export declare const logger: ServiceBusLogger;
/**
 * Logging for ServiceBusReceivers of any type (session, non-session)
 * @internal
 */
export declare const receiverLogger: ServiceBusLogger;
/**
 * Logging for ServiceBusSenders
 * @internal
 */
export declare const senderLogger: ServiceBusLogger;
/**
 * Logging for ServiceBusRuleManagers
 * @internal
 */
export declare const ruleManagerLogger: ServiceBusLogger;
/**
 * Logging for connection management
 * @internal
 */
export declare const connectionLogger: ServiceBusLogger;
/**
 * Logging for the ServiceBusAdministrationClient
 * @internal
 */
export declare const administrationLogger: ServiceBusLogger;
/**
 * Logging related to message encoding/decoding.
 * @internal
 */
export declare const messageLogger: ServiceBusLogger;
/**
 * Logging related to message encoding/decoding.
 * @internal
 */
export declare const managementClientLogger: ServiceBusLogger;
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export declare function logErrorStackTrace(_logger: AzureLogger, error: unknown): void;
/**
 * @internal
 */
export interface ServiceBusLogger extends AzureLogger {
    /**
     * Logs an error with an associated message, formatted. If there is a stack
     * trace in the error that will be logged to the verbose stream.
     *
     * Example:
     *   receiverLogger.logError(new Error("hello, this is the error"), "this is my message");
     * will output:
     *   azure:service-bus:receiver:warning this is my message : Error: hello, this is the error
     */
    logError(err: Error | AmqpError | undefined, ...args: any[]): void;
}
/**
 * Creates an AzureLogger with any additional methods for standardized logging (for example, with errors)
 * @internal
 */
export declare function createServiceBusLogger(namespace: string): ServiceBusLogger;
//# sourceMappingURL=log.d.ts.map