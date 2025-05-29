"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logErrorStackTrace = logErrorStackTrace;
const logger_1 = require("@azure/logger");
/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:eventhubs-checkpointstore-blob` namespace prefix.
 */
exports.logger = (0, logger_1.createClientLogger)("eventhubs-checkpointstore-blob");
/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
function logErrorStackTrace(error) {
    if (error && typeof error === "object" && "stack" in error) {
        exports.logger.verbose(error.stack);
    }
}
//# sourceMappingURL=log.js.map