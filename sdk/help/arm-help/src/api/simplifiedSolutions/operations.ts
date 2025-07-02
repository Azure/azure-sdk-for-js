// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SimplifiedSolutionsResource,
  simplifiedSolutionsResourceSerializer,
  simplifiedSolutionsResourceDeserializer,
} from "../../models/models.js";
import {
  SimplifiedSolutionsCreateOptionalParams,
  SimplifiedSolutionsGetOptionalParams,
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

export function _createSend(
  context: Client,
  scope: string,
  simplifiedSolutionsResourceName: string,
  options: SimplifiedSolutionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/simplifiedSolutions/{simplifiedSolutionsResourceName}{?api%2Dversion}",
    {
      scope: scope,
      simplifiedSolutionsResourceName: simplifiedSolutionsResourceName,
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
    body: !options["simplifiedSolutionsRequestBody"]
      ? options["simplifiedSolutionsRequestBody"]
      : simplifiedSolutionsResourceSerializer(options["simplifiedSolutionsRequestBody"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SimplifiedSolutionsResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return simplifiedSolutionsResourceDeserializer(result.body);
}

/** Creates Simplified Solutions for an Azure subscription using 'solutionId' from Discovery Solutions as the input. <br/><br/> Simplified Solutions API makes the consumption of solutions APIs easier while still providing access to the same powerful solutions rendered in Solutions API. With Simplified Solutions, users don't have to worry about stitching together the article using replacement maps and can use the content in the API response to directly render as HTML content.<br/> */
export function create(
  context: Client,
  scope: string,
  simplifiedSolutionsResourceName: string,
  options: SimplifiedSolutionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SimplifiedSolutionsResource>, SimplifiedSolutionsResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, scope, simplifiedSolutionsResourceName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SimplifiedSolutionsResource>, SimplifiedSolutionsResource>;
}

export function _getSend(
  context: Client,
  scope: string,
  simplifiedSolutionsResourceName: string,
  options: SimplifiedSolutionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Help/simplifiedSolutions/{simplifiedSolutionsResourceName}{?api%2Dversion}",
    {
      scope: scope,
      simplifiedSolutionsResourceName: simplifiedSolutionsResourceName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SimplifiedSolutionsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return simplifiedSolutionsResourceDeserializer(result.body);
}

/** Get the simplified Solutions using the applicable solutionResourceName while creating the simplified Solutions. */
export async function get(
  context: Client,
  scope: string,
  simplifiedSolutionsResourceName: string,
  options: SimplifiedSolutionsGetOptionalParams = { requestOptions: {} },
): Promise<SimplifiedSolutionsResource> {
  const result = await _getSend(context, scope, simplifiedSolutionsResourceName, options);
  return _getDeserialize(result);
}
