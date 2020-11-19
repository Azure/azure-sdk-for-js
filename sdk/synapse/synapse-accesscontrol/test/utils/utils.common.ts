// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure/test-utils-recorder";

export function getWorkspaceName(): string {
  const WorkspaceEnvVarName = "WORKSPACE_NAME";
  const WorkspaceName: string | undefined = env[WorkspaceEnvVarName];

  if (!WorkspaceName) {
    throw new Error(`${WorkspaceEnvVarName} environment variable not specified.`);
  }

  return WorkspaceName;
}

export function getRollId(): string {
  const RollIdEnv = "ROLL_ID";
  const RollId: string | undefined = env[RollIdEnv];

  if (!RollId) {
    throw new Error(`${RollIdEnv} environment variable not specified.`);
  }

  return RollId;
}

export function getPrincipalId(): string {
  const PrincipalIdEnv = "PRINCIPAL_ID";
  const PrincipalId: string | undefined = env[PrincipalIdEnv];

  if (!PrincipalId) {
    throw new Error(`${PrincipalIdEnv} environment variable not specified.`);
  }

  return PrincipalId;
}

export function getScope(): string {
  const ScopeEnv = "RBAC_SCOPE";
  const scope: string | undefined = env[ScopeEnv];

  if (!scope) {
    throw new Error(`${ScopeEnv} environment variable not specified.`);
  }

  return scope;
}
