// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function isDisableLocalAuth(): boolean {
  return inject(EnvVarKeys.DISABLE_LOCAL_AUTH);
}

export function getKey1(): string {
  return inject(EnvVarKeys.KEY1);
}

export function getKey2(): string {
  return inject(EnvVarKeys.KEY2);
}

export function getCluProjectName(): string {
  return inject(EnvVarKeys.LANGUAGE_CLU_PROJECT_NAME);
}

export function getCluDeploymentName(): string {
  return inject(EnvVarKeys.LANGUAGE_CLU_DEPLOYMENT_NAME);
}

export function getOrchestrationProjectName(): string {
  return inject(EnvVarKeys.LANGUAGE_ORCHESTRATION_PROJECT_NAME);
}

export function getOrchestrationDeploymentName(): string {
  return inject(EnvVarKeys.LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME);
}

export function isLiveMode(): boolean {
  return ["live", "record"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}
