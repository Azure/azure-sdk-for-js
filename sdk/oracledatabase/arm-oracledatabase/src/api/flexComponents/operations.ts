// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type { FlexComponent, _FlexComponentListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  flexComponentDeserializer,
  _flexComponentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FlexComponentsListByParentOptionalParams,
  FlexComponentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  location: string,
  options: FlexComponentsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/flexComponents{?api%2Dversion,shape}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
      shape: options?.shape,
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_FlexComponentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _flexComponentListResultDeserializer(result.body);
}

/** List FlexComponent resources by SubscriptionLocationResource */
export function listByParent(
  context: Client,
  location: string,
  options: FlexComponentsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FlexComponent> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, location, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  flexComponentName: string,
  options: FlexComponentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/flexComponents/{flexComponentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      flexComponentName: flexComponentName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FlexComponent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return flexComponentDeserializer(result.body);
}

/** Get a FlexComponent */
export async function get(
  context: Client,
  location: string,
  flexComponentName: string,
  options: FlexComponentsGetOptionalParams = { requestOptions: {} },
): Promise<FlexComponent> {
  const result = await _getSend(context, location, flexComponentName, options);
  return _getDeserialize(result);
}
