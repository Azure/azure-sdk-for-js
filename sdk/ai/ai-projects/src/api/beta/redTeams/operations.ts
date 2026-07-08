// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type { RedTeam, _PagedRedTeam } from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  redTeamSerializer,
  redTeamDeserializer,
  _pagedRedTeamDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaRedTeamsCreateOptionalParams,
  BetaRedTeamsListOptionalParams,
  BetaRedTeamsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  redTeam: RedTeam,
  options: BetaRedTeamsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "RedTeams=V1Preview";
  const path = expandUrlTemplate(
    "/redTeams/runs:run{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: redTeamSerializer(redTeam),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<RedTeam> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return redTeamDeserializer(result.body);
}

/** Submits a new redteam run for execution with the provided configuration. */
export async function create(
  context: Client,
  redTeam: RedTeam,
  options: BetaRedTeamsCreateOptionalParams = { requestOptions: {} },
): Promise<RedTeam> {
  const result = await _createSend(context, redTeam, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaRedTeamsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "RedTeams=V1Preview";
  const path = expandUrlTemplate(
    "/redTeams/runs{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedRedTeam> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedRedTeamDeserializer(result.body);
}

/** Returns the redteams available in the current project. */
export function list(
  context: Client,
  options: BetaRedTeamsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RedTeam> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: {
          "foundry-features": "RedTeams=V1Preview",
        },
      },
    },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: BetaRedTeamsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "RedTeams=V1Preview";
  const path = expandUrlTemplate(
    "/redTeams/runs/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RedTeam> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return redTeamDeserializer(result.body);
}

/** Retrieves the specified redteam and its configuration. */
export async function get(
  context: Client,
  name: string,
  options: BetaRedTeamsGetOptionalParams = { requestOptions: {} },
): Promise<RedTeam> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
