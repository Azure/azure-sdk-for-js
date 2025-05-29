"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoOpDiagnosticWriter = exports.LogDiagnosticWriter = void 0;
const logger_1 = require("@azure/logger");
/**
 * Implementation of DiagnosticWriter, which uses \@azure/logger to write
 * diagnostics.
 * @hidden
 */
class LogDiagnosticWriter {
    constructor() {
        this.logger = (0, logger_1.createClientLogger)("CosmosDBDiagnostics");
    }
    async write(diagnosticsData) {
        this.logger.verbose(diagnosticsData);
    }
}
exports.LogDiagnosticWriter = LogDiagnosticWriter;
/**
 * Implementation of a no-op DiagnosticWriter.
 * @hidden
 */
class NoOpDiagnosticWriter {
    async write(_diagnosticsData) {
        // No op
    }
}
exports.NoOpDiagnosticWriter = NoOpDiagnosticWriter;
//# sourceMappingURL=DiagnosticWriter.js.map