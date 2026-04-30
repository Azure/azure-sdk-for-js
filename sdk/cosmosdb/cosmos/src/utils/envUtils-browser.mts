// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/constants.js";

declare const globalThis: { process?: { env?: Record<string, string | undefined> } };

export const diagnosticLevelFromEnv: string | undefined =
  globalThis.process?.env?.[Constants.CosmosDbDiagnosticLevelEnvVarName];
