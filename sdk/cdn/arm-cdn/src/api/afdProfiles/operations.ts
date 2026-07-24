// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  CheckEndpointNameAvailabilityInput,
  CheckEndpointNameAvailabilityOutput,
  CheckNameAvailabilityOutput,
  Profile,
  _UsagesListResult,
  Usage,
  CheckHostNameAvailabilityInput,
  ValidateSecretInput,
  ValidateSecretOutput,
  ProfileUpgradeParameters,
} from "../../models/models.js";
import {
  checkEndpointNameAvailabilityInputSerializer,
  checkEndpointNameAvailabilityOutputDeserializer,
  errorResponseDeserializer,
  checkNameAvailabilityOutputDeserializer,
  profileDeserializer,
  _usagesListResultDeserializer,
  checkHostNameAvailabilityInputSerializer,
  validateSecretInputSerializer,
  validateSecretOutputDeserializer,
  profileUpgradeParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AFDProfilesUpgradeOptionalParams,
  AFDProfilesValidateSecretOptionalParams,
  AFDProfilesCheckHostNameAvailabilityOptionalParams,
  AFDProfilesListResourceUsageOptionalParams,
  AFDProfilesCheckEndpointNameAvailabilityOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  profileUpgradeParameters: ProfileUpgradeParameters,
  options: AFDProfilesUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: profileUpgradeParametersSerializer(profileUpgradeParameters),
  });
}

export async function _upgradeDeserialize(result: PathUncheckedResponse): Promise<Profile> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return profileDeserializer(result.body);
}

/** Upgrade a profile from Standard_AzureFrontDoor to Premium_AzureFrontDoor. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  profileUpgradeParameters: ProfileUpgradeParameters,
  options: AFDProfilesUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Profile>, Profile> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeSend(context, resourceGroupName, profileName, profileUpgradeParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Profile>, Profile>;
}

export function _validateSecretSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  validateSecretInput: ValidateSecretInput,
  options: AFDProfilesValidateSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/validateSecret{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: validateSecretInputSerializer(validateSecretInput),
  });
}

export async function _validateSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateSecretOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validateSecretOutputDeserializer(result.body);
}

/** Validate a Secret in the profile. */
export async function validateSecret(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  validateSecretInput: ValidateSecretInput,
  options: AFDProfilesValidateSecretOptionalParams = { requestOptions: {} },
): Promise<ValidateSecretOutput> {
  const result = await _validateSecretSend(
    context,
    resourceGroupName,
    profileName,
    validateSecretInput,
    options,
  );
  return _validateSecretDeserialize(result);
}

export function _checkHostNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  checkHostNameAvailabilityInput: CheckHostNameAvailabilityInput,
  options: AFDProfilesCheckHostNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/checkHostNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkHostNameAvailabilityInputSerializer(checkHostNameAvailabilityInput),
  });
}

export async function _checkHostNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityOutputDeserializer(result.body);
}

/** Validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS. */
export async function checkHostNameAvailability(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  checkHostNameAvailabilityInput: CheckHostNameAvailabilityInput,
  options: AFDProfilesCheckHostNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityOutput> {
  const result = await _checkHostNameAvailabilitySend(
    context,
    resourceGroupName,
    profileName,
    checkHostNameAvailabilityInput,
    options,
  );
  return _checkHostNameAvailabilityDeserialize(result);
}

export function _listResourceUsageSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDProfilesListResourceUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listResourceUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsagesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _usagesListResultDeserializer(result.body);
}

/** Checks the quota and actual usage of endpoints under the given Azure Front Door profile. */
export function listResourceUsage(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDProfilesListResourceUsageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourceUsageSend(context, resourceGroupName, profileName, options),
    _listResourceUsageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _checkEndpointNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  checkEndpointNameAvailabilityInput: CheckEndpointNameAvailabilityInput,
  options: AFDProfilesCheckEndpointNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/checkEndpointNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkEndpointNameAvailabilityInputSerializer(checkEndpointNameAvailabilityInput),
  });
}

export async function _checkEndpointNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckEndpointNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkEndpointNameAvailabilityOutputDeserializer(result.body);
}

/** Check the availability of an afdx endpoint name, and return the globally unique endpoint host name. */
export async function checkEndpointNameAvailability(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  checkEndpointNameAvailabilityInput: CheckEndpointNameAvailabilityInput,
  options: AFDProfilesCheckEndpointNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckEndpointNameAvailabilityOutput> {
  const result = await _checkEndpointNameAvailabilitySend(
    context,
    resourceGroupName,
    profileName,
    checkEndpointNameAvailabilityInput,
    options,
  );
  return _checkEndpointNameAvailabilityDeserialize(result);
}
