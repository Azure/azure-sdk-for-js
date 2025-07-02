// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DiagnosticResource,
  diagnosticResourceSerializer,
  diagnosticResourceDeserializer,
} from "../../models/models.js";
import { DiagnosticsCreateOptionalParams, DiagnosticsGetOptionalParams } from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  scope: string,
  diagnosticsResourceName: string,
  options: DiagnosticsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/diagnostics/{diagnosticsResourceName}{?api%2Dversion}",
    {
      scope: scope,
      diagnosticsResourceName: diagnosticsResourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["diagnosticResourceRequest"]
      ? options["diagnosticResourceRequest"]
      : diagnosticResourceSerializer(options["diagnosticResourceRequest"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticResourceDeserializer(result.body);
}

/** Creates a diagnostic for the specific resource using solutionId from discovery solutions. <br/>Diagnostics are powerful solutions that access product resources or other relevant data and provide the root cause of the issue and the steps to address the issue.<br/><br/> */
export function create(
  context: Client,
  scope: string,
  diagnosticsResourceName: string,
  options: DiagnosticsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiagnosticResource>, DiagnosticResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, scope, diagnosticsResourceName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DiagnosticResource>, DiagnosticResource>;
}

export function _getSend(
  context: Client,
  scope: string,
  diagnosticsResourceName: string,
  options: DiagnosticsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/diagnostics/{diagnosticsResourceName}{?api%2Dversion}",
    {
      scope: scope,
      diagnosticsResourceName: diagnosticsResourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DiagnosticResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return diagnosticResourceDeserializer(result.body);
}

/** Get the diagnostics using the 'diagnosticsResourceName' you chose while creating the diagnostic. */
export async function get(
  context: Client,
  scope: string,
  diagnosticsResourceName: string,
  options: DiagnosticsGetOptionalParams = { requestOptions: {} },
): Promise<DiagnosticResource> {
  const result = await _getSend(context, scope, diagnosticsResourceName, options);
  return _getDeserialize(result);
}
