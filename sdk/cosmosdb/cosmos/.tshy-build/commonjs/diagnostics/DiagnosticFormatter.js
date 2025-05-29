"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDiagnosticFormatter = void 0;
class DefaultDiagnosticFormatter {
    format(cosmosDiagnostic) {
        return JSON.stringify(cosmosDiagnostic);
    }
}
exports.DefaultDiagnosticFormatter = DefaultDiagnosticFormatter;
//# sourceMappingURL=DiagnosticFormatter.js.map