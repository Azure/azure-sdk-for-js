// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import type { AzureSearchResources, ResourcesInfo } from "./types.js";

export function getSearchInfo(): AzureSearchResources {
  return inject("azureSearchResources");
}

export function getResourcesInfo(): ResourcesInfo {
  return inject("resourcesInfo");
}
