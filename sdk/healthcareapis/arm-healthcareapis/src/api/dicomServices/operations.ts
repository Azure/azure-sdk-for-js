// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  errorDeserializer,
  DicomService,
  dicomServiceSerializer,
  dicomServiceDeserializer,
  _DicomServiceCollection,
  _dicomServiceCollectionDeserializer,
  DicomServicePatchResource,
  dicomServicePatchResourceSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DicomServicesDeleteOptionalParams,
  DicomServicesUpdateOptionalParams,
  DicomServicesListByWorkspaceOptionalParams,
  DicomServicesCreateOrUpdateOptionalParams,
  DicomServicesGetOptionalParams,
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
  dicomServiceName: string,
  workspaceName: string,
  options: DicomServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dicomServiceName: dicomServiceName,
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

/** Deletes a DICOM Service. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dicomServiceName: string,
  workspaceName: string,
  options: DicomServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, dicomServiceName, workspaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dicomServiceName: string,
  workspaceName: string,
  dicomservicePatchResource: DicomServicePatchResource,
  options: DicomServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dicomServiceName: dicomServiceName,
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
      body: dicomServicePatchResourceSerializer(dicomservicePatchResource),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DicomService> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return dicomServiceDeserializer(result.body);
}

/** Patch DICOM Service details. */
export function update(
  context: Client,
  resourceGroupName: string,
  dicomServiceName: string,
  workspaceName: string,
  dicomservicePatchResource: DicomServicePatchResource,
  options: DicomServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DicomService>, DicomService> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        dicomServiceName,
        workspaceName,
        dicomservicePatchResource,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<DicomService>, DicomService>;
}

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: DicomServicesListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices{?api%2Dversion}",
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
): Promise<_DicomServiceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _dicomServiceCollectionDeserializer(result.body);
}

/** Lists all DICOM Services for the given workspace */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: DicomServicesListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DicomService> {
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
  dicomServiceName: string,
  dicomservice: DicomService,
  options: DicomServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      dicomServiceName: dicomServiceName,
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
      body: dicomServiceSerializer(dicomservice),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DicomService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return dicomServiceDeserializer(result.body);
}

/** Creates or updates a DICOM Service resource with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  dicomServiceName: string,
  dicomservice: DicomService,
  options: DicomServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DicomService>, DicomService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        dicomServiceName,
        dicomservice,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<DicomService>, DicomService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  dicomServiceName: string,
  options: DicomServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/dicomservices/{dicomServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      dicomServiceName: dicomServiceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DicomService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return dicomServiceDeserializer(result.body);
}

/** Gets the properties of the specified DICOM Service. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  dicomServiceName: string,
  options: DicomServicesGetOptionalParams = { requestOptions: {} },
): Promise<DicomService> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    dicomServiceName,
    options,
  );
  return _getDeserialize(result);
}
