// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  errorDeserializer,
  IotFhirDestination,
  iotFhirDestinationSerializer,
  iotFhirDestinationDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IotConnectorFhirDestinationDeleteOptionalParams,
  IotConnectorFhirDestinationCreateOrUpdateOptionalParams,
  IotConnectorFhirDestinationGetOptionalParams,
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
  workspaceName: string,
  iotConnectorName: string,
  fhirDestinationName: string,
  options: IotConnectorFhirDestinationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations/{fhirDestinationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      iotConnectorName: iotConnectorName,
      fhirDestinationName: fhirDestinationName,
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

/** Deletes an IoT Connector FHIR destination. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  fhirDestinationName: string,
  options: IotConnectorFhirDestinationDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  fhirDestinationName: string,
  iotFhirDestination: IotFhirDestination,
  options: IotConnectorFhirDestinationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations/{fhirDestinationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      iotConnectorName: iotConnectorName,
      fhirDestinationName: fhirDestinationName,
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
      body: iotFhirDestinationSerializer(iotFhirDestination),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IotFhirDestination> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotFhirDestinationDeserializer(result.body);
}

/** Creates or updates an IoT Connector FHIR destination resource with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  fhirDestinationName: string,
  iotFhirDestination: IotFhirDestination,
  options: IotConnectorFhirDestinationCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IotFhirDestination>, IotFhirDestination> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        iotConnectorName,
        fhirDestinationName,
        iotFhirDestination,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<IotFhirDestination>, IotFhirDestination>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  fhirDestinationName: string,
  options: IotConnectorFhirDestinationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/workspaces/{workspaceName}/iotconnectors/{iotConnectorName}/fhirdestinations/{fhirDestinationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      iotConnectorName: iotConnectorName,
      fhirDestinationName: fhirDestinationName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IotFhirDestination> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotFhirDestinationDeserializer(result.body);
}

/** Gets the properties of the specified Iot Connector FHIR destination. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  iotConnectorName: string,
  fhirDestinationName: string,
  options: IotConnectorFhirDestinationGetOptionalParams = { requestOptions: {} },
): Promise<IotFhirDestination> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    iotConnectorName,
    fhirDestinationName,
    options,
  );
  return _getDeserialize(result);
}
