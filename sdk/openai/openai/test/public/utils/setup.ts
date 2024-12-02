// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { GlobalSetupContext } from "vitest/node";

enum EnvVarKeys {
  AZURE_LOG_LEVEL = "AZURE_LOG_LEVEL",
}
declare module "vitest" {
  type MyEnvVarKey = {
    [K in keyof typeof EnvVarKeys]: string;
  };
  export interface ProvidedContext extends MyEnvVarKey {}
}

const defaultLogLevel = "info";

function assertEnvironmentVariable(key: string): string {
  const value = process.env[key];
  // handle defaults
  if (!value) {
    switch (key) {
      case EnvVarKeys.AZURE_LOG_LEVEL:
        return defaultLogLevel;
      default:
        throw new Error(`Environment variable ${key} is not defined.`);
    }
  }
  return value;
}

export default async function ({ provide }: GlobalSetupContext): Promise<() => void> {
  for (const key of Object.values(EnvVarKeys)) {
    provide(key, assertEnvironmentVariable(key));
  }
  return function () {};
}
