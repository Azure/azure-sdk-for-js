// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  DiagnosticsCollection,
  diagnosticsCollectionDeserializer,
  Diagnostics,
  diagnosticsDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ManagedEnvironmentDiagnosticsGetDetectorOptionalParams,
  ManagedEnvironmentDiagnosticsListDetectorsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getDetectorSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  detectorName: string,
  options: ManagedEnvironmentDiagnosticsGetDetectorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/detectors/{detectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDetectorDeserialize(result: PathUncheckedResponse): Promise<Diagnostics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return diagnosticsDeserializer(result.body);
}

/** Get the diagnostics data for a Managed Environment used to host container apps. */
export async function getDetector(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  detectorName: string,
  options: ManagedEnvironmentDiagnosticsGetDetectorOptionalParams = { requestOptions: {} },
): Promise<Diagnostics> {
  const result = await _getDetectorSend(
    context,
    resourceGroupName,
    environmentName,
    detectorName,
    options,
  );
  return _getDetectorDeserialize(result);
}

export function _listDetectorsSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentDiagnosticsListDetectorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/detectors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listDetectorsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return diagnosticsCollectionDeserializer(result.body);
}

/** Get the list of diagnostics for a Managed Environment used to host container apps. */
export async function listDetectors(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentDiagnosticsListDetectorsOptionalParams = { requestOptions: {} },
): Promise<DiagnosticsCollection> {
  const result = await _listDetectorsSend(context, resourceGroupName, environmentName, options);
  return _listDetectorsDeserialize(result);
}
