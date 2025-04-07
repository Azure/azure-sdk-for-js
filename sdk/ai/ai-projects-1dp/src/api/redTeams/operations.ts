// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  RedTeam,
  redTeamSerializer,
  redTeamDeserializer,
  _PagedRedTeam,
  _pagedRedTeamDeserializer,
} from "../../models/models.js";
import {
  RedTeamsCreateRunOptionalParams,
  RedTeamsListOptionalParams,
  RedTeamsGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createRunSend(
  context: Client,
  redTeam: RedTeam,
  options: RedTeamsCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/redTeams/runs:run{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: redTeamSerializer(redTeam),
  });
}

export async function _createRunDeserialize(result: PathUncheckedResponse): Promise<RedTeam> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return redTeamDeserializer(result.body);
}

/** Creates a redteam run. */
export async function createRun(
  context: Client,
  redTeam: RedTeam,
  options: RedTeamsCreateRunOptionalParams = { requestOptions: {} },
): Promise<RedTeam> {
  const result = await _createRunSend(context, redTeam, options);
  return _createRunDeserialize(result);
}

export function _listSend(
  context: Client,
  options: RedTeamsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/redTeams/runs{?api%2Dversion,top,skip,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
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

/** List a redteam by name. */
export function list(
  context: Client,
  options: RedTeamsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RedTeam> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: RedTeamsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/redTeams/runs/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
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

/** Get a redteam by name. */
export async function get(
  context: Client,
  name: string,
  options: RedTeamsGetOptionalParams = { requestOptions: {} },
): Promise<RedTeam> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
