// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  Profile,
  ProfileUpdateParameters,
  _ProfileListResult,
  SsoUri,
  SupportedOptimizationTypesListResult,
  _ResourceUsageListResult,
  ResourceUsage,
  CanMigrateResult,
  CdnMigrationToAfdParameters,
  MigrateResult,
  CanMigrateParameters,
  MigrationParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  profileSerializer,
  profileDeserializer,
  profileUpdateParametersSerializer,
  _profileListResultDeserializer,
  ssoUriDeserializer,
  supportedOptimizationTypesListResultDeserializer,
  _resourceUsageListResultDeserializer,
  canMigrateResultDeserializer,
  cdnMigrationToAfdParametersSerializer,
  migrateResultDeserializer,
  canMigrateParametersSerializer,
  migrationParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProfilesMigrateOptionalParams,
  ProfilesCanMigrateOptionalParams,
  ProfilesMigrationAbortOptionalParams,
  ProfilesCdnMigrateToAfdOptionalParams,
  ProfilesCdnCanMigrateToAfdOptionalParams,
  ProfilesListResourceUsageOptionalParams,
  ProfilesListSupportedOptimizationTypesOptionalParams,
  ProfilesGenerateSsoUriOptionalParams,
  ProfilesMigrationCommitOptionalParams,
  ProfilesListOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesCreateOptionalParams,
  ProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _migrateSend(
  context: Client,
  resourceGroupName: string,
  migrationParameters: MigrationParameters,
  options: ProfilesMigrateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/migrate{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
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
    body: migrationParametersSerializer(migrationParameters),
  });
}

export async function _migrateDeserialize(result: PathUncheckedResponse): Promise<MigrateResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return migrateResultDeserializer(result.body);
}

/** Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this. */
export function migrate(
  context: Client,
  resourceGroupName: string,
  migrationParameters: MigrationParameters,
  options: ProfilesMigrateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrateResult>, MigrateResult> {
  return getLongRunningPoller(context, _migrateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateSend(context, resourceGroupName, migrationParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<MigrateResult>, MigrateResult>;
}

export function _canMigrateSend(
  context: Client,
  resourceGroupName: string,
  canMigrateParameters: CanMigrateParameters,
  options: ProfilesCanMigrateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/canMigrate{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
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
    body: canMigrateParametersSerializer(canMigrateParameters),
  });
}

export async function _canMigrateDeserialize(
  result: PathUncheckedResponse,
): Promise<CanMigrateResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return canMigrateResultDeserializer(result.body);
}

/** Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile. */
export function canMigrate(
  context: Client,
  resourceGroupName: string,
  canMigrateParameters: CanMigrateParameters,
  options: ProfilesCanMigrateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CanMigrateResult>, CanMigrateResult> {
  return getLongRunningPoller(context, _canMigrateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _canMigrateSend(context, resourceGroupName, canMigrateParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<CanMigrateResult>, CanMigrateResult>;
}

export function _migrationAbortSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesMigrationAbortOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/migrationAbort{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _migrationAbortDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Abort the migration to Azure Frontdoor Premium/Standard. */
export function migrationAbort(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesMigrationAbortOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _migrationAbortDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _migrationAbortSend(context, resourceGroupName, profileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _cdnMigrateToAfdSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  migrationParameters: CdnMigrationToAfdParameters,
  options: ProfilesCdnMigrateToAfdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/cdnMigrateToAfd{?api%2Dversion}",
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
    body: cdnMigrationToAfdParametersSerializer(migrationParameters),
  });
}

export async function _cdnMigrateToAfdDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return migrateResultDeserializer(result.body);
}

/** Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. This step prepares the profile for migration and will be followed by Commit to finalize the migration. */
export function cdnMigrateToAfd(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  migrationParameters: CdnMigrationToAfdParameters,
  options: ProfilesCdnMigrateToAfdOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MigrateResult>, MigrateResult> {
  return getLongRunningPoller(context, _cdnMigrateToAfdDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cdnMigrateToAfdSend(context, resourceGroupName, profileName, migrationParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<MigrateResult>, MigrateResult>;
}

export function _cdnCanMigrateToAfdSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesCdnCanMigrateToAfdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/cdnCanMigrateToAfd{?api%2Dversion}",
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

export async function _cdnCanMigrateToAfdDeserialize(
  result: PathUncheckedResponse,
): Promise<CanMigrateResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return canMigrateResultDeserializer(result.body);
}

/** Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile. */
export function cdnCanMigrateToAfd(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesCdnCanMigrateToAfdOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CanMigrateResult>, CanMigrateResult> {
  return getLongRunningPoller(context, _cdnCanMigrateToAfdDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cdnCanMigrateToAfdSend(context, resourceGroupName, profileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<CanMigrateResult>, CanMigrateResult>;
}

export function _listResourceUsageSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesListResourceUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/checkResourceUsage{?api%2Dversion}",
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
): Promise<_ResourceUsageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceUsageListResultDeserializer(result.body);
}

/** Checks the quota and actual usage of endpoints under the given Azure Front Door Standard or Azure Front Door Premium or CDN profile. */
export function listResourceUsage(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesListResourceUsageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceUsage> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourceUsageSend(context, resourceGroupName, profileName, options),
    _listResourceUsageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _listSupportedOptimizationTypesSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesListSupportedOptimizationTypesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getSupportedOptimizationTypes{?api%2Dversion}",
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

export async function _listSupportedOptimizationTypesDeserialize(
  result: PathUncheckedResponse,
): Promise<SupportedOptimizationTypesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return supportedOptimizationTypesListResultDeserializer(result.body);
}

/** Gets the supported optimization types for the current profile. A user can create an endpoint with an optimization type from the listed values. */
export async function listSupportedOptimizationTypes(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesListSupportedOptimizationTypesOptionalParams = { requestOptions: {} },
): Promise<SupportedOptimizationTypesListResult> {
  const result = await _listSupportedOptimizationTypesSend(
    context,
    resourceGroupName,
    profileName,
    options,
  );
  return _listSupportedOptimizationTypesDeserialize(result);
}

export function _generateSsoUriSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesGenerateSsoUriOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/generateSsoUri{?api%2Dversion}",
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

export async function _generateSsoUriDeserialize(result: PathUncheckedResponse): Promise<SsoUri> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ssoUriDeserializer(result.body);
}

/** Generates a dynamic SSO URI used to sign in to the CDN supplemental portal. Supplemental portal is used to configure advanced feature capabilities that are not yet available in the Azure portal, such as core reports in a standard profile; rules engine, advanced HTTP reports, and real-time stats and alerts in a premium profile. The SSO URI changes approximately every 10 minutes. */
export async function generateSsoUri(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesGenerateSsoUriOptionalParams = { requestOptions: {} },
): Promise<SsoUri> {
  const result = await _generateSsoUriSend(context, resourceGroupName, profileName, options);
  return _generateSsoUriDeserialize(result);
}

export function _migrationCommitSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesMigrationCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/migrationCommit{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _migrationCommitDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Commit the migrated Azure Frontdoor(Standard/Premium) profile. */
export function migrationCommit(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesMigrationCommitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _migrationCommitDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrationCommitSend(context, resourceGroupName, profileName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: ProfilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Cdn/profiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _profileListResultDeserializer(result.body);
}

/** Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within an Azure subscription. */
export function list(
  context: Client,
  options: ProfilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Profile> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _profileListResultDeserializer(result.body);
}

/** Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Profile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}{?api%2Dversion}",
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
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing  Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified parameters. Deleting a profile will result in the deletion of all of the sub-resources including endpoints, origins and custom domains. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, profileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  profileUpdateParameters: ProfileUpdateParameters,
  options: ProfilesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: profileUpdateParametersSerializer(profileUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Profile> {
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

/** Updates an existing Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  profileUpdateParameters: ProfileUpdateParameters,
  options: ProfilesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Profile>, Profile> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, profileName, profileUpdateParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Profile>, Profile>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  profile: Profile,
  options: ProfilesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: profileSerializer(profile),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Profile> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return profileDeserializer(result.body);
}

/** Creates a new Azure Front Door Standard or Azure Front Door Premium or CDN profile with a profile name under the specified subscription and resource group. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  profile: Profile,
  options: ProfilesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Profile>, Profile> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, profile, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Profile>, Profile>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Profile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return profileDeserializer(result.body);
}

/** Gets an Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: ProfilesGetOptionalParams = { requestOptions: {} },
): Promise<Profile> {
  const result = await _getSend(context, resourceGroupName, profileName, options);
  return _getDeserialize(result);
}
