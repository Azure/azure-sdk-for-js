"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwTypeErrorIfParameterMissing = throwTypeErrorIfParameterMissing;
const log_js_1 = require("../log.js");
/**
 * @internal
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param methodName - Name of the method that was passed the parameter
 * @param parameterName - Name of the parameter to check
 * @param parameterValue - Value of the parameter to check
 */
function throwTypeErrorIfParameterMissing(methodName, parameterName, parameterValue) {
    if (parameterValue === undefined || parameterValue === null) {
        const error = new TypeError(`${methodName} called without required argument "${parameterName}"`);
        log_js_1.logger.warning(error.message);
        (0, log_js_1.logErrorStackTrace)(error);
        throw error;
    }
}
//# sourceMappingURL=error.js.map