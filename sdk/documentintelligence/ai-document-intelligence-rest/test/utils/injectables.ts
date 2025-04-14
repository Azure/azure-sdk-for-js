// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function isLocalAuthDisabled(): boolean {
  return inject(EnvVarKeys.DISABLE_LOCAL_AUTH);
}

export function getKey(): string {
  return inject(EnvVarKeys.KEY);
}

export function isLiveMode(): boolean {
  return ["live", "record"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}

export function getTrainingContainerSasUrl(): string {
  return inject(EnvVarKeys.TRAINING_CONTAINER_SAS_URL);
}

export function getTestingContainerSasUrl(): string {
  return inject(EnvVarKeys.TESTING_CONTAINER_SAS_URL);
}

export function getSelectionMarkStorageContainerSasUrl(): string {
  return inject(EnvVarKeys.SELECTION_MARK_STORAGE_CONTAINER_SAS_URL);
}

export function getClassifierTrainingDataContainerSasUrl(): string {
  return inject(EnvVarKeys.CLASSIFIER_TRAINING_DATA_CONTAINER_SAS_URL);
}

export function getBatchTrainingDataContainerSasUrl(): string {
  return inject(EnvVarKeys.BATCH_TRAINING_DATA_CONTAINER_SAS_URL);
}

export function getBatchTrainingDataResultContainerSasUrl(): string {
  return inject(EnvVarKeys.BATCH_TRAINING_DATA_RESULT_CONTAINER_SAS_URL);
}

export function getMultipageTrainingDataContainerSasUrl(): string {
  return inject(EnvVarKeys.MULTIPAGE_TRAINING_DATA_CONTAINER_SAS_URL);
}
