// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvironmentVariableNames } from "./envVars.js";
import type { ResourcesInfo } from "./types.js";

export function getAzureSearchEndpoint(): string {
  return inject(EnvironmentVariableNames.AZURE_SEARCH_ENDPOINT);
}

export function getAzureSearchIndex(): string {
  return inject(EnvironmentVariableNames.AZURE_SEARCH_INDEX);
}

export function getResourcesInfo(): ResourcesInfo {
  return inject("resourcesInfo");
}
