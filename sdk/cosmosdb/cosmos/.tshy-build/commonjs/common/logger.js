"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLogger = void 0;
const logger_1 = require("@azure/logger");
/**
 * The \@azure/logger configuration for this package.
 */
exports.defaultLogger = (0, logger_1.createClientLogger)("cosmosdb");
//# sourceMappingURL=logger.js.map