// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext as Client } from "../index.js";
import type {
  DependencyOfRelationship,
  _DependencyOfRelationshipListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dependencyOfRelationshipSerializer,
  dependencyOfRelationshipDeserializer,
  _dependencyOfRelationshipListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DependencyOfRelationshipsByServiceGroupListOptionalParams,
  DependencyOfRelationshipsByServiceGroupDeleteOptionalParams,
  DependencyOfRelationshipsByServiceGroupCreateOrUpdateOptionalParams,
  DependencyOfRelationshipsByServiceGroupGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  serviceGroupName: string,
  options: DependencyOfRelationshipsByServiceGroupListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Relationships/dependencyOf{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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
): Promise<_DependencyOfRelationshipListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dependencyOfRelationshipListResultDeserializer(result.body);
}
/** List DependencyOfRelationship resources by scope */
export function list(
  context: Client,
  serviceGroupName: string,
  options: DependencyOfRelationshipsByServiceGroupListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DependencyOfRelationship> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  serviceGroupName: string,
  name: string,
  options: DependencyOfRelationshipsByServiceGroupDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Relationships/dependencyOf/{name}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Delete a DependencyOfRelationship */
export function $delete(
  context: Client,
  serviceGroupName: string,
  name: string,
  options: DependencyOfRelationshipsByServiceGroupDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, serviceGroupName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  serviceGroupName: string,
  name: string,
  resource: DependencyOfRelationship,
  options: DependencyOfRelationshipsByServiceGroupCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Relationships/dependencyOf/{name}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dependencyOfRelationshipSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DependencyOfRelationship> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dependencyOfRelationshipDeserializer(result.body);
}
/** Create a DependencyOfRelationship */
export function createOrUpdate(
  context: Client,
  serviceGroupName: string,
  name: string,
  resource: DependencyOfRelationship,
  options: DependencyOfRelationshipsByServiceGroupCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DependencyOfRelationship>, DependencyOfRelationship> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, serviceGroupName, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-01",
  }) as PollerLike<OperationState<DependencyOfRelationship>, DependencyOfRelationship>;
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  name: string,
  options: DependencyOfRelationshipsByServiceGroupGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.Relationships/dependencyOf/{name}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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
): Promise<DependencyOfRelationship> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dependencyOfRelationshipDeserializer(result.body);
}
/** Get a DependencyOfRelationship */
export async function get(
  context: Client,
  serviceGroupName: string,
  name: string,
  options: DependencyOfRelationshipsByServiceGroupGetOptionalParams = { requestOptions: {} },
): Promise<DependencyOfRelationship> {
  const result = await _getSend(context, serviceGroupName, name, options);
  return _getDeserialize(result);
}
