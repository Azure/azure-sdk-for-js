// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createClientLogger } from "@azure/logger";
/**
 * Implementation of DiagnosticWriter, which uses \@azure/logger to write
 * diagnostics.
 * @hidden
 */
export class LogDiagnosticWriter {
    constructor() {
        this.logger = createClientLogger("CosmosDBDiagnostics");
    }
    async write(diagnosticsData) {
        this.logger.verbose(diagnosticsData);
    }
}
/**
 * Implementation of a no-op DiagnosticWriter.
 * @hidden
 */
export class NoOpDiagnosticWriter {
    async write(_diagnosticsData) {
        // No op
    }
}
//# sourceMappingURL=DiagnosticWriter.js.map