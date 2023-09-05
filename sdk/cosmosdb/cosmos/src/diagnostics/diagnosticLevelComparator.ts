// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getDiagnosticLevel } from ".";
import { CosmosDbDiagnosticLevel } from "./CosmosDbDiagnosticLevel";

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
export function allowTracing(levelToCheck: CosmosDbDiagnosticLevel): boolean {
  const indexOfDiagnosticLevelToCheck = CosmosDbDiagnosticLevelOrder.indexOf(levelToCheck);
  const indexOfClientDiagnosticLevel = CosmosDbDiagnosticLevelOrder.indexOf(getDiagnosticLevel());
  if (indexOfDiagnosticLevelToCheck === -1 || indexOfClientDiagnosticLevel === -1) {
    return false;
  }
  return indexOfDiagnosticLevelToCheck <= indexOfClientDiagnosticLevel;
}
