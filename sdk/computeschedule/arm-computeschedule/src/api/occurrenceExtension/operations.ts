// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeScheduleContext as Client } from "../index.js";
import type {
  _OccurrenceExtensionResourceListResult,
  OccurrenceExtensionResource} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _occurrenceExtensionResourceListResultDeserializer
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OccurrenceExtensionListOccurrenceByVmsOptionalParams } from "./options.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listOccurrenceByVmsSend(
  context: Client,
  resourceUri: string,
  options: OccurrenceExtensionListOccurrenceByVmsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ComputeSchedule/associatedOccurrences{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _listOccurrenceByVmsDeserialize(
  result: PathUncheckedResponse,
): Promise<_OccurrenceExtensionResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _occurrenceExtensionResourceListResultDeserializer(result.body);
}

/** List OccurrenceExtensionResource resources by parent */
export function listOccurrenceByVms(
  context: Client,
  resourceUri: string,
  options: OccurrenceExtensionListOccurrenceByVmsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OccurrenceExtensionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listOccurrenceByVmsSend(context, resourceUri, options),
    _listOccurrenceByVmsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
