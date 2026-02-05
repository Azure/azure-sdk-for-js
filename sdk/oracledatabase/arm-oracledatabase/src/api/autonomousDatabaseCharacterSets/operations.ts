// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  AutonomousDatabaseCharacterSet,
  _AutonomousDatabaseCharacterSetListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  autonomousDatabaseCharacterSetDeserializer,
  _autonomousDatabaseCharacterSetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
  AutonomousDatabaseCharacterSetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: AutonomousDatabaseCharacterSetsListByLocationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/autonomousDatabaseCharacterSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_AutonomousDatabaseCharacterSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _autonomousDatabaseCharacterSetListResultDeserializer(result.body);
}

/** List AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource */
export function listByLocation(
  context: Client,
  location: string,
  options: AutonomousDatabaseCharacterSetsListByLocationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutonomousDatabaseCharacterSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, location, options),
    _listByLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  adbscharsetname: string,
  options: AutonomousDatabaseCharacterSetsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/autonomousDatabaseCharacterSets/{adbscharsetname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      adbscharsetname: adbscharsetname,
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
): Promise<AutonomousDatabaseCharacterSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseCharacterSetDeserializer(result.body);
}

/** Get a AutonomousDatabaseCharacterSet */
export async function get(
  context: Client,
  location: string,
  adbscharsetname: string,
  options: AutonomousDatabaseCharacterSetsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<AutonomousDatabaseCharacterSet> {
  const result = await _getSend(context, location, adbscharsetname, options);
  return _getDeserialize(result);
}
