// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityContext as Client } from "../index.js";
import {
  CommunicationIdentityAccessTokenResult,
  communicationIdentityAccessTokenResultDeserializer,
  communicationErrorResponseDeserializer,
  TeamsExtensionExchangeTokenRequest,
  teamsExtensionExchangeTokenRequestSerializer,
  TeamsExtensionAssignmentResponse,
  teamsExtensionAssignmentResponseDeserializer,
  TeamsExtensionAssignmentCreateOrUpdateRequest,
  teamsExtensionAssignmentCreateOrUpdateRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TeamsExtensionOperationsDeleteAssignmentOptionalParams,
  TeamsExtensionOperationsUpsertAssignmentOptionalParams,
  TeamsExtensionOperationsGetAssignmentOptionalParams,
  TeamsExtensionOperationsExchangeTokenOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteAssignmentSend(
  context: Client,
  tenantId: string,
  objectId: string,
  options: TeamsExtensionOperationsDeleteAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/access/teamsExtension/tenants/{tenantId}/assignments/{objectId}{?api%2Dversion}",
    {
      tenantId: tenantId,
      objectId: objectId,
      "api%2Dversion": context.apiVersion ?? "2026-09-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAssignmentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = communicationErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Removes a Teams Phone access assignment. */
export async function deleteAssignment(
  context: Client,
  tenantId: string,
  objectId: string,
  options: TeamsExtensionOperationsDeleteAssignmentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAssignmentSend(context, tenantId, objectId, options);
  return _deleteAssignmentDeserialize(result);
}

export function _upsertAssignmentSend(
  context: Client,
  tenantId: string,
  objectId: string,
  body: TeamsExtensionAssignmentCreateOrUpdateRequest,
  options: TeamsExtensionOperationsUpsertAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/access/teamsExtension/tenants/{tenantId}/assignments/{objectId}{?api%2Dversion}",
    {
      tenantId: tenantId,
      objectId: objectId,
      "api%2Dversion": context.apiVersion ?? "2026-09-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: teamsExtensionAssignmentCreateOrUpdateRequestSerializer(body),
  });
}

export async function _upsertAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<TeamsExtensionAssignmentResponse> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = communicationErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return teamsExtensionAssignmentResponseDeserializer(result.body);
}

/** Creates or replaces a Teams Phone access assignment. */
export async function upsertAssignment(
  context: Client,
  tenantId: string,
  objectId: string,
  body: TeamsExtensionAssignmentCreateOrUpdateRequest,
  options: TeamsExtensionOperationsUpsertAssignmentOptionalParams = { requestOptions: {} },
): Promise<TeamsExtensionAssignmentResponse> {
  const result = await _upsertAssignmentSend(context, tenantId, objectId, body, options);
  return _upsertAssignmentDeserialize(result);
}

export function _getAssignmentSend(
  context: Client,
  tenantId: string,
  objectId: string,
  options: TeamsExtensionOperationsGetAssignmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/access/teamsExtension/tenants/{tenantId}/assignments/{objectId}{?api%2Dversion}",
    {
      tenantId: tenantId,
      objectId: objectId,
      "api%2Dversion": context.apiVersion ?? "2026-09-23",
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

export async function _getAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<TeamsExtensionAssignmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = communicationErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return teamsExtensionAssignmentResponseDeserializer(result.body);
}

/** Get Teams Phone access assignment by object id. */
export async function getAssignment(
  context: Client,
  tenantId: string,
  objectId: string,
  options: TeamsExtensionOperationsGetAssignmentOptionalParams = { requestOptions: {} },
): Promise<TeamsExtensionAssignmentResponse> {
  const result = await _getAssignmentSend(context, tenantId, objectId, options);
  return _getAssignmentDeserialize(result);
}

export function _exchangeTokenSend(
  context: Client,
  body: TeamsExtensionExchangeTokenRequest,
  options: TeamsExtensionOperationsExchangeTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/access/teamsExtension/:exchangeAccessToken{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-09-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: teamsExtensionExchangeTokenRequestSerializer(body),
  });
}

export async function _exchangeTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationIdentityAccessTokenResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = communicationErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return communicationIdentityAccessTokenResultDeserializer(result.body);
}

/** Exchanges a Teams Phone token for an ACS user access token. */
export async function exchangeToken(
  context: Client,
  body: TeamsExtensionExchangeTokenRequest,
  options: TeamsExtensionOperationsExchangeTokenOptionalParams = { requestOptions: {} },
): Promise<CommunicationIdentityAccessTokenResult> {
  const result = await _exchangeTokenSend(context, body, options);
  return _exchangeTokenDeserialize(result);
}
