// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  AutonomousDatabaseNationalCharacterSet,
  _AutonomousDatabaseNationalCharacterSetListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  autonomousDatabaseNationalCharacterSetDeserializer,
  _autonomousDatabaseNationalCharacterSetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AutonomousDatabaseNationalCharacterSetsListByLocationOptionalParams,
  AutonomousDatabaseNationalCharacterSetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: AutonomousDatabaseNationalCharacterSetsListByLocationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/autonomousDatabaseNationalCharacterSets{?api%2Dversion}",
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
): Promise<_AutonomousDatabaseNationalCharacterSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _autonomousDatabaseNationalCharacterSetListResultDeserializer(result.body);
}

/** List AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource */
export function listByLocation(
  context: Client,
  location: string,
  options: AutonomousDatabaseNationalCharacterSetsListByLocationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AutonomousDatabaseNationalCharacterSet> {
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
  adbsncharsetname: string,
  options: AutonomousDatabaseNationalCharacterSetsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/autonomousDatabaseNationalCharacterSets/{adbsncharsetname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      adbsncharsetname: adbsncharsetname,
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
): Promise<AutonomousDatabaseNationalCharacterSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return autonomousDatabaseNationalCharacterSetDeserializer(result.body);
}

/** Get a AutonomousDatabaseNationalCharacterSet */
export async function get(
  context: Client,
  location: string,
  adbsncharsetname: string,
  options: AutonomousDatabaseNationalCharacterSetsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<AutonomousDatabaseNationalCharacterSet> {
  const result = await _getSend(context, location, adbsncharsetname, options);
  return _getDeserialize(result);
}
