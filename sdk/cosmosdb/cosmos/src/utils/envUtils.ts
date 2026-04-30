// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/constants.js";

export const diagnosticLevelFromEnv: string | undefined =
  (globalThis as any).process?.env?.[Constants.CosmosDbDiagnosticLevelEnvVarName];
