"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDiagnosticLevelValue = void 0;
exports.setDiagnosticLevel = setDiagnosticLevel;
exports.getDiagnosticLevelFromEnvironment = getDiagnosticLevelFromEnvironment;
exports.determineDiagnosticLevel = determineDiagnosticLevel;
const tslib_1 = require("tslib");
const index_js_1 = require("../common/index.js");
const strings_js_1 = require("../utils/strings.js");
const CosmosDbDiagnosticLevel_js_1 = require("./CosmosDbDiagnosticLevel.js");
const envUtils_js_1 = require("../utils/envUtils.js");
tslib_1.__exportStar(require("./DiagnosticWriter.js"), exports);
tslib_1.__exportStar(require("./DiagnosticFormatter.js"), exports);
exports.DefaultDiagnosticLevelValue = CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel.info;
const acceptableDiagnosticLevelValues = Object.values(CosmosDbDiagnosticLevel_js_1.CosmosDbDiagnosticLevel).map((x) => x.toString());
let cosmosDiagnosticLevel;
if ((0, strings_js_1.isNonEmptyString)(envUtils_js_1.diagnosticLevelFromEnv)) {
    // avoid calling setDiagnosticLevel because we don't want a mis-set environment variable to crash
    if (isCosmosDiagnosticLevel(envUtils_js_1.diagnosticLevelFromEnv)) {
        setDiagnosticLevel(envUtils_js_1.diagnosticLevelFromEnv);
    }
    else {
        console.error(`${index_js_1.Constants.CosmosDbDiagnosticLevelEnvVarName} set to unknown diagnostic level '${envUtils_js_1.diagnosticLevelFromEnv}'; Setting Cosmos Db diagnostic level to info. Acceptable values: ${acceptableDiagnosticLevelValues.join(", ")}.`);
    }
}
function setDiagnosticLevel(level) {
    if (level && !isCosmosDiagnosticLevel(level)) {
        throw new Error(`Unknown diagnostic level '${level}'. Acceptable values: ${acceptableDiagnosticLevelValues.join(",")}`);
    }
    cosmosDiagnosticLevel = level;
}
function getDiagnosticLevelFromEnvironment() {
    return cosmosDiagnosticLevel;
}
function isCosmosDiagnosticLevel(diagnosticLevel) {
    return acceptableDiagnosticLevelValues.includes(diagnosticLevel);
}
function determineDiagnosticLevel(diagnosticLevelFromClientConfig, diagnosticLevelFromEnvironment) {
    const diagnosticLevelFromEnvOrClient = diagnosticLevelFromEnvironment !== null && diagnosticLevelFromEnvironment !== void 0 ? diagnosticLevelFromEnvironment : diagnosticLevelFromClientConfig; // Diagnostic Setting from environment gets first priority.
    return diagnosticLevelFromEnvOrClient !== null && diagnosticLevelFromEnvOrClient !== void 0 ? diagnosticLevelFromEnvOrClient : exports.DefaultDiagnosticLevelValue; // Diagnostic Setting supplied in Client config gets second priority.
}
//# sourceMappingURL=index.js.map