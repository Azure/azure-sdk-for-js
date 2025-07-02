// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SolutionResource,
  solutionResourceSerializer,
  solutionResourceDeserializer,
  solutionPatchRequestBodySerializer,
  solutionWarmUpRequestBodySerializer,
} from "../../models/models.js";
import {
  SolutionWarmUpOptionalParams,
  SolutionUpdateOptionalParams,
  SolutionCreateOptionalParams,
  SolutionGetOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _warmUpSend(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionWarmUpOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/solutions/{solutionResourceName}/warmup{?api%2Dversion}",
    {
      scope: scope,
      solutionResourceName: solutionResourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["solutionWarmUpRequestBody"]
      ? options["solutionWarmUpRequestBody"]
      : solutionWarmUpRequestBodySerializer(options["solutionWarmUpRequestBody"]),
  });
}

export async function _warmUpDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Warm up the solution resource by preloading asynchronous diagnostics results into cache */
export async function warmUp(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionWarmUpOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _warmUpSend(context, scope, solutionResourceName, options);
  return _warmUpDeserialize(result);
}

export function _updateSend(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/solutions/{solutionResourceName}{?api%2Dversion}",
    {
      scope: scope,
      solutionResourceName: solutionResourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["solutionPatchRequestBody"]
      ? options["solutionPatchRequestBody"]
      : solutionPatchRequestBodySerializer(options["solutionPatchRequestBody"]),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SolutionResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionResourceDeserializer(result.body);
}

/** Update the requiredInputs or additional information needed to execute the solution */
export function update(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SolutionResource>, SolutionResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, scope, solutionResourceName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SolutionResource>, SolutionResource>;
}

export function _createSend(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/solutions/{solutionResourceName}{?api%2Dversion}",
    {
      scope: scope,
      solutionResourceName: solutionResourceName,
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
    body: !options["solutionRequestBody"]
      ? options["solutionRequestBody"]
      : solutionResourceSerializer(options["solutionRequestBody"]),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SolutionResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionResourceDeserializer(result.body);
}

/** Creates a solution for the specific Azure resource or subscription using the inputs ‘solutionId and requiredInputs’ from discovery solutions. <br/> Azure solutions comprise a comprehensive library of self-help resources that have been thoughtfully curated by Azure engineers to aid customers in resolving typical troubleshooting issues. These solutions encompass: <br/> (1.) Dynamic and context-aware diagnostics, guided troubleshooting wizards, and data visualizations. <br/> (2.) Rich instructional video tutorials and illustrative diagrams and images. <br/> (3.) Thoughtfully assembled textual troubleshooting instructions. <br/> All these components are seamlessly converged into unified solutions tailored to address a specific support problem area. */
export function create(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SolutionResource>, SolutionResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, scope, solutionResourceName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SolutionResource>, SolutionResource>;
}

export function _getSend(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/solutions/{solutionResourceName}{?api%2Dversion}",
    {
      scope: scope,
      solutionResourceName: solutionResourceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SolutionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionResourceDeserializer(result.body);
}

/** Get the solution using the applicable solutionResourceName while creating the solution. */
export async function get(
  context: Client,
  scope: string,
  solutionResourceName: string,
  options: SolutionGetOptionalParams = { requestOptions: {} },
): Promise<SolutionResource> {
  const result = await _getSend(context, scope, solutionResourceName, options);
  return _getDeserialize(result);
}
