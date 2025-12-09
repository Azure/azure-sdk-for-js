// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../index.js";
import type {
  RedTeam,
  _PagedRedTeam} from "../../models/models.js";
import {
  redTeamSerializer,
  redTeamDeserializer,
  _pagedRedTeamDeserializer,
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RedTeamsCreateOptionalParams,
  RedTeamsListOptionalParams,
  RedTeamsGetOptionalParams,
} from "./options.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  redTeam: RedTeam,
  options: RedTeamsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: redTeamSerializer(redTeam),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<RedTeam> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return redTeamDeserializer(result.body);
}

/** Creates a redteam run. */
export async function create(
  context: Client,
  redTeam: RedTeam,
  options: RedTeamsCreateOptionalParams = { requestOptions: {} },
): Promise<RedTeam> {
  const result = await _createSend(context, redTeam, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: RedTeamsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
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
