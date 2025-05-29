// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDbDiagnosticLevel } from "./CosmosDbDiagnosticLevel.js";
/**
 * @hidden
 */
export const CosmosDbDiagnosticLevelOrder = [
    CosmosDbDiagnosticLevel.info,
    CosmosDbDiagnosticLevel.debug,
    CosmosDbDiagnosticLevel.debugUnsafe,
];
/**
 * @hidden
 */
export function allowTracing(levelToCheck, clientDiagnosticLevel) {
    const indexOfDiagnosticLevelToCheck = CosmosDbDiagnosticLevelOrder.indexOf(levelToCheck);
    const indexOfClientDiagnosticLevel = CosmosDbDiagnosticLevelOrder.indexOf(clientDiagnosticLevel);
    if (indexOfDiagnosticLevelToCheck === -1 || indexOfClientDiagnosticLevel === -1) {
        return false;
    }
    return indexOfDiagnosticLevelToCheck <= indexOfClientDiagnosticLevel;
}
//# sourceMappingURL=diagnosticLevelComparator.js.map