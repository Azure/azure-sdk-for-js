// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ProblemClassification,
  problemClassificationDeserializer,
  _ProblemClassificationsListResult,
  _problemClassificationsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ProblemClassificationsListOptionalParams,
  ProblemClassificationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  serviceName: string,
  options: ProblemClassificationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/services/{serviceName}/problemClassifications{?api%2Dversion}",
    {
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProblemClassificationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _problemClassificationsListResultDeserializer(result.body);
}

/** Lists all the problem classifications (categories) available for a specific Azure service. Always use the service and problem classifications obtained programmatically. This practice ensures that you always have the most recent set of service and problem classification Ids. */
export function list(
  context: Client,
  serviceName: string,
  options: ProblemClassificationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProblemClassification> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getSend(
  context: Client,
  serviceName: string,
  problemClassificationName: string,
  options: ProblemClassificationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/services/{serviceName}/problemClassifications/{problemClassificationName}{?api%2Dversion}",
    {
      serviceName: serviceName,
      problemClassificationName: problemClassificationName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ProblemClassification> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return problemClassificationDeserializer(result.body);
}

/** Get problem classification details for a specific Azure service. */
export async function get(
  context: Client,
  serviceName: string,
  problemClassificationName: string,
  options: ProblemClassificationsGetOptionalParams = { requestOptions: {} },
): Promise<ProblemClassification> {
  const result = await _getSend(context, serviceName, problemClassificationName, options);
  return _getDeserialize(result);
}
