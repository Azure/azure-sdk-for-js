// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeScheduleContext as Client } from "../index.js";
import type {
  _ScheduledActionResourcesListResult,
  ScheduledActionResources} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _scheduledActionResourcesListResultDeserializer
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ScheduledActionExtensionListByVmsOptionalParams } from "./options.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByVmsSend(
  context: Client,
  resourceUri: string,
  options: ScheduledActionExtensionListByVmsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ComputeSchedule/associatedScheduledActions{?api%2Dversion}",
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

export async function _listByVmsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScheduledActionResourcesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _scheduledActionResourcesListResultDeserializer(result.body);
}

/** List ScheduledActionResources resources by parent */
export function listByVms(
  context: Client,
  resourceUri: string,
  options: ScheduledActionExtensionListByVmsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ScheduledActionResources> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVmsSend(context, resourceUri, options),
    _listByVmsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
