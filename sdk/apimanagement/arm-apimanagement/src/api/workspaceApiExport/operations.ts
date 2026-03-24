// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { ApiExportResult, ExportFormat, ExportApi } from "../../models/models.js";
import { errorResponseDeserializer, apiExportResultDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { WorkspaceApiExportGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  apiId: string,
  format: ExportFormat,
  exportParam: ExportApi,
  options: WorkspaceApiExportGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/apis/{apiId}?export=true{?api%2Dversion,format,export}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      apiId: apiId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      format: format,
      export: exportParam,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ApiExportResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiExportResultDeserializer(result.body);
}

/** Gets the details of the API specified by its identifier in the format specified to the Storage Blob with SAS Key valid for 5 minutes. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  apiId: string,
  format: ExportFormat,
  exportParam: ExportApi,
  options: WorkspaceApiExportGetOptionalParams = { requestOptions: {} },
): Promise<ApiExportResult> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    format,
    exportParam,
    options,
  );
  return _getDeserialize(result);
}
