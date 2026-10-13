// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext as Client } from "../index.js";
import type {
  GenerateWavePlanRequest,
  GenerateWavePlanResponse,
  RefreshEntitiesRequest,
  RefreshEntitiesResponse,
  CreateWavesFromPlanRequest,
  CreateWavesFromPlanResponse,
  GetWavePlansRequest,
  GetWavePlansResponse,
  FetchSasUriRequest,
  FetchSasUriResponse,
  ImportWavePlanRequest,
  ImportWavePlanResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  generateWavePlanRequestSerializer,
  generateWavePlanResponseDeserializer,
  refreshEntitiesRequestSerializer,
  refreshEntitiesResponseDeserializer,
  createWavesFromPlanRequestSerializer,
  createWavesFromPlanResponseDeserializer,
  getWavePlansRequestSerializer,
  getWavePlansResponseDeserializer,
  fetchSasUriRequestSerializer,
  fetchSasUriResponseDeserializer,
  importWavePlanRequestSerializer,
  importWavePlanResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MigrateProjectsImportWavePlanOptionalParams,
  MigrateProjectsFetchSasUriOptionalParams,
  MigrateProjectsGetWavePlansOptionalParams,
  MigrateProjectsCreateWavesFromPlanOptionalParams,
  MigrateProjectsRefreshEntitiesOptionalParams,
  MigrateProjectsGenerateWavePlanOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _importWavePlanSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: ImportWavePlanRequest,
  options: MigrateProjectsImportWavePlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/importWavePlan{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: importWavePlanRequestSerializer(body),
  });
}

export async function _importWavePlanDeserialize(
  result: PathUncheckedResponse,
): Promise<ImportWavePlanResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return importWavePlanResponseDeserializer(result.body);
}

/** Ingest a customer-uploaded wave-plan CSV and produce the updated wave-plan artifacts. Long-running operation. */
export function importWavePlan(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: ImportWavePlanRequest,
  options: MigrateProjectsImportWavePlanOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ImportWavePlanResponse>, ImportWavePlanResponse> {
  return getLongRunningPoller(context, _importWavePlanDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _importWavePlanSend(context, resourceGroupName, projectName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01-preview",
  }) as PollerLike<OperationState<ImportWavePlanResponse>, ImportWavePlanResponse>;
}

export function _fetchSasUriSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: FetchSasUriRequest,
  options: MigrateProjectsFetchSasUriOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/fetchSASUri{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fetchSasUriRequestSerializer(body),
  });
}

export async function _fetchSasUriDeserialize(
  result: PathUncheckedResponse,
): Promise<FetchSasUriResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fetchSasUriResponseDeserializer(result.body);
}

/** Mint a write-only SAS URI for customer CSV uploads, later consumed by importWavePlan. */
export async function fetchSasUri(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: FetchSasUriRequest,
  options: MigrateProjectsFetchSasUriOptionalParams = { requestOptions: {} },
): Promise<FetchSasUriResponse> {
  const result = await _fetchSasUriSend(context, resourceGroupName, projectName, body, options);
  return _fetchSasUriDeserialize(result);
}

export function _getWavePlansSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: GetWavePlansRequest,
  options: MigrateProjectsGetWavePlansOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/getWavePlans{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: getWavePlansRequestSerializer(body),
  });
}

export async function _getWavePlansDeserialize(
  result: PathUncheckedResponse,
): Promise<GetWavePlansResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getWavePlansResponseDeserializer(result.body);
}

/** List wave plans previously generated for a given assessment, optionally scoped to a migration path. */
export async function getWavePlans(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: GetWavePlansRequest,
  options: MigrateProjectsGetWavePlansOptionalParams = { requestOptions: {} },
): Promise<GetWavePlansResponse> {
  const result = await _getWavePlansSend(context, resourceGroupName, projectName, body, options);
  return _getWavePlansDeserialize(result);
}

export function _createWavesFromPlanSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: CreateWavesFromPlanRequest,
  options: MigrateProjectsCreateWavesFromPlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/createWavesFromPlan{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: createWavesFromPlanRequestSerializer(body),
  });
}

export async function _createWavesFromPlanDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateWavesFromPlanResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return createWavesFromPlanResponseDeserializer(result.body);
}

/** Create waves from a previously generated wave plan based on assessment data and selected wave names. */
export function createWavesFromPlan(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: CreateWavesFromPlanRequest,
  options: MigrateProjectsCreateWavesFromPlanOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CreateWavesFromPlanResponse>, CreateWavesFromPlanResponse> {
  return getLongRunningPoller(context, _createWavesFromPlanDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createWavesFromPlanSend(context, resourceGroupName, projectName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01-preview",
  }) as PollerLike<OperationState<CreateWavesFromPlanResponse>, CreateWavesFromPlanResponse>;
}

export function _refreshEntitiesSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: RefreshEntitiesRequest,
  options: MigrateProjectsRefreshEntitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/refreshEntities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: refreshEntitiesRequestSerializer(body),
  });
}

export async function _refreshEntitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<RefreshEntitiesResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return refreshEntitiesResponseDeserializer(result.body);
}

/** Refresh execution status for migration entities and groups within a migrate project. This operation triggers status updates from partner migration services. */
export function refreshEntities(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: RefreshEntitiesRequest,
  options: MigrateProjectsRefreshEntitiesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RefreshEntitiesResponse>, RefreshEntitiesResponse> {
  return getLongRunningPoller(context, _refreshEntitiesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshEntitiesSend(context, resourceGroupName, projectName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01-preview",
  }) as PollerLike<OperationState<RefreshEntitiesResponse>, RefreshEntitiesResponse>;
}

export function _generateWavePlanSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: GenerateWavePlanRequest,
  options: MigrateProjectsGenerateWavePlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{projectName}/generateWavePlan{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: generateWavePlanRequestSerializer(body),
  });
}

export async function _generateWavePlanDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateWavePlanResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return generateWavePlanResponseDeserializer(result.body);
}

/** A long-running resource action. */
export function generateWavePlan(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  body: GenerateWavePlanRequest,
  options: MigrateProjectsGenerateWavePlanOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GenerateWavePlanResponse>, GenerateWavePlanResponse> {
  return getLongRunningPoller(context, _generateWavePlanDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generateWavePlanSend(context, resourceGroupName, projectName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01-preview",
  }) as PollerLike<OperationState<GenerateWavePlanResponse>, GenerateWavePlanResponse>;
}
