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

export function getEntityRecognitionProjectName(): string {
  return inject(EnvVarKeys.ENTITY_RECOGNITION_PROJECT_NAME);
}

export function getEntityRecognitionDeploymentName(): string {
  return inject(EnvVarKeys.ENTITY_RECOGNITION_DEPLOYMENT_NAME);
}

export function getMultiLabelClassificationProjectName(): string {
  return inject(EnvVarKeys.MULTI_LABEL_CLASSIFICATION_PROJECT_NAME);
}

export function getMultiLabelClassificationDeploymentName(): string {
  return inject(EnvVarKeys.MULTI_LABEL_CLASSIFICATION_DEPLOYMENT_NAME);
}

export function getSingleLabelClassificationProjectName(): string {
  return inject(EnvVarKeys.SINGLE_LABEL_CLASSIFICATION_PROJECT_NAME);
}

export function getSingleLabelClassificationDeploymentName(): string {
  return inject(EnvVarKeys.SINGLE_LABEL_CLASSIFICATION_DEPLOYMENT_NAME);
}

export function isLiveMode(): boolean {
  return ["live", "record"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}
