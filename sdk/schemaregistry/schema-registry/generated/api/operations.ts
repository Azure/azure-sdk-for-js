// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SchemaRegistryContext as Client } from "./index.js";
import {
  _SchemaGroups,
  _schemaGroupsDeserializer,
  _SchemaVersions,
  _schemaVersionsDeserializer,
  SchemaContentTypeValues,
  GetSchemaByVersionResponse,
  GetSchemaByIdResponse,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  RegisterSchemaOptionalParams,
  GetSchemaPropertiesByContentOptionalParams,
  GetSchemaByVersionOptionalParams,
  GetSchemaByIdOptionalParams,
  ListSchemaVersionsOptionalParams,
  ListSchemaGroupsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

export function _registerSchemaSend(
  context: Client,
  groupName: string,
  schemaName: string,
  schemaContent: Uint8Array,
  contentType: SchemaContentTypeValues,
  options: RegisterSchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/$schemaGroups/{groupName}/schemas/{schemaName}{?api%2Dversion}",
    {
      groupName: groupName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion ?? "2023-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      body: uint8ArrayToString(schemaContent, "base64"),
    });
}

export async function _registerSchemaDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Register new schema. If schema of specified name does not exist in specified group, schema is created at version 1. If schema of specified name exists already in specified group, schema is created at latest version + 1. */
export async function registerSchema(
  context: Client,
  groupName: string,
  schemaName: string,
  schemaContent: Uint8Array,
  contentType: SchemaContentTypeValues,
  options: RegisterSchemaOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _registerSchemaSend(
    context,
    groupName,
    schemaName,
    schemaContent,
    contentType,
    options,
  );
  return _registerSchemaDeserialize(result);
}

export function _getSchemaPropertiesByContentSend(
  context: Client,
  groupName: string,
  schemaName: string,
  contentType: SchemaContentTypeValues,
  schemaContent: Uint8Array,
  options: GetSchemaPropertiesByContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/$schemaGroups/{groupName}/schemas/{schemaName}:get-id{?api%2Dversion}",
    {
      groupName: groupName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion ?? "2023-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      body: uint8ArrayToString(schemaContent, "base64"),
    });
}

export async function _getSchemaPropertiesByContentDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Gets the properties referencing an existing schema within the specified schema group, as matched by schema content comparison. */
export async function getSchemaPropertiesByContent(
  context: Client,
  groupName: string,
  schemaName: string,
  contentType: SchemaContentTypeValues,
  schemaContent: Uint8Array,
  options: GetSchemaPropertiesByContentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getSchemaPropertiesByContentSend(
    context,
    groupName,
    schemaName,
    contentType,
    schemaContent,
    options,
  );
  return _getSchemaPropertiesByContentDeserialize(result);
}

export function _getSchemaByVersionSend(
  context: Client,
  groupName: string,
  schemaName: string,
  schemaVersion: number,
  options: GetSchemaByVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/$schemaGroups/{groupName}/schemas/{schemaName}/versions/{schemaVersion}{?api%2Dversion}",
    {
      groupName: groupName,
      schemaName: schemaName,
      schemaVersion: schemaVersion,
      "api%2Dversion": context.apiVersion ?? "2023-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  const requestParameters = operationOptionsToRequestParameters(options);
  return context
    .path(path)
    .get({
      ...requestParameters,
      headers: {
        accept:
          "application/json; serialization=Avro, application/json; serialization=Json, text/plain; charset=utf-8, text/vnd.ms.protobuf",
        ...requestParameters.headers,
      },
    });
}

export async function _getSchemaByVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<GetSchemaByVersionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** Gets one specific version of one schema. */
export async function getSchemaByVersion(
  context: Client,
  groupName: string,
  schemaName: string,
  schemaVersion: number,
  options: GetSchemaByVersionOptionalParams = { requestOptions: {} },
): Promise<GetSchemaByVersionResponse> {
  const result = await _getSchemaByVersionSend(
    context,
    groupName,
    schemaName,
    schemaVersion,
    options,
  );
  return _getSchemaByVersionDeserialize(result);
}

export function _getSchemaByIdSend(
  context: Client,
  id: string,
  options: GetSchemaByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/$schemaGroups/$schemas/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion ?? "2023-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  const requestParameters = operationOptionsToRequestParameters(options);
  return context
    .path(path)
    .get({
      ...requestParameters,
      headers: {
        accept:
          "application/json; serialization=Avro, application/json; serialization=Json, text/plain; charset=utf-8, text/vnd.ms.protobuf",
        ...requestParameters.headers,
      },
    });
}

export async function _getSchemaByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<GetSchemaByIdResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    body: typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body,
  };
}

/** Gets a registered schema by its unique ID.  Azure Schema Registry guarantees that ID is unique within a namespace. Operation response type is based on serialization of schema requested. */
export async function getSchemaById(
  context: Client,
  id: string,
  options: GetSchemaByIdOptionalParams = { requestOptions: {} },
): Promise<GetSchemaByIdResponse> {
  const result = await _getSchemaByIdSend(context, id, options);
  return _getSchemaByIdDeserialize(result);
}

export function _listSchemaVersionsSend(
  context: Client,
  groupName: string,
  schemaName: string,
  options: ListSchemaVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/$schemaGroups/{groupName}/schemas/{schemaName}/versions{?api%2Dversion}",
    {
      groupName: groupName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion ?? "2023-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  const requestParameters = operationOptionsToRequestParameters(options);
  return context
    .path(path)
    .get({
      ...requestParameters,
      headers: { accept: "application/json", ...requestParameters.headers },
    });
}

export async function _listSchemaVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaVersions> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schemaVersionsDeserializer(result.body);
}

/** Gets the list of all versions of one schema. */
export function listSchemaVersions(
  context: Client,
  groupName: string,
  schemaName: string,
  options: ListSchemaVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<number> {
  return buildPagedAsyncIterator(
    context,
    () => _listSchemaVersionsSend(context, groupName, schemaName, options),
    _listSchemaVersionsDeserialize,
    ["200"],
    { itemName: "Value", nextLinkName: "NextLink", apiVersion: context.apiVersion ?? "2023-07-01" },
  );
}

export function _listSchemaGroupsSend(
  context: Client,
  options: ListSchemaGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/$schemaGroups{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  const requestParameters = operationOptionsToRequestParameters(options);
  return context
    .path(path)
    .get({
      ...requestParameters,
      headers: { accept: "application/json", ...requestParameters.headers },
    });
}

export async function _listSchemaGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaGroups> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schemaGroupsDeserializer(result.body);
}

/** Gets the list of schema groups user is authorized to access. */
export function listSchemaGroups(
  context: Client,
  options: ListSchemaGroupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listSchemaGroupsSend(context, options),
    _listSchemaGroupsDeserialize,
    ["200"],
    { itemName: "Value", nextLinkName: "NextLink", apiVersion: context.apiVersion ?? "2023-07-01" },
  );
}
