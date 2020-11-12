import { env } from "@azure/test-utils-recorder";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function getWorkspaceName(): string {
  const WorkspaceEnvVarName = "WORKSPACE_NAME";
  const WorkspaceName: string | undefined = env[WorkspaceEnvVarName];

  if (!WorkspaceName) {
    throw new Error(`${WorkspaceEnvVarName} environment variable not specified.`);
  }

  return WorkspaceName;
}

export function getSparkpoolName(): string {
  const SparkpoolEnvVarName = "SPARKPOOL_NAME";
  const Sparkpool: string | undefined = env[SparkpoolEnvVarName];

  if (!Sparkpool) {
    throw new Error(`${SparkpoolEnvVarName} environment variable not specified.`);
  }

  return Sparkpool;
}
