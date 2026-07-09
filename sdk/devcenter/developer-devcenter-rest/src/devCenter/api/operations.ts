// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterContext as Client } from "./index.js";
import {
  _PagedProject,
  _pagedProjectDeserializer,
  Project,
  projectDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GetProjectOptionalParams, ListProjectsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getProjectSend(
  context: Client,
  projectName: string,
  options: GetProjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getProjectDeserialize(result: PathUncheckedResponse): Promise<Project> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return projectDeserializer(result.body);
}

/** Gets a project. */
export async function getProject(
  context: Client,
  projectName: string,
  options: GetProjectOptionalParams = { requestOptions: {} },
): Promise<Project> {
  const result = await _getProjectSend(context, projectName, options);
  return _getProjectDeserialize(result);
}

export function _listProjectsSend(
  context: Client,
  options: ListProjectsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listProjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedProject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedProjectDeserializer(result.body);
}

/** Lists all projects. */
export function listProjects(
  context: Client,
  options: ListProjectsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Project> {
  return buildPagedAsyncIterator(
    context,
    () => _listProjectsSend(context, options),
    _listProjectsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}
