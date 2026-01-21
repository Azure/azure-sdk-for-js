// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext as Client } from "../index.js";
import type { Run, RunRequestUnion, SourceUploadDefinition } from "../../models/models.js";
import {
  errorResponseDeserializer,
  runDeserializer,
  runRequestUnionSerializer,
  sourceUploadDefinitionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegistriesGetBuildSourceUploadUrlOptionalParams,
  RegistriesScheduleRunOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getBuildSourceUploadUrlSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesGetBuildSourceUploadUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/listBuildSourceUploadUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
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

export async function _getBuildSourceUploadUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<SourceUploadDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sourceUploadDefinitionDeserializer(result.body);
}

/** Get the upload location for the user to be able to upload the source. */
export async function getBuildSourceUploadUrl(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RegistriesGetBuildSourceUploadUrlOptionalParams = { requestOptions: {} },
): Promise<SourceUploadDefinition> {
  const result = await _getBuildSourceUploadUrlSend(
    context,
    resourceGroupName,
    registryName,
    options,
  );
  return _getBuildSourceUploadUrlDeserialize(result);
}

export function _scheduleRunSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runRequest: RunRequestUnion,
  options: RegistriesScheduleRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/scheduleRun{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runRequestUnionSerializer(runRequest),
  });
}

export async function _scheduleRunDeserialize(result: PathUncheckedResponse): Promise<Run> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return runDeserializer(result.body);
}

/** Schedules a new run based on the request parameters and add it to the run queue. */
export async function scheduleRun(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runRequest: RunRequestUnion,
  options: RegistriesScheduleRunOptionalParams = { requestOptions: {} },
): Promise<Run> {
  const result = await _scheduleRunSend(
    context,
    resourceGroupName,
    registryName,
    runRequest,
    options,
  );
  return _scheduleRunDeserialize(result);
}
