// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  NotificationRegistration,
  notificationRegistrationSerializer,
  notificationRegistrationDeserializer,
  _NotificationRegistrationArrayResponseWithContinuation,
  _notificationRegistrationArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  NotificationRegistrationsListByProviderRegistrationOptionalParams,
  NotificationRegistrationsDeleteOptionalParams,
  NotificationRegistrationsCreateOrUpdateOptionalParams,
  NotificationRegistrationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByProviderRegistrationSend(
  context: Client,
  providerNamespace: string,
  options: NotificationRegistrationsListByProviderRegistrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/notificationRegistrations{?api%2Dversion}",
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

export async function _listByProviderRegistrationDeserialize(
  result: PathUncheckedResponse,
): Promise<_NotificationRegistrationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _notificationRegistrationArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the notification registrations for the given provider. */
export function listByProviderRegistration(
  context: Client,
  providerNamespace: string,
  options: NotificationRegistrationsListByProviderRegistrationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NotificationRegistration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProviderRegistrationSend(context, providerNamespace, options),
    _listByProviderRegistrationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  providerNamespace: string,
  notificationRegistrationName: string,
  options: NotificationRegistrationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/notificationRegistrations/{notificationRegistrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      notificationRegistrationName: notificationRegistrationName,
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

/** Deletes a notification registration. */
export async function $delete(
  context: Client,
  providerNamespace: string,
  notificationRegistrationName: string,
  options: NotificationRegistrationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    providerNamespace,
    notificationRegistrationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  notificationRegistrationName: string,
  properties: NotificationRegistration,
  options: NotificationRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/notificationRegistrations/{notificationRegistrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      notificationRegistrationName: notificationRegistrationName,
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
    body: notificationRegistrationSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NotificationRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return notificationRegistrationDeserializer(result.body);
}

/** Creates or updates a notification registration. */
export async function createOrUpdate(
  context: Client,
  providerNamespace: string,
  notificationRegistrationName: string,
  properties: NotificationRegistration,
  options: NotificationRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<NotificationRegistration> {
  const result = await _createOrUpdateSend(
    context,
    providerNamespace,
    notificationRegistrationName,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  notificationRegistrationName: string,
  options: NotificationRegistrationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/notificationRegistrations/{notificationRegistrationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      notificationRegistrationName: notificationRegistrationName,
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
): Promise<NotificationRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return notificationRegistrationDeserializer(result.body);
}

/** Gets the notification registration details. */
export async function get(
  context: Client,
  providerNamespace: string,
  notificationRegistrationName: string,
  options: NotificationRegistrationsGetOptionalParams = { requestOptions: {} },
): Promise<NotificationRegistration> {
  const result = await _getSend(context, providerNamespace, notificationRegistrationName, options);
  return _getDeserialize(result);
}
