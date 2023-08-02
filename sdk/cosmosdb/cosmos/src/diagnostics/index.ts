import { Constants, DiagnosticLevel } from "../common";
import { isNonEmptyString } from "../utils/strings";

const diagnosticLevelFromEnv =
  (typeof process !== "undefined" &&
    process.env &&
    process.env[Constants.DiagnosticLevelEnvVarName]) ||
  undefined;

const acceptableDiagnosticLevelValues = Object.values(DiagnosticLevel).map((x) => x.toString());

let cosmosDiagnosticLevel: DiagnosticLevel | undefined;

if (!isNonEmptyString(diagnosticLevelFromEnv)) {
  // avoid calling setDiagnosticLevel because we don't want a mis-set environment variable to crash
  if (isCosmosDiagnosticLevel(diagnosticLevelFromEnv)) {
    setDiagnosticLevel(diagnosticLevelFromEnv as DiagnosticLevel);
  } else {
    console.error(
      `${
        Constants.DiagnosticLevelEnvVarName
      } set to unknown diagnostic level '${diagnosticLevelFromEnv}'; diagnostics is disabled. Acceptable values: ${acceptableDiagnosticLevelValues.join(
        ", "
      )}.`
    );
  }
} else {
  setDiagnosticLevel(Constants.DefaultDiagnosticLevelValue);
}

export function setDiagnosticLevel(level?: DiagnosticLevel): void {
  if (level && !isCosmosDiagnosticLevel(level)) {
    throw new Error(
      `Unknown diagnostic level '${level}'. Acceptable values: ${acceptableDiagnosticLevelValues.join(
        ","
      )}`
    );
  }
  cosmosDiagnosticLevel = level;
}

/**
 * Retrieves the currently specified diagnostic level.
 */
export function getDiagnosticLevel(): DiagnosticLevel {
  return cosmosDiagnosticLevel;
}

function isCosmosDiagnosticLevel(diagnosticLevel: string): diagnosticLevel is DiagnosticLevel {
  return acceptableDiagnosticLevelValues.includes(diagnosticLevel);
}
