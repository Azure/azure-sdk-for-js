// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/microsoft/common/models.js";
import type {
  ServiceDiagnosticSettingsResource,
  ServiceDiagnosticSettingsResourcePatch,
} from "../../models/microsoft/serviceDiagnosticsSettings/models.js";
import {
  serviceDiagnosticSettingsResourceSerializer,
  serviceDiagnosticSettingsResourceDeserializer,
  serviceDiagnosticSettingsResourcePatchSerializer,
} from "../../models/microsoft/serviceDiagnosticsSettings/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServiceDiagnosticSettingsUpdateOptionalParams,
  ServiceDiagnosticSettingsCreateOrUpdateOptionalParams,
  ServiceDiagnosticSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceUri: string,
  serviceDiagnosticSettingsResource: ServiceDiagnosticSettingsResourcePatch,
  options: ServiceDiagnosticSettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/microsoft.insights/diagnosticSettings/service{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2016-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceDiagnosticSettingsResourcePatchSerializer(serviceDiagnosticSettingsResource),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceDiagnosticSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serviceDiagnosticSettingsResourceDeserializer(result.body);
}

/** Updates an existing ServiceDiagnosticSettingsResource. To update other fields use the CreateOrUpdate method. **WARNING**: This method will be deprecated in future releases. */
export async function update(
  context: Client,
  resourceUri: string,
  serviceDiagnosticSettingsResource: ServiceDiagnosticSettingsResourcePatch,
  options: ServiceDiagnosticSettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<ServiceDiagnosticSettingsResource> {
  const result = await _updateSend(
    context,
    resourceUri,
    serviceDiagnosticSettingsResource,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  parameters: ServiceDiagnosticSettingsResource,
  options: ServiceDiagnosticSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/microsoft.insights/diagnosticSettings/service{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2016-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceDiagnosticSettingsResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceDiagnosticSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serviceDiagnosticSettingsResourceDeserializer(result.body);
}

/** Create or update new diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
export async function createOrUpdate(
  context: Client,
  resourceUri: string,
  parameters: ServiceDiagnosticSettingsResource,
  options: ServiceDiagnosticSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ServiceDiagnosticSettingsResource> {
  const result = await _createOrUpdateSend(context, resourceUri, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  options: ServiceDiagnosticSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/microsoft.insights/diagnosticSettings/service{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2016-09-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceDiagnosticSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serviceDiagnosticSettingsResourceDeserializer(result.body);
}

/** Gets the active diagnostic settings for the specified resource. **WARNING**: This method will be deprecated in future releases. */
export async function get(
  context: Client,
  resourceUri: string,
  options: ServiceDiagnosticSettingsGetOptionalParams = { requestOptions: {} },
): Promise<ServiceDiagnosticSettingsResource> {
  const result = await _getSend(context, resourceUri, options);
  return _getDeserialize(result);
}
