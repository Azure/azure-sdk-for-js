// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Export,
  exportSerializer,
  exportDeserializer,
  ExportExecutionListResult,
  exportExecutionListResultDeserializer,
  ExportListResult,
  exportListResultDeserializer,
  exportRunRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExportsGetExecutionHistoryOptionalParams,
  ExportsExecuteOptionalParams,
  ExportsListOptionalParams,
  ExportsDeleteOptionalParams,
  ExportsCreateOrUpdateOptionalParams,
  ExportsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getExecutionHistorySend(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsGetExecutionHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/exports/{exportName}/runHistory{?api%2Dversion}",
    {
      scope: scope,
      exportName: exportName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getExecutionHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<ExportExecutionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return exportExecutionListResultDeserializer(result.body);
}

/** The operation to get the run history of an export for the defined scope and export name. */
export async function getExecutionHistory(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsGetExecutionHistoryOptionalParams = { requestOptions: {} },
): Promise<ExportExecutionListResult> {
  const result = await _getExecutionHistorySend(context, scope, exportName, options);
  return _getExecutionHistoryDeserialize(result);
}

export function _executeSend(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/exports/{exportName}/run{?api%2Dversion}",
    {
      scope: scope,
      exportName: exportName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
      body: !options?.parameters
        ? options?.parameters
        : exportRunRequestSerializer(options?.parameters),
    });
}

export async function _executeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The operation to run an export. */
export async function execute(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsExecuteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _executeSend(context, scope, exportName, options);
  return _executeDeserialize(result);
}

export function _listSend(
  context: Client,
  scope: string,
  options: ExportsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/exports{?api%2Dversion,%24expand}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24expand": options?.expand,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<ExportListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return exportListResultDeserializer(result.body);
}

/** The operation to list all exports at the given scope. */
export async function list(
  context: Client,
  scope: string,
  options: ExportsListOptionalParams = { requestOptions: {} },
): Promise<ExportListResult> {
  const result = await _listSend(context, scope, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/exports/{exportName}{?api%2Dversion}",
    {
      scope: scope,
      exportName: exportName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The operation to delete a export. */
export async function $delete(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, exportName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  exportName: string,
  parameters: Export,
  options: ExportsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/exports/{exportName}{?api%2Dversion}",
    {
      scope: scope,
      exportName: exportName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
      body: exportSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Export> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return exportDeserializer(result.body);
}

/** The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  exportName: string,
  parameters: Export,
  options: ExportsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Export> {
  const result = await _createOrUpdateSend(context, scope, exportName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/exports/{exportName}{?api%2Dversion,%24expand}",
    {
      scope: scope,
      exportName: exportName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Export> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return exportDeserializer(result.body);
}

/** The operation to get the export for the defined scope by export name. */
export async function get(
  context: Client,
  scope: string,
  exportName: string,
  options: ExportsGetOptionalParams = { requestOptions: {} },
): Promise<Export> {
  const result = await _getSend(context, scope, exportName, options);
  return _getDeserialize(result);
}
