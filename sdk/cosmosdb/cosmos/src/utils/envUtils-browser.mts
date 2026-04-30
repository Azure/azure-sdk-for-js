// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/constants.js";

// Bundlers and test frameworks may inject `process.env` into browser bundles.
// Using `globalThis.process` (property access) avoids ReferenceError when the binding doesn't exist.
declare const process: { env?: Record<string, string | undefined> } | undefined;

export const diagnosticLevelFromEnv: string | undefined =
  globalThis.process?.env?.[Constants.CosmosDbDiagnosticLevelEnvVarName];
