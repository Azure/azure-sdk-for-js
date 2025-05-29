// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createClientLogger } from "@azure/logger";
import { isObjectWithProperties } from "@azure/core-util";
/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:service-bus` namespace prefix.
 * @internal
 */
export const logger = createServiceBusLogger("service-bus");
/**
 * Logging for ServiceBusReceivers of any type (session, non-session)
 * @internal
 */
export const receiverLogger = createServiceBusLogger("service-bus:receiver");
/**
 * Logging for ServiceBusSenders
 * @internal
 */
export const senderLogger = createServiceBusLogger("service-bus:sender");
/**
 * Logging for ServiceBusRuleManagers
 * @internal
 */
export const ruleManagerLogger = createServiceBusLogger("service-bus:rulemanager");
/**
 * Logging for connection management
 * @internal
 */
export const connectionLogger = createServiceBusLogger("service-bus:connection");
/**
 * Logging for the ServiceBusAdministrationClient
 * @internal
 */
export const administrationLogger = createServiceBusLogger("service-bus:administration");
/**
 * Logging related to message encoding/decoding.
 * @internal
 */
export const messageLogger = createServiceBusLogger("service-bus:messages");
/**
 * Logging related to message encoding/decoding.
 * @internal
 */
export const managementClientLogger = createServiceBusLogger("service-bus:management");
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export function logErrorStackTrace(_logger, error) {
    if (isObjectWithProperties(error, ["stack"]) && error.stack) {
        _logger.verbose(error.stack);
    }
}
/**
 * Creates an AzureLogger with any additional methods for standardized logging (for example, with errors)
 * @internal
 */
export function createServiceBusLogger(namespace) {
    const _logger = createClientLogger(namespace);
    _logger["logError"] = (err, ...args) => {
        let l;
        // abort errors are user initiated so we don't have to treat them as warnings, like we
        // would with other errors.
        if (isError(err) && err.name === "AbortError") {
            l = _logger.info;
        }
        else {
            l = _logger.warning;
        }
        // tack on the error object so it also gets logged.
        args.push(":", err);
        // let the normal formatting work and include the error at the end.
        l(...args);
        // optionally log the stack trace if it's available but this always goes to verbose
        if (err && err.stack) {
            _logger.verbose(err.stack);
        }
    };
    return _logger;
}
/**
 * @internal
 */
function isError(err) {
    return err != null && err.name != null;
}
//# sourceMappingURL=log.js.map