// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  errorDeserializer,
  FhirService,
  fhirServiceSerializer,
  fhirServiceDeserializer,
  _FhirServiceCollection,
  _fhirServiceCollectionDeserializer,
  FhirServicePatchResource,
  fhirServicePatchResourceSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FhirServicesDeleteOptionalParams,
  FhirServicesUpdateOptionalParams,
  FhirServicesListByWorkspaceOptionalParams,
  FhirServicesCreateOrUpdateOptionalParams,
  FhirServicesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fhirServiceName: string,
  workspaceName: string,
  options: FhirServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fhirServiceName: fhirServiceName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a FHIR Service. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fhirServiceName: string,
  workspaceName: string,
  options: FhirServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, fhirServiceName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  fhirServiceName: string,
  workspaceName: string,
  fhirservicePatchResource: FhirServicePatchResource,
  options: FhirServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fhirServiceName: fhirServiceName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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
      body: fhirServicePatchResourceSerializer(fhirservicePatchResource),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<FhirService> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return fhirServiceDeserializer(result.body);
}

/** Patch FHIR Service details. */
export function update(
  context: Client,
  resourceGroupName: string,
  fhirServiceName: string,
  workspaceName: string,
  fhirservicePatchResource: FhirServicePatchResource,
  options: FhirServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FhirService>, FhirService> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        fhirServiceName,
        workspaceName,
        fhirservicePatchResource,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<FhirService>, FhirService>;
}

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: FhirServicesListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_FhirServiceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _fhirServiceCollectionDeserializer(result.body);
}

/** Lists all FHIR Services for the given workspace */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: FhirServicesListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FhirService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _listByWorkspaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-04-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fhirServiceName: string,
  fhirservice: FhirService,
  options: FhirServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      fhirServiceName: fhirServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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
      body: fhirServiceSerializer(fhirservice),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FhirService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return fhirServiceDeserializer(result.body);
}

/** Creates or updates a FHIR Service resource with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fhirServiceName: string,
  fhirservice: FhirService,
  options: FhirServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FhirService>, FhirService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        fhirServiceName,
        fhirservice,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<FhirService>, FhirService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fhirServiceName: string,
  options: FhirServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/fhirservices/{fhirServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      fhirServiceName: fhirServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FhirService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return fhirServiceDeserializer(result.body);
}

/** Gets the properties of the specified FHIR Service. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fhirServiceName: string,
  options: FhirServicesGetOptionalParams = { requestOptions: {} },
): Promise<FhirService> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    fhirServiceName,
    options,
  );
  return _getDeserialize(result);
}
