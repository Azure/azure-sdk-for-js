// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext as Client } from "../index.js";
import {
  errorResponseBodyDeserializer,
  StudentLabDetails,
  studentLabDetailsDeserializer,
  _StudentLabListResult,
  _studentLabListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { StudentLabsListAllOptionalParams, StudentLabsGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listAllSend(
  context: Client,
  options: StudentLabsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Education/studentLabs{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_StudentLabListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseBodyDeserializer(result.body);
    }

    throw error;
  }

  return _studentLabListResultDeserializer(result.body);
}

/** Get a list of all labs associated with the caller of the API. */
export function listAll(
  context: Client,
  options: StudentLabsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StudentLabDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-12-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  studentLabName: string,
  options: StudentLabsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Education/studentLabs/{studentLabName}{?api%2Dversion}",
    {
      studentLabName: studentLabName,
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StudentLabDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseBodyDeserializer(result.body);
    }

    throw error;
  }

  return studentLabDetailsDeserializer(result.body);
}

/** Get the details for a specified lab associated with the student lab. */
export async function get(
  context: Client,
  studentLabName: string,
  options: StudentLabsGetOptionalParams = { requestOptions: {} },
): Promise<StudentLabDetails> {
  const result = await _getSend(context, studentLabName, options);
  return _getDeserialize(result);
}
