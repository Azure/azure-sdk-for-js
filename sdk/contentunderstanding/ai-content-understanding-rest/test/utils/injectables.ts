// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function getKey(): string | null {
  return inject(EnvVarKeys.KEY);
}

export function isLiveMode(): boolean {
  return ["live", "record"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}

export function getTestingContainerSasUrl(): string {
  return inject(EnvVarKeys.TESTING_CONTAINER_SAS_URL);
}
