// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EmergingIssuesGetResult,
  emergingIssuesGetResultDeserializer,
  IssueNameParameter,
  _EmergingIssueListResult,
  _emergingIssueListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { EmergingIssuesListOptionalParams, EmergingIssuesGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: EmergingIssuesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/emergingIssues{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_EmergingIssueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _emergingIssueListResultDeserializer(result.body);
}

/** Lists Azure services' emerging issues. */
export function list(
  context: Client,
  options: EmergingIssuesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EmergingIssuesGetResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  issueName: IssueNameParameter,
  options: EmergingIssuesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceHealth/emergingIssues/{issueName}{?api%2Dversion}",
    {
      issueName: issueName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<EmergingIssuesGetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return emergingIssuesGetResultDeserializer(result.body);
}

/** Gets Azure services' emerging issues. */
export async function get(
  context: Client,
  issueName: IssueNameParameter,
  options: EmergingIssuesGetOptionalParams = { requestOptions: {} },
): Promise<EmergingIssuesGetResult> {
  const result = await _getSend(context, issueName, options);
  return _getDeserialize(result);
}
