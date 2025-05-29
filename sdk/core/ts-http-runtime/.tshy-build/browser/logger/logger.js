// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import debug from "./debug.js";
const TYPESPEC_RUNTIME_LOG_LEVELS = ["verbose", "info", "warning", "error"];
const levelMap = {
    verbose: 400,
    info: 300,
    warning: 200,
    error: 100,
};
function patchLogMethod(parent, child) {
    child.log = (...args) => {
        parent.log(...args);
    };
}
function isTypeSpecRuntimeLogLevel(level) {
    return TYPESPEC_RUNTIME_LOG_LEVELS.includes(level);
}
/**
 * Creates a logger context base on the provided options.
 * @param options - The options for creating a logger context.
 * @returns The logger context.
 */
export function createLoggerContext(options) {
    const registeredLoggers = new Set();
    const logLevelFromEnv = (typeof process !== "undefined" && process.env && process.env[options.logLevelEnvVarName]) ||
        undefined;
    let logLevel;
    const clientLogger = debug(options.namespace);
    clientLogger.log = (...args) => {
        debug.log(...args);
    };
    if (logLevelFromEnv) {
        // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
        if (isTypeSpecRuntimeLogLevel(logLevelFromEnv)) {
            setLogLevel(logLevelFromEnv);
        }
        else {
            console.error(`${options.logLevelEnvVarName} set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(", ")}.`);
        }
    }
    function shouldEnable(logger) {
        return Boolean(logLevel && levelMap[logger.level] <= levelMap[logLevel]);
    }
    function createLogger(parent, level) {
        const logger = Object.assign(parent.extend(level), {
            level,
        });
        patchLogMethod(parent, logger);
        if (shouldEnable(logger)) {
            const enabledNamespaces = debug.disable();
            debug.enable(enabledNamespaces + "," + logger.namespace);
        }
        registeredLoggers.add(logger);
        return logger;
    }
    return {
        setLogLevel(level) {
            if (level && !isTypeSpecRuntimeLogLevel(level)) {
                throw new Error(`Unknown log level '${level}'. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(",")}`);
            }
            logLevel = level;
            const enabledNamespaces = [];
            for (const logger of registeredLoggers) {
                if (shouldEnable(logger)) {
                    enabledNamespaces.push(logger.namespace);
                }
            }
            debug.enable(enabledNamespaces.join(","));
        },
        getLogLevel() {
            return logLevel;
        },
        createClientLogger(namespace) {
            const clientRootLogger = clientLogger.extend(namespace);
            patchLogMethod(clientLogger, clientRootLogger);
            return {
                error: createLogger(clientRootLogger, "error"),
                warning: createLogger(clientRootLogger, "warning"),
                info: createLogger(clientRootLogger, "info"),
                verbose: createLogger(clientRootLogger, "verbose"),
            };
        },
        logger: clientLogger,
    };
}
const context = createLoggerContext({
    logLevelEnvVarName: "TYPESPEC_RUNTIME_LOG_LEVEL",
    namespace: "typeSpecRuntime",
});
/**
 * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TypeSpecRuntimeLogger = context.logger;
/**
 * Retrieves the currently specified log level.
 */
export function setLogLevel(logLevel) {
    context.setLogLevel(logLevel);
}
/**
 * Retrieves the currently specified log level.
 */
export function getLogLevel() {
    return context.getLogLevel();
}
/**
 * Creates a logger for use by the SDKs that inherits from `TypeSpecRuntimeLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
export function createClientLogger(namespace) {
    return context.createClientLogger(namespace);
}
//# sourceMappingURL=logger.js.map