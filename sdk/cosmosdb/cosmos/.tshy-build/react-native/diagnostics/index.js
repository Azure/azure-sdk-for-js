// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/index.js";
import { isNonEmptyString } from "../utils/strings.js";
import { CosmosDbDiagnosticLevel } from "./CosmosDbDiagnosticLevel.js";
import { diagnosticLevelFromEnv } from "../utils/envUtils.js";
export * from "./DiagnosticWriter.js";
export * from "./DiagnosticFormatter.js";
export const DefaultDiagnosticLevelValue = CosmosDbDiagnosticLevel.info;
const acceptableDiagnosticLevelValues = Object.values(CosmosDbDiagnosticLevel).map((x) => x.toString());
let cosmosDiagnosticLevel;
if (isNonEmptyString(diagnosticLevelFromEnv)) {
    // avoid calling setDiagnosticLevel because we don't want a mis-set environment variable to crash
    if (isCosmosDiagnosticLevel(diagnosticLevelFromEnv)) {
        setDiagnosticLevel(diagnosticLevelFromEnv);
    }
    else {
        console.error(`${Constants.CosmosDbDiagnosticLevelEnvVarName} set to unknown diagnostic level '${diagnosticLevelFromEnv}'; Setting Cosmos Db diagnostic level to info. Acceptable values: ${acceptableDiagnosticLevelValues.join(", ")}.`);
    }
}
export function setDiagnosticLevel(level) {
    if (level && !isCosmosDiagnosticLevel(level)) {
        throw new Error(`Unknown diagnostic level '${level}'. Acceptable values: ${acceptableDiagnosticLevelValues.join(",")}`);
    }
    cosmosDiagnosticLevel = level;
}
export function getDiagnosticLevelFromEnvironment() {
    return cosmosDiagnosticLevel;
}
function isCosmosDiagnosticLevel(diagnosticLevel) {
    return acceptableDiagnosticLevelValues.includes(diagnosticLevel);
}
export function determineDiagnosticLevel(diagnosticLevelFromClientConfig, diagnosticLevelFromEnvironment) {
    const diagnosticLevelFromEnvOrClient = diagnosticLevelFromEnvironment !== null && diagnosticLevelFromEnvironment !== void 0 ? diagnosticLevelFromEnvironment : diagnosticLevelFromClientConfig; // Diagnostic Setting from environment gets first priority.
    return diagnosticLevelFromEnvOrClient !== null && diagnosticLevelFromEnvOrClient !== void 0 ? diagnosticLevelFromEnvOrClient : DefaultDiagnosticLevelValue; // Diagnostic Setting supplied in Client config gets second priority.
}
//# sourceMappingURL=index.js.map