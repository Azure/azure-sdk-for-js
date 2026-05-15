// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AuthorizedApplication,
  authorizedApplicationSerializer,
  authorizedApplicationDeserializer,
  _AuthorizedApplicationArrayResponseWithContinuation,
  _authorizedApplicationArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AuthorizedApplicationsListOptionalParams,
  AuthorizedApplicationsDeleteOptionalParams,
  AuthorizedApplicationsCreateOrUpdateOptionalParams,
  AuthorizedApplicationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  providerNamespace: string,
  options: AuthorizedApplicationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/authorizedApplications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
): Promise<_AuthorizedApplicationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _authorizedApplicationArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the authorized applications in the provider namespace. */
export function list(
  context: Client,
  providerNamespace: string,
  options: AuthorizedApplicationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthorizedApplication> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, providerNamespace, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  providerNamespace: string,
  applicationId: string,
  options: AuthorizedApplicationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/authorizedApplications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      applicationId: applicationId,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an authorized application. */
export async function $delete(
  context: Client,
  providerNamespace: string,
  applicationId: string,
  options: AuthorizedApplicationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, providerNamespace, applicationId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  applicationId: string,
  properties: AuthorizedApplication,
  options: AuthorizedApplicationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/authorizedApplications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      applicationId: applicationId,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: authorizedApplicationSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthorizedApplication> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return authorizedApplicationDeserializer(result.body);
}

/** Creates or updates the authorized application. */
export function createOrUpdate(
  context: Client,
  providerNamespace: string,
  applicationId: string,
  properties: AuthorizedApplication,
  options: AuthorizedApplicationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AuthorizedApplication>, AuthorizedApplication> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, providerNamespace, applicationId, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<AuthorizedApplication>, AuthorizedApplication>;
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  applicationId: string,
  options: AuthorizedApplicationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/authorizedApplications/{applicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      applicationId: applicationId,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
): Promise<AuthorizedApplication> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return authorizedApplicationDeserializer(result.body);
}

/** Gets the authorized application details. */
export async function get(
  context: Client,
  providerNamespace: string,
  applicationId: string,
  options: AuthorizedApplicationsGetOptionalParams = { requestOptions: {} },
): Promise<AuthorizedApplication> {
  const result = await _getSend(context, providerNamespace, applicationId, options);
  return _getDeserialize(result);
}
