// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  DetectorResponse,
  _DetectorResponseCollection,
  DiagnosticCategory,
  _DiagnosticCategoryCollection,
  AnalysisDefinition,
  _DiagnosticAnalysisCollection,
  DiagnosticAnalysis,
  DetectorDefinitionResource,
  _DiagnosticDetectorCollection,
  DiagnosticDetectorResponse,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  detectorResponseDeserializer,
  _detectorResponseCollectionDeserializer,
  diagnosticCategoryDeserializer,
  _diagnosticCategoryCollectionDeserializer,
  analysisDefinitionDeserializer,
  _diagnosticAnalysisCollectionDeserializer,
  diagnosticAnalysisDeserializer,
  detectorDefinitionResourceDeserializer,
  _diagnosticDetectorCollectionDeserializer,
  diagnosticDetectorResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DiagnosticsExecuteSiteDetectorSlotOptionalParams,
  DiagnosticsListSiteDetectorsSlotOptionalParams,
  DiagnosticsGetSiteDetectorSlotOptionalParams,
  DiagnosticsExecuteSiteDetectorOptionalParams,
  DiagnosticsListSiteDetectorsOptionalParams,
  DiagnosticsGetSiteDetectorOptionalParams,
  DiagnosticsExecuteSiteAnalysisSlotOptionalParams,
  DiagnosticsListSiteAnalysesSlotOptionalParams,
  DiagnosticsGetSiteAnalysisSlotOptionalParams,
  DiagnosticsExecuteSiteAnalysisOptionalParams,
  DiagnosticsListSiteAnalysesOptionalParams,
  DiagnosticsGetSiteAnalysisOptionalParams,
  DiagnosticsListSiteDiagnosticCategoriesSlotOptionalParams,
  DiagnosticsGetSiteDiagnosticCategorySlotOptionalParams,
  DiagnosticsListSiteDiagnosticCategoriesOptionalParams,
  DiagnosticsGetSiteDiagnosticCategoryOptionalParams,
  DiagnosticsListSiteDetectorResponsesSlotOptionalParams,
  DiagnosticsGetSiteDetectorResponseSlotOptionalParams,
  DiagnosticsListHostingEnvironmentDetectorResponsesOptionalParams,
  DiagnosticsGetHostingEnvironmentDetectorResponseOptionalParams,
  DiagnosticsListSiteDetectorResponsesOptionalParams,
  DiagnosticsGetSiteDetectorResponseOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _executeSiteDetectorSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsExecuteSiteDetectorSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/detectors/{detectorName}/execute{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      diagnosticCategory: diagnosticCategory,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _executeSiteDetectorSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticDetectorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticDetectorResponseDeserializer(result.body);
}

/** Description for Execute Detector */
export async function executeSiteDetectorSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsExecuteSiteDetectorSlotOptionalParams = { requestOptions: {} },
): Promise<DiagnosticDetectorResponse> {
  const result = await _executeSiteDetectorSlotSend(
    context,
    resourceGroupName,
    siteName,
    detectorName,
    diagnosticCategory,
    slot,
    options,
  );
  return _executeSiteDetectorSlotDeserialize(result);
}

export function _listSiteDetectorsSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsListSiteDetectorsSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      diagnosticCategory: diagnosticCategory,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteDetectorsSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiagnosticDetectorCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _diagnosticDetectorCollectionDeserializer(result.body);
}

/** Description for Get Detectors */
export function listSiteDetectorsSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsListSiteDetectorsSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DetectorDefinitionResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSiteDetectorsSlotSend(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        slot,
        options,
      ),
    _listSiteDetectorsSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteDetectorSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  detectorName: string,
  slot: string,
  options: DiagnosticsGetSiteDetectorSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/detectors/{detectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      diagnosticCategory: diagnosticCategory,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSiteDetectorSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectorDefinitionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return detectorDefinitionResourceDeserializer(result.body);
}

/** Description for Get Detector */
export async function getSiteDetectorSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  detectorName: string,
  slot: string,
  options: DiagnosticsGetSiteDetectorSlotOptionalParams = { requestOptions: {} },
): Promise<DetectorDefinitionResource> {
  const result = await _getSiteDetectorSlotSend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    detectorName,
    slot,
    options,
  );
  return _getSiteDetectorSlotDeserialize(result);
}

export function _executeSiteDetectorSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  diagnosticCategory: string,
  options: DiagnosticsExecuteSiteDetectorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/detectors/{detectorName}/execute{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      diagnosticCategory: diagnosticCategory,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _executeSiteDetectorDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticDetectorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticDetectorResponseDeserializer(result.body);
}

/** Description for Execute Detector */
export async function executeSiteDetector(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  diagnosticCategory: string,
  options: DiagnosticsExecuteSiteDetectorOptionalParams = { requestOptions: {} },
): Promise<DiagnosticDetectorResponse> {
  const result = await _executeSiteDetectorSend(
    context,
    resourceGroupName,
    siteName,
    detectorName,
    diagnosticCategory,
    options,
  );
  return _executeSiteDetectorDeserialize(result);
}

export function _listSiteDetectorsSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  options: DiagnosticsListSiteDetectorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      diagnosticCategory: diagnosticCategory,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteDetectorsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiagnosticDetectorCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _diagnosticDetectorCollectionDeserializer(result.body);
}

/** Description for Get Detectors */
export function listSiteDetectors(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  options: DiagnosticsListSiteDetectorsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DetectorDefinitionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteDetectorsSend(context, resourceGroupName, siteName, diagnosticCategory, options),
    _listSiteDetectorsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteDetectorSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  detectorName: string,
  options: DiagnosticsGetSiteDetectorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/detectors/{detectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      diagnosticCategory: diagnosticCategory,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSiteDetectorDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectorDefinitionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return detectorDefinitionResourceDeserializer(result.body);
}

/** Description for Get Detector */
export async function getSiteDetector(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  detectorName: string,
  options: DiagnosticsGetSiteDetectorOptionalParams = { requestOptions: {} },
): Promise<DetectorDefinitionResource> {
  const result = await _getSiteDetectorSend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    detectorName,
    options,
  );
  return _getSiteDetectorDeserialize(result);
}

export function _executeSiteAnalysisSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  slot: string,
  options: DiagnosticsExecuteSiteAnalysisSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/analyses/{analysisName}/execute{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      diagnosticCategory: diagnosticCategory,
      analysisName: analysisName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _executeSiteAnalysisSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticAnalysis> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticAnalysisDeserializer(result.body);
}

/** Description for Execute Analysis */
export async function executeSiteAnalysisSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  slot: string,
  options: DiagnosticsExecuteSiteAnalysisSlotOptionalParams = { requestOptions: {} },
): Promise<DiagnosticAnalysis> {
  const result = await _executeSiteAnalysisSlotSend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    analysisName,
    slot,
    options,
  );
  return _executeSiteAnalysisSlotDeserialize(result);
}

export function _listSiteAnalysesSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsListSiteAnalysesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/analyses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      diagnosticCategory: diagnosticCategory,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteAnalysesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiagnosticAnalysisCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _diagnosticAnalysisCollectionDeserializer(result.body);
}

/** Description for Get Site Analyses */
export function listSiteAnalysesSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsListSiteAnalysesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AnalysisDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSiteAnalysesSlotSend(
        context,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        slot,
        options,
      ),
    _listSiteAnalysesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteAnalysisSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  slot: string,
  options: DiagnosticsGetSiteAnalysisSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/analyses/{analysisName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      diagnosticCategory: diagnosticCategory,
      analysisName: analysisName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSiteAnalysisSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalysisDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return analysisDefinitionDeserializer(result.body);
}

/** Description for Get Site Analysis */
export async function getSiteAnalysisSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  slot: string,
  options: DiagnosticsGetSiteAnalysisSlotOptionalParams = { requestOptions: {} },
): Promise<AnalysisDefinition> {
  const result = await _getSiteAnalysisSlotSend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    analysisName,
    slot,
    options,
  );
  return _getSiteAnalysisSlotDeserialize(result);
}

export function _executeSiteAnalysisSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  options: DiagnosticsExecuteSiteAnalysisOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/analyses/{analysisName}/execute{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      diagnosticCategory: diagnosticCategory,
      analysisName: analysisName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _executeSiteAnalysisDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticAnalysis> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticAnalysisDeserializer(result.body);
}

/** Description for Execute Analysis */
export async function executeSiteAnalysis(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  options: DiagnosticsExecuteSiteAnalysisOptionalParams = { requestOptions: {} },
): Promise<DiagnosticAnalysis> {
  const result = await _executeSiteAnalysisSend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    analysisName,
    options,
  );
  return _executeSiteAnalysisDeserialize(result);
}

export function _listSiteAnalysesSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  options: DiagnosticsListSiteAnalysesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/analyses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      diagnosticCategory: diagnosticCategory,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteAnalysesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiagnosticAnalysisCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _diagnosticAnalysisCollectionDeserializer(result.body);
}

/** Description for Get Site Analyses */
export function listSiteAnalyses(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  options: DiagnosticsListSiteAnalysesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AnalysisDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteAnalysesSend(context, resourceGroupName, siteName, diagnosticCategory, options),
    _listSiteAnalysesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteAnalysisSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  options: DiagnosticsGetSiteAnalysisOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/analyses/{analysisName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      diagnosticCategory: diagnosticCategory,
      analysisName: analysisName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSiteAnalysisDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalysisDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return analysisDefinitionDeserializer(result.body);
}

/** Description for Get Site Analysis */
export async function getSiteAnalysis(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  analysisName: string,
  options: DiagnosticsGetSiteAnalysisOptionalParams = { requestOptions: {} },
): Promise<AnalysisDefinition> {
  const result = await _getSiteAnalysisSend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    analysisName,
    options,
  );
  return _getSiteAnalysisDeserialize(result);
}

export function _listSiteDiagnosticCategoriesSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  slot: string,
  options: DiagnosticsListSiteDiagnosticCategoriesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteDiagnosticCategoriesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiagnosticCategoryCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _diagnosticCategoryCollectionDeserializer(result.body);
}

/** Description for Get Diagnostics Categories */
export function listSiteDiagnosticCategoriesSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  slot: string,
  options: DiagnosticsListSiteDiagnosticCategoriesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiagnosticCategory> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSiteDiagnosticCategoriesSlotSend(context, resourceGroupName, siteName, slot, options),
    _listSiteDiagnosticCategoriesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteDiagnosticCategorySlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsGetSiteDiagnosticCategorySlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      diagnosticCategory: diagnosticCategory,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSiteDiagnosticCategorySlotDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticCategory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticCategoryDeserializer(result.body);
}

/** Description for Get Diagnostics Category */
export async function getSiteDiagnosticCategorySlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  slot: string,
  options: DiagnosticsGetSiteDiagnosticCategorySlotOptionalParams = { requestOptions: {} },
): Promise<DiagnosticCategory> {
  const result = await _getSiteDiagnosticCategorySlotSend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    slot,
    options,
  );
  return _getSiteDiagnosticCategorySlotDeserialize(result);
}

export function _listSiteDiagnosticCategoriesSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: DiagnosticsListSiteDiagnosticCategoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteDiagnosticCategoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiagnosticCategoryCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _diagnosticCategoryCollectionDeserializer(result.body);
}

/** Description for Get Diagnostics Categories */
export function listSiteDiagnosticCategories(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: DiagnosticsListSiteDiagnosticCategoriesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiagnosticCategory> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteDiagnosticCategoriesSend(context, resourceGroupName, siteName, options),
    _listSiteDiagnosticCategoriesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteDiagnosticCategorySend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  options: DiagnosticsGetSiteDiagnosticCategoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      diagnosticCategory: diagnosticCategory,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSiteDiagnosticCategoryDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticCategory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticCategoryDeserializer(result.body);
}

/** Description for Get Diagnostics Category */
export async function getSiteDiagnosticCategory(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  diagnosticCategory: string,
  options: DiagnosticsGetSiteDiagnosticCategoryOptionalParams = { requestOptions: {} },
): Promise<DiagnosticCategory> {
  const result = await _getSiteDiagnosticCategorySend(
    context,
    resourceGroupName,
    siteName,
    diagnosticCategory,
    options,
  );
  return _getSiteDiagnosticCategoryDeserialize(result);
}

export function _listSiteDetectorResponsesSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  slot: string,
  options: DiagnosticsListSiteDetectorResponsesSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteDetectorResponsesSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<_DetectorResponseCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _detectorResponseCollectionDeserializer(result.body);
}

/** Description for List Site Detector Responses */
export function listSiteDetectorResponsesSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  slot: string,
  options: DiagnosticsListSiteDetectorResponsesSlotOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DetectorResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteDetectorResponsesSlotSend(context, resourceGroupName, siteName, slot, options),
    _listSiteDetectorResponsesSlotDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteDetectorResponseSlotSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  slot: string,
  options: DiagnosticsGetSiteDetectorResponseSlotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/detectors/{detectorName}{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      slot: slot,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _getSiteDetectorResponseSlotDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return detectorResponseDeserializer(result.body);
}

/** Description for Get site detector response */
export async function getSiteDetectorResponseSlot(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  slot: string,
  options: DiagnosticsGetSiteDetectorResponseSlotOptionalParams = { requestOptions: {} },
): Promise<DetectorResponse> {
  const result = await _getSiteDetectorResponseSlotSend(
    context,
    resourceGroupName,
    siteName,
    detectorName,
    slot,
    options,
  );
  return _getSiteDetectorResponseSlotDeserialize(result);
}

export function _listHostingEnvironmentDetectorResponsesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: DiagnosticsListHostingEnvironmentDetectorResponsesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listHostingEnvironmentDetectorResponsesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DetectorResponseCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _detectorResponseCollectionDeserializer(result.body);
}

/** Description for List Hosting Environment Detector Responses */
export function listHostingEnvironmentDetectorResponses(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: DiagnosticsListHostingEnvironmentDetectorResponsesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DetectorResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listHostingEnvironmentDetectorResponsesSend(context, resourceGroupName, name, options),
    _listHostingEnvironmentDetectorResponsesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getHostingEnvironmentDetectorResponseSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  detectorName: string,
  options: DiagnosticsGetHostingEnvironmentDetectorResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/detectors/{detectorName}{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _getHostingEnvironmentDetectorResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return detectorResponseDeserializer(result.body);
}

/** Description for Get Hosting Environment Detector Response */
export async function getHostingEnvironmentDetectorResponse(
  context: Client,
  resourceGroupName: string,
  name: string,
  detectorName: string,
  options: DiagnosticsGetHostingEnvironmentDetectorResponseOptionalParams = { requestOptions: {} },
): Promise<DetectorResponse> {
  const result = await _getHostingEnvironmentDetectorResponseSend(
    context,
    resourceGroupName,
    name,
    detectorName,
    options,
  );
  return _getHostingEnvironmentDetectorResponseDeserialize(result);
}

export function _listSiteDetectorResponsesSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: DiagnosticsListSiteDetectorResponsesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSiteDetectorResponsesDeserialize(
  result: PathUncheckedResponse,
): Promise<_DetectorResponseCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _detectorResponseCollectionDeserializer(result.body);
}

/** Description for List Site Detector Responses */
export function listSiteDetectorResponses(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: DiagnosticsListSiteDetectorResponsesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DetectorResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteDetectorResponsesSend(context, resourceGroupName, siteName, options),
    _listSiteDetectorResponsesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSiteDetectorResponseSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  options: DiagnosticsGetSiteDetectorResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/detectors/{detectorName}{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _getSiteDetectorResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return detectorResponseDeserializer(result.body);
}

/** Description for Get site detector response */
export async function getSiteDetectorResponse(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  detectorName: string,
  options: DiagnosticsGetSiteDetectorResponseOptionalParams = { requestOptions: {} },
): Promise<DetectorResponse> {
  const result = await _getSiteDetectorResponseSend(
    context,
    resourceGroupName,
    siteName,
    detectorName,
    options,
  );
  return _getSiteDetectorResponseDeserialize(result);
}
