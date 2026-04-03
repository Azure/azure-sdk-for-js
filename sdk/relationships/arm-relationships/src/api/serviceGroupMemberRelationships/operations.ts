// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext as Client } from "../index.js";
import type {
  ServiceGroupMemberRelationshipCreateOrUpdate,
  ServiceGroupMemberRelationship,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serviceGroupMemberRelationshipCreateOrUpdateSerializer,
  serviceGroupMemberRelationshipDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServiceGroupMemberRelationshipsDeleteOptionalParams,
  ServiceGroupMemberRelationshipsGetOptionalParams,
  ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  name: string,
  options: ServiceGroupMemberRelationshipsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Relationships/serviceGroupMember/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2023-09-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a ServiceGroupMemberRelationship */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceUri: string,
  name: string,
  options: ServiceGroupMemberRelationshipsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  name: string,
  options: ServiceGroupMemberRelationshipsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Relationships/serviceGroupMember/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2023-09-01-preview",
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
): Promise<ServiceGroupMemberRelationship> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serviceGroupMemberRelationshipDeserializer(result.body);
}

/** Get a ServiceGroupMemberRelationship */
export async function get(
  context: Client,
  resourceUri: string,
  name: string,
  options: ServiceGroupMemberRelationshipsGetOptionalParams = { requestOptions: {} },
): Promise<ServiceGroupMemberRelationship> {
  const result = await _getSend(context, resourceUri, name, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  name: string,
  resource: ServiceGroupMemberRelationshipCreateOrUpdate,
  options: ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Relationships/serviceGroupMember/{name}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2023-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceGroupMemberRelationshipCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceGroupMemberRelationship> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serviceGroupMemberRelationshipDeserializer(result.body);
}

/** Create a ServiceGroupMemberRelationship */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  name: string,
  resource: ServiceGroupMemberRelationshipCreateOrUpdate,
  options: ServiceGroupMemberRelationshipsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServiceGroupMemberRelationship>, ServiceGroupMemberRelationship> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, resourceUri, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2023-09-01-preview",
  }) as PollerLike<OperationState<ServiceGroupMemberRelationship>, ServiceGroupMemberRelationship>;
}
