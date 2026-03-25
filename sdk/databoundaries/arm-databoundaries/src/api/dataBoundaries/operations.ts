// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataboundariesManegementContext as Client } from "../index.js";
import type { DataBoundaryDefinition, DefaultName } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dataBoundaryDefinitionSerializer,
  dataBoundaryDefinitionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataBoundariesPutOptionalParams,
  DataBoundariesGetTenantOptionalParams,
  DataBoundariesGetScopeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _putSend(
  context: Client,
  defaultParam: DefaultName,
  dataBoundaryDefinition: DataBoundaryDefinition,
  options: DataBoundariesPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/dataBoundaries/{default}{?api%2Dversion}",
    {
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataBoundaryDefinitionSerializer(dataBoundaryDefinition),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<DataBoundaryDefinition> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dataBoundaryDefinitionDeserializer(result.body);
}

/** Opt-in tenant to data boundary. */
export async function put(
  context: Client,
  defaultParam: DefaultName,
  dataBoundaryDefinition: DataBoundaryDefinition,
  options: DataBoundariesPutOptionalParams = { requestOptions: {} },
): Promise<DataBoundaryDefinition> {
  const result = await _putSend(context, defaultParam, dataBoundaryDefinition, options);
  return _putDeserialize(result);
}

export function _getTenantSend(
  context: Client,
  defaultParam: DefaultName,
  options: DataBoundariesGetTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/dataBoundaries/{default}{?api%2Dversion}",
    {
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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

export async function _getTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<DataBoundaryDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dataBoundaryDefinitionDeserializer(result.body);
}

/** Get data boundary of tenant. */
export async function getTenant(
  context: Client,
  defaultParam: DefaultName,
  options: DataBoundariesGetTenantOptionalParams = { requestOptions: {} },
): Promise<DataBoundaryDefinition> {
  const result = await _getTenantSend(context, defaultParam, options);
  return _getTenantDeserialize(result);
}

export function _getScopeSend(
  context: Client,
  scope: string,
  defaultParam: DefaultName,
  options: DataBoundariesGetScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/dataBoundaries/{default}{?api%2Dversion}",
    {
      scope: scope,
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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

export async function _getScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DataBoundaryDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dataBoundaryDefinitionDeserializer(result.body);
}

/** Get data boundary at specified scope */
export async function getScope(
  context: Client,
  scope: string,
  defaultParam: DefaultName,
  options: DataBoundariesGetScopeOptionalParams = { requestOptions: {} },
): Promise<DataBoundaryDefinition> {
  const result = await _getScopeSend(context, scope, defaultParam, options);
  return _getScopeDeserialize(result);
}
