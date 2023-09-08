// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants } from "../common";
import { isNonEmptyString } from "../utils/strings";
import { CosmosDbDiagnosticLevel } from "./CosmosDbDiagnosticLevel";

export * from "./DiagnosticWriter";
export * from "./DiagnosticFormatter";

export const DefaultDiagnosticLevelValue = CosmosDbDiagnosticLevel.info;

const diagnosticLevelFromEnv =
  (typeof process !== "undefined" &&
    process.env &&
    process.env[Constants.CosmosDbDiagnosticLevelEnvVarName]) ||
  undefined;

const acceptableDiagnosticLevelValues = Object.values(CosmosDbDiagnosticLevel).map((x) =>
  x.toString()
);

let cosmosDiagnosticLevel: CosmosDbDiagnosticLevel | undefined;

if (isNonEmptyString(diagnosticLevelFromEnv)) {
  // avoid calling setDiagnosticLevel because we don't want a mis-set environment variable to crash
  if (isCosmosDiagnosticLevel(diagnosticLevelFromEnv)) {
    setDiagnosticLevel(diagnosticLevelFromEnv as CosmosDbDiagnosticLevel);
  } else {
    console.error(
      `${
        Constants.CosmosDbDiagnosticLevelEnvVarName
      } set to unknown diagnostic level '${diagnosticLevelFromEnv}'; Setting Cosmos Db diagnostic level to info. Acceptable values: ${acceptableDiagnosticLevelValues.join(
        ", "
      )}.`
    );
  }
}

export function setDiagnosticLevel(level?: CosmosDbDiagnosticLevel): void {
  if (level && !isCosmosDiagnosticLevel(level)) {
    throw new Error(
      `Unknown diagnostic level '${level}'. Acceptable values: ${acceptableDiagnosticLevelValues.join(
        ","
      )}`
    );
  }
  cosmosDiagnosticLevel = level;
}

export function getDiagnosticLevelFromEnvironment(): CosmosDbDiagnosticLevel | undefined {
  return cosmosDiagnosticLevel;
}

function isCosmosDiagnosticLevel(
  diagnosticLevel: string
): diagnosticLevel is CosmosDbDiagnosticLevel {
  return acceptableDiagnosticLevelValues.includes(diagnosticLevel);
}
