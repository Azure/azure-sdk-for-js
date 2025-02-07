// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { EnvironmentVariableNames } from "./envVars.js";
import "dotenv/config";

const defaultLogLevel = "info";
declare module "vitest" {
  type EnvVarContext = {
    [K in (typeof EnvironmentVariableNames)[keyof typeof EnvironmentVariableNames]]: string;
  };
  interface ProvidedContext extends EnvVarContext {}
}

function assertEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    switch (key) {
      case EnvironmentVariableNames.AZURE_LOG_LEVEL:
        return defaultLogLevel;
      default:
        throw new Error(`Environment variable ${key} is not defined.`);
    }
  }
  return value;
}

export default function ({ provide }: TestProject): void {
  for (const key of Object.values(EnvironmentVariableNames)) {
    provide(key, assertEnvironmentVariable(key));
  }
}
