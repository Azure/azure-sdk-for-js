// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityContext as Client } from "../index.js";
import {
  communicationIdentityCreateRequestSerializer,
  CommunicationIdentityAccessTokenResult,
  communicationIdentityAccessTokenResultDeserializer,
  CommunicationIdentityAccessToken,
  communicationIdentityAccessTokenDeserializer,
  communicationErrorResponseDeserializer,
  CommunicationIdentityAccessTokenRequest,
  communicationIdentityAccessTokenRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IdentityOperationsIssueAccessTokenOptionalParams,
  IdentityOperationsRevokeAccessTokensOptionalParams,
  IdentityOperationsDeleteOptionalParams,
  IdentityOperationsCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _issueAccessTokenSend(
  context: Client,
  id: string,
  body: CommunicationIdentityAccessTokenRequest,
  options: IdentityOperationsIssueAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/identities/{id}/:issueAccessToken{?api%2Dversion}",
    {
      id: id,
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
    body: communicationIdentityAccessTokenRequestSerializer(body),
  });
}

export async function _issueAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationIdentityAccessToken> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = communicationErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return communicationIdentityAccessTokenDeserializer(result.body);
}

/** Issue a new token for an identity. */
export async function issueAccessToken(
  context: Client,
  id: string,
  body: CommunicationIdentityAccessTokenRequest,
  options: IdentityOperationsIssueAccessTokenOptionalParams = { requestOptions: {} },
): Promise<CommunicationIdentityAccessToken> {
  const result = await _issueAccessTokenSend(context, id, body, options);
  return _issueAccessTokenDeserialize(result);
}

export function _revokeAccessTokensSend(
  context: Client,
  id: string,
  options: IdentityOperationsRevokeAccessTokensOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/identities/{id}/:revokeAccessTokens{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion ?? "2026-09-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeAccessTokensDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Revoke all access tokens for the specific identity. */
export async function revokeAccessTokens(
  context: Client,
  id: string,
  options: IdentityOperationsRevokeAccessTokensOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revokeAccessTokensSend(context, id, options);
  return _revokeAccessTokensDeserialize(result);
}

export function _deleteIdentityOperationSend(
  context: Client,
  id: string,
  options: IdentityOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/identities/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion ?? "2026-09-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteIdentityOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
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

/** Delete the identity, revoke all tokens for the identity and delete all associated data. */
export async function deleteIdentityOperation(
  context: Client,
  id: string,
  options: IdentityOperationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteIdentityOperationSend(context, id, options);
  return _deleteIdentityOperationDeserialize(result);
}

export function _createSend(
  context: Client,
  options: IdentityOperationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/identities{?api%2Dversion}",
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
    body: !options?.body
      ? options?.body
      : communicationIdentityCreateRequestSerializer(options?.body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationIdentityAccessTokenResult> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = communicationErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return communicationIdentityAccessTokenResultDeserializer(result.body);
}

/** Create a new identity, and optionally, an access token. */
export async function create(
  context: Client,
  options: IdentityOperationsCreateOptionalParams = { requestOptions: {} },
): Promise<CommunicationIdentityAccessTokenResult> {
  const result = await _createSend(context, options);
  return _createDeserialize(result);
}
