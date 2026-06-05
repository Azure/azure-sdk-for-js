// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CostDetailsOperationResults,
  costDetailsOperationResultsDeserializer,
  GenerateCostDetailsReportRequestDefinition,
  generateCostDetailsReportRequestDefinitionSerializer,
  generateCostDetailsReportErrorResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GenerateCostDetailsReportCreateOperationOptionalParams,
  GenerateCostDetailsReportGetOperationResultsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _createOperationSend(
  context: Client,
  scope: string,
  parameters: GenerateCostDetailsReportRequestDefinition,
  options: GenerateCostDetailsReportCreateOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/generateCostDetailsReport{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: generateCostDetailsReportRequestDefinitionSerializer(parameters),
  });
}

export async function _createOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<CostDetailsOperationResults> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = generateCostDetailsReportErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return costDetailsOperationResultsDeserializer(result.body);
}

/** This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields */
export function createOperation(
  context: Client,
  scope: string,
  parameters: GenerateCostDetailsReportRequestDefinition,
  options: GenerateCostDetailsReportCreateOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CostDetailsOperationResults>, CostDetailsOperationResults> {
  return getLongRunningPoller(context, _createOperationDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOperationSend(context, scope, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<OperationState<CostDetailsOperationResults>, CostDetailsOperationResults>;
}

export function _getOperationResultsSend(
  context: Client,
  scope: string,
  operationId: string,
  options: GenerateCostDetailsReportGetOperationResultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/costDetailsOperationResults/{operationId}{?api%2Dversion}",
    {
      scope: scope,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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

export async function _getOperationResultsDeserialize(
  result: PathUncheckedResponse,
): Promise<CostDetailsOperationResults> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return costDetailsOperationResultsDeserializer(result.body);
}

/** Get the result of the specified operation. This link is provided in the CostDetails creation request response Location header. */
export function getOperationResults(
  context: Client,
  scope: string,
  operationId: string,
  options: GenerateCostDetailsReportGetOperationResultsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CostDetailsOperationResults>, CostDetailsOperationResults> {
  return getLongRunningPoller(context, _getOperationResultsDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _getOperationResultsSend(context, scope, operationId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<OperationState<CostDetailsOperationResults>, CostDetailsOperationResults>;
}
