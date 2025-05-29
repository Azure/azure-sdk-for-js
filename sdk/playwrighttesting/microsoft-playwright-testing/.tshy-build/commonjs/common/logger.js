"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.reporterLogger = exports.coreLogger = void 0;
const logger_1 = require("@azure/logger");
exports.coreLogger = (0, logger_1.createClientLogger)("mpt");
exports.reporterLogger = (0, logger_1.createClientLogger)("mpt:reporter");
//# sourceMappingURL=logger.js.map