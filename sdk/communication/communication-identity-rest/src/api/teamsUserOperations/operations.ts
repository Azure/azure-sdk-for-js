// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityContext as Client } from "../index.js";
import {
  CommunicationIdentityAccessToken,
  communicationIdentityAccessTokenDeserializer,
  communicationErrorResponseDeserializer,
  TeamsUserExchangeTokenRequest,
  teamsUserExchangeTokenRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { TeamsUserOperationsExchangeTeamsUserAccessTokenOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _exchangeTeamsUserAccessTokenSend(
  context: Client,
  body: TeamsUserExchangeTokenRequest,
  options: TeamsUserOperationsExchangeTeamsUserAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/teamsUser/:exchangeAccessToken{?api%2Dversion}",
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
    body: teamsUserExchangeTokenRequestSerializer(body),
  });
}

export async function _exchangeTeamsUserAccessTokenDeserialize(
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

/** Exchange an Entra ID access token of a Teams user for a new Communication Identity access token with a matching expiration time. */
export async function exchangeTeamsUserAccessToken(
  context: Client,
  body: TeamsUserExchangeTokenRequest,
  options: TeamsUserOperationsExchangeTeamsUserAccessTokenOptionalParams = { requestOptions: {} },
): Promise<CommunicationIdentityAccessToken> {
  const result = await _exchangeTeamsUserAccessTokenSend(context, body, options);
  return _exchangeTeamsUserAccessTokenDeserialize(result);
}
