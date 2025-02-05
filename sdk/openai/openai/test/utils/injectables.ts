// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvironmentVariableNames } from "./envVars.js";

export function getResourceGroup(): string {
  return inject(EnvironmentVariableNames.RESOURCE_GROUP);
}

export function getSubscriptionId(): string {
  return inject(EnvironmentVariableNames.SUBSCRIPTION_ID);
}

export function getAccountNameAudio(): string {
  return inject(EnvironmentVariableNames.ACCOUNT_NAME_AUDIO);
}

export function getAccountNameCompletions(): string {
  return inject(EnvironmentVariableNames.ACCOUNT_NAME_COMPLETIONS);
}

export function getAccountNameVision(): string {
  return inject(EnvironmentVariableNames.ACCOUNT_NAME_VISION);
}

export function getAzureSearchEndpoint(): string {
  return inject(EnvironmentVariableNames.AZURE_SEARCH_ENDPOINT);
}

export function getAzureSearchIndex(): string {
  return inject(EnvironmentVariableNames.AZURE_SEARCH_INDEX);
}

export function getEndpointAudio(): string {
  return inject(EnvironmentVariableNames.ENDPOINT_AUDIO);
}

export function getEndpointCompletions(): string {
  return inject(EnvironmentVariableNames.ENDPOINT_COMPLETIONS);
}

export function getEndpointVision(): string {
  return inject(EnvironmentVariableNames.ENDPOINT_VISION);
}
