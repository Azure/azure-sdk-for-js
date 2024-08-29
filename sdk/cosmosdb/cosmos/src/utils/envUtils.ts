// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";
import { Constants } from "../common/constants";

export const disableListAndSetAggregate: boolean =
  process.env.DISABLE_LIST_AND_SET_AGGREGATE === "true";
export const diagnosticLevelFromEnv: string | undefined =
  process.env[Constants.CosmosDbDiagnosticLevelEnvVarName];
