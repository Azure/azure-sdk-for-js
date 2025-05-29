"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.managementClientLogger = exports.messageLogger = exports.administrationLogger = exports.connectionLogger = exports.ruleManagerLogger = exports.senderLogger = exports.receiverLogger = exports.logger = void 0;
exports.logErrorStackTrace = logErrorStackTrace;
exports.createServiceBusLogger = createServiceBusLogger;
const logger_1 = require("@azure/logger");
const core_util_1 = require("@azure/core-util");
/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:service-bus` namespace prefix.
 * @internal
 */
exports.logger = createServiceBusLogger("service-bus");
/**
 * Logging for ServiceBusReceivers of any type (session, non-session)
 * @internal
 */
exports.receiverLogger = createServiceBusLogger("service-bus:receiver");
/**
 * Logging for ServiceBusSenders
 * @internal
 */
exports.senderLogger = createServiceBusLogger("service-bus:sender");
/**
 * Logging for ServiceBusRuleManagers
 * @internal
 */
exports.ruleManagerLogger = createServiceBusLogger("service-bus:rulemanager");
/**
 * Logging for connection management
 * @internal
 */
exports.connectionLogger = createServiceBusLogger("service-bus:connection");
/**
 * Logging for the ServiceBusAdministrationClient
 * @internal
 */
exports.administrationLogger = createServiceBusLogger("service-bus:administration");
/**
 * Logging related to message encoding/decoding.
 * @internal
 */
exports.messageLogger = createServiceBusLogger("service-bus:messages");
/**
 * Logging related to message encoding/decoding.
 * @internal
 */
exports.managementClientLogger = createServiceBusLogger("service-bus:management");
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
function logErrorStackTrace(_logger, error) {
    if ((0, core_util_1.isObjectWithProperties)(error, ["stack"]) && error.stack) {
        _logger.verbose(error.stack);
    }
}
/**
 * Creates an AzureLogger with any additional methods for standardized logging (for example, with errors)
 * @internal
 */
function createServiceBusLogger(namespace) {
    const _logger = (0, logger_1.createClientLogger)(namespace);
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