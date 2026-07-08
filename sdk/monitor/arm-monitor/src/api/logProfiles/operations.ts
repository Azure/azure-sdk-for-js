// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  LogProfilesApiLogProfileResource,
  LogProfilesApiLogProfileResourcePatch,
  _LogProfilesApiLogProfileCollection,
} from "../../models/logProfilesApi/models.js";
import {
  logProfilesApiLogProfileResourceSerializer,
  logProfilesApiLogProfileResourceDeserializer,
  logProfilesApiLogProfileResourcePatchSerializer,
  _logProfilesApiLogProfileCollectionDeserializer,
} from "../../models/logProfilesApi/models.js";
import { microsoftCommonErrorResponseDeserializer } from "../../models/microsoft/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LogProfilesListOptionalParams,
  LogProfilesDeleteOptionalParams,
  LogProfilesUpdateOptionalParams,
  LogProfilesCreateOrUpdateOptionalParams,
  LogProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: LogProfilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/logprofiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2016-03-01",
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
): Promise<_LogProfilesApiLogProfileCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logProfilesApiLogProfileCollectionDeserializer(result.body);
}

/** List the log profiles. */
export function list(
  context: Client,
  options: LogProfilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogProfilesApiLogProfileResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2016-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  logProfileName: string,
  options: LogProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/logprofiles/{logProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      logProfileName: logProfileName,
      "api%2Dversion": "2016-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the log profile. */
export async function $delete(
  context: Client,
  logProfileName: string,
  options: LogProfilesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, logProfileName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  logProfileName: string,
  logProfilesResource: LogProfilesApiLogProfileResourcePatch,
  options: LogProfilesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/logprofiles/{logProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      logProfileName: logProfileName,
      "api%2Dversion": "2016-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: logProfilesApiLogProfileResourcePatchSerializer(logProfilesResource),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogProfilesApiLogProfileResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logProfilesApiLogProfileResourceDeserializer(result.body);
}

/** Updates an existing LogProfilesResource. To update other fields use the CreateOrUpdate method. */
export async function update(
  context: Client,
  logProfileName: string,
  logProfilesResource: LogProfilesApiLogProfileResourcePatch,
  options: LogProfilesUpdateOptionalParams = { requestOptions: {} },
): Promise<LogProfilesApiLogProfileResource> {
  const result = await _updateSend(context, logProfileName, logProfilesResource, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  logProfileName: string,
  parameters: LogProfilesApiLogProfileResource,
  options: LogProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/logprofiles/{logProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      logProfileName: logProfileName,
      "api%2Dversion": "2016-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: logProfilesApiLogProfileResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogProfilesApiLogProfileResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logProfilesApiLogProfileResourceDeserializer(result.body);
}

/** Create or update a log profile in Azure Monitoring REST API. */
export async function createOrUpdate(
  context: Client,
  logProfileName: string,
  parameters: LogProfilesApiLogProfileResource,
  options: LogProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<LogProfilesApiLogProfileResource> {
  const result = await _createOrUpdateSend(context, logProfileName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  logProfileName: string,
  options: LogProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/logprofiles/{logProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      logProfileName: logProfileName,
      "api%2Dversion": "2016-03-01",
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
): Promise<LogProfilesApiLogProfileResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logProfilesApiLogProfileResourceDeserializer(result.body);
}

/** Gets the log profile. */
export async function get(
  context: Client,
  logProfileName: string,
  options: LogProfilesGetOptionalParams = { requestOptions: {} },
): Promise<LogProfilesApiLogProfileResource> {
  const result = await _getSend(context, logProfileName, options);
  return _getDeserialize(result);
}
