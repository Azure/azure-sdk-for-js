// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MicrosoftLogProfilesLogProfileResource,
  MicrosoftLogProfilesLogProfileResourcePatch,
  _MicrosoftLogProfilesLogProfileCollection,
} from "../../models/microsoft/logProfiles/models.js";
import {
  microsoftLogProfilesLogProfileResourceSerializer,
  microsoftLogProfilesLogProfileResourceDeserializer,
  microsoftLogProfilesErrorResponseDeserializer,
  microsoftLogProfilesLogProfileResourcePatchSerializer,
  _microsoftLogProfilesLogProfileCollectionDeserializer,
} from "../../models/microsoft/logProfiles/models.js";
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
): Promise<_MicrosoftLogProfilesLogProfileCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftLogProfilesErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftLogProfilesLogProfileCollectionDeserializer(result.body);
}

/** List the log profiles. */
export function list(
  context: Client,
  options: LogProfilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftLogProfilesLogProfileResource> {
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
    error.details = microsoftLogProfilesErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the log profile. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
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
  logProfilesResource: MicrosoftLogProfilesLogProfileResourcePatch,
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
    body: microsoftLogProfilesLogProfileResourcePatchSerializer(logProfilesResource),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftLogProfilesLogProfileResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftLogProfilesErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftLogProfilesLogProfileResourceDeserializer(result.body);
}

/** Updates an existing LogProfilesResource. To update other fields use the CreateOrUpdate method. */
export async function update(
  context: Client,
  logProfileName: string,
  logProfilesResource: MicrosoftLogProfilesLogProfileResourcePatch,
  options: LogProfilesUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftLogProfilesLogProfileResource> {
  const result = await _updateSend(context, logProfileName, logProfilesResource, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  logProfileName: string,
  parameters: MicrosoftLogProfilesLogProfileResource,
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
    body: microsoftLogProfilesLogProfileResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftLogProfilesLogProfileResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftLogProfilesErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftLogProfilesLogProfileResourceDeserializer(result.body);
}

/** Create or update a log profile in Azure Monitoring REST API. */
export async function createOrUpdate(
  context: Client,
  logProfileName: string,
  parameters: MicrosoftLogProfilesLogProfileResource,
  options: LogProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftLogProfilesLogProfileResource> {
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
): Promise<MicrosoftLogProfilesLogProfileResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftLogProfilesErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftLogProfilesLogProfileResourceDeserializer(result.body);
}

/** Gets the log profile. */
export async function get(
  context: Client,
  logProfileName: string,
  options: LogProfilesGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftLogProfilesLogProfileResource> {
  const result = await _getSend(context, logProfileName, options);
  return _getDeserialize(result);
}
