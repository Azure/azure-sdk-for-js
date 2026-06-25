// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  IssueResourceCreate,
  issueResourceCreateSerializer,
  IssueResource,
  issueResourceDeserializer,
  IssueResourceUpdate,
  issueResourceUpdateSerializer,
  _IssueResourceListResult,
  _issueResourceListResultDeserializer,
  InvestigationResult,
  investigationResultSerializer,
  investigationResultDeserializer,
  FetchInvestigationResultParameters,
  fetchInvestigationResultParametersSerializer,
  ListParameter,
  listParameterSerializer,
  PagedRelatedAlert,
  pagedRelatedAlertDeserializer,
  RelatedAlertsCreate,
  relatedAlertsCreateSerializer,
  RelatedAlerts,
  relatedAlertsDeserializer,
  PagedRelatedResource,
  pagedRelatedResourceDeserializer,
  RelatedResourcesCreate,
  relatedResourcesCreateSerializer,
  RelatedResources,
  relatedResourcesDeserializer,
  BackgroundVisualization,
  backgroundVisualizationDeserializer,
  BackgroundVisualizationCreate,
  backgroundVisualizationCreateSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IssueSetBackgroundVisualizationOptionalParams,
  IssueFetchBackgroundVisualizationOptionalParams,
  IssueAddOrUpdateResourcesOptionalParams,
  IssueListResourcesOptionalParams,
  IssueAddOrUpdateAlertsOptionalParams,
  IssueListAlertsOptionalParams,
  IssueFetchInvestigationResultOptionalParams,
  IssueAddInvestigationResultOptionalParams,
  IssueListOptionalParams,
  IssueDeleteOptionalParams,
  IssueGetOptionalParams,
  IssueUpdateOptionalParams,
  IssueCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _setBackgroundVisualizationSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: BackgroundVisualizationCreate,
  options: IssueSetBackgroundVisualizationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/setBackgroundVisualization{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: backgroundVisualizationCreateSerializer(body),
    });
}

export async function _setBackgroundVisualizationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Set the background visualization for the issue */
export async function setBackgroundVisualization(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: BackgroundVisualizationCreate,
  options: IssueSetBackgroundVisualizationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setBackgroundVisualizationSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    body,
    options,
  );
  return _setBackgroundVisualizationDeserialize(result);
}

export function _fetchBackgroundVisualizationSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  options: IssueFetchBackgroundVisualizationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/fetchBackgroundVisualization{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _fetchBackgroundVisualizationDeserialize(
  result: PathUncheckedResponse,
): Promise<BackgroundVisualization> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return backgroundVisualizationDeserializer(result.body);
}

/** Fetch the background visualization of the issue */
export async function fetchBackgroundVisualization(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  options: IssueFetchBackgroundVisualizationOptionalParams = { requestOptions: {} },
): Promise<BackgroundVisualization> {
  const result = await _fetchBackgroundVisualizationSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    options,
  );
  return _fetchBackgroundVisualizationDeserialize(result);
}

export function _addOrUpdateResourcesSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: RelatedResourcesCreate,
  options: IssueAddOrUpdateResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/addOrUpdateResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: relatedResourcesCreateSerializer(body),
    });
}

export async function _addOrUpdateResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<RelatedResources> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return relatedResourcesDeserializer(result.body);
}

/** Add or update resources associated with an issue */
export async function addOrUpdateResources(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: RelatedResourcesCreate,
  options: IssueAddOrUpdateResourcesOptionalParams = { requestOptions: {} },
): Promise<RelatedResources> {
  const result = await _addOrUpdateResourcesSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    body,
    options,
  );
  return _addOrUpdateResourcesDeserialize(result);
}

export function _listResourcesSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: ListParameter,
  options: IssueListResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/listResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: listParameterSerializer(body),
    });
}

export async function _listResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<PagedRelatedResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return pagedRelatedResourceDeserializer(result.body);
}

/** List all resources in the issue - this method uses pagination to return all resources */
export async function listResources(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: ListParameter,
  options: IssueListResourcesOptionalParams = { requestOptions: {} },
): Promise<PagedRelatedResource> {
  const result = await _listResourcesSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    body,
    options,
  );
  return _listResourcesDeserialize(result);
}

export function _addOrUpdateAlertsSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: RelatedAlertsCreate,
  options: IssueAddOrUpdateAlertsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/addOrUpdateAlerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: relatedAlertsCreateSerializer(body),
    });
}

export async function _addOrUpdateAlertsDeserialize(
  result: PathUncheckedResponse,
): Promise<RelatedAlerts> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return relatedAlertsDeserializer(result.body);
}

/** Add or update alerts associated with an issue */
export async function addOrUpdateAlerts(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: RelatedAlertsCreate,
  options: IssueAddOrUpdateAlertsOptionalParams = { requestOptions: {} },
): Promise<RelatedAlerts> {
  const result = await _addOrUpdateAlertsSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    body,
    options,
  );
  return _addOrUpdateAlertsDeserialize(result);
}

export function _listAlertsSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: ListParameter,
  options: IssueListAlertsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/listAlerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: listParameterSerializer(body),
    });
}

export async function _listAlertsDeserialize(
  result: PathUncheckedResponse,
): Promise<PagedRelatedAlert> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return pagedRelatedAlertDeserializer(result.body);
}

/** List all alerts in the issue - this method uses pagination to return all alerts */
export async function listAlerts(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: ListParameter,
  options: IssueListAlertsOptionalParams = { requestOptions: {} },
): Promise<PagedRelatedAlert> {
  const result = await _listAlertsSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    body,
    options,
  );
  return _listAlertsDeserialize(result);
}

export function _fetchInvestigationResultSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: FetchInvestigationResultParameters,
  options: IssueFetchInvestigationResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/fetchInvestigationResult{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: fetchInvestigationResultParametersSerializer(body),
    });
}

export async function _fetchInvestigationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<InvestigationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return investigationResultDeserializer(result.body);
}

/** Fetch investigation result */
export async function fetchInvestigationResult(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: FetchInvestigationResultParameters,
  options: IssueFetchInvestigationResultOptionalParams = { requestOptions: {} },
): Promise<InvestigationResult> {
  const result = await _fetchInvestigationResultSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    body,
    options,
  );
  return _fetchInvestigationResultDeserialize(result);
}

export function _addInvestigationResultSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: InvestigationResult,
  options: IssueAddInvestigationResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}/addInvestigationResult{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: investigationResultSerializer(body),
    });
}

export async function _addInvestigationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<InvestigationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return investigationResultDeserializer(result.body);
}

/** Adds investigation result */
export async function addInvestigationResult(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  body: InvestigationResult,
  options: IssueAddInvestigationResultOptionalParams = { requestOptions: {} },
): Promise<InvestigationResult> {
  const result = await _addInvestigationResultSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    body,
    options,
  );
  return _addInvestigationResultDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: IssueListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_IssueResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _issueResourceListResultDeserializer(result.body);
}

/** List all issues under the parent */
export function list(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: IssueListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IssueResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, azureMonitorWorkspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-03" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  options: IssueDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete an issue */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  options: IssueDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  options: IssueGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IssueResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return issueResourceDeserializer(result.body);
}

/** Get issue properties */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  options: IssueGetOptionalParams = { requestOptions: {} },
): Promise<IssueResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    options,
  );
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  properties: IssueResourceUpdate,
  options: IssueUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: issueResourceUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<IssueResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return issueResourceDeserializer(result.body);
}

/** Update an issue */
export async function update(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  properties: IssueResourceUpdate,
  options: IssueUpdateOptionalParams = { requestOptions: {} },
): Promise<IssueResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  resource: IssueResourceCreate,
  options: IssueCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/issues/{issueName}{?api%2Dversion,related}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
      related: options?.related,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: issueResourceCreateSerializer(resource),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<IssueResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return issueResourceDeserializer(result.body);
}

/** Create a new issue or updates an existing one */
export async function create(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  issueName: string,
  resource: IssueResourceCreate,
  options: IssueCreateOptionalParams = { requestOptions: {} },
): Promise<IssueResource> {
  const result = await _createSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    issueName,
    resource,
    options,
  );
  return _createDeserialize(result);
}
