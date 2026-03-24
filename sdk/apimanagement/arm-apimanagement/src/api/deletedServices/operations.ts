// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { DeletedServiceContract, _DeletedServicesCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  deletedServiceContractDeserializer,
  _deletedServicesCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeletedServicesListBySubscriptionOptionalParams,
  DeletedServicesPurgeOptionalParams,
  DeletedServicesGetByNameOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: DeletedServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/deletedservices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedServicesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _deletedServicesCollectionDeserializer(result.body);
}

/** Lists all soft-deleted services available for undelete for the given subscription. */
export function listBySubscription(
  context: Client,
  options: DeletedServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedServiceContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _purgeSend(
  context: Client,
  location: string,
  serviceName: string,
  options: DeletedServicesPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/deletedservices/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _purgeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedServiceContract> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deletedServiceContractDeserializer(result.body);
}

/** Purges Api Management Service (deletes it with no option to undelete). */
export function purge(
  context: Client,
  location: string,
  serviceName: string,
  options: DeletedServicesPurgeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeletedServiceContract>, DeletedServiceContract> {
  return getLongRunningPoller(context, _purgeDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _purgeSend(context, location, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<DeletedServiceContract>, DeletedServiceContract>;
}

export function _getByNameSend(
  context: Client,
  location: string,
  serviceName: string,
  options: DeletedServicesGetByNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/deletedservices/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getByNameDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedServiceContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deletedServiceContractDeserializer(result.body);
}

/** Get soft-deleted Api Management Service by name. */
export async function getByName(
  context: Client,
  location: string,
  serviceName: string,
  options: DeletedServicesGetByNameOptionalParams = { requestOptions: {} },
): Promise<DeletedServiceContract> {
  const result = await _getByNameSend(context, location, serviceName, options);
  return _getByNameDeserialize(result);
}
