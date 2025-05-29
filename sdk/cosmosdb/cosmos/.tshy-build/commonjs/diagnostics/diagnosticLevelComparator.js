"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosDbDiagnosticLevelOrder = void 0;
exports.allowTracing = allowTracing;
const CosmosDbDiagnosticLevel_js_1 = require("./CosmosDbDiagnosticLevel.js");
/**
 * @hidden
 */
exports.CosmosDbDiagnosticLevelOrder = [
    CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.info,
    CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.debug,
    CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.debugUnsafe,
];
/**
 * @hidden
 */
function allowTracing(levelToCheck, clientDiagnosticLevel) {
    const indexOfDiagnosticLevelToCheck = exports.CosmosDbDiagnosticLevelOrder.indexOf(levelToCheck);
    const indexOfClientDiagnosticLevel = exports.CosmosDbDiagnosticLevelOrder.indexOf(clientDiagnosticLevel);
    if (indexOfDiagnosticLevelToCheck === -1 || indexOfClientDiagnosticLevel === -1) {
        return false;
    }
    return indexOfDiagnosticLevelToCheck <= indexOfClientDiagnosticLevel;
}
//# sourceMappingURL=diagnosticLevelComparator.js.map