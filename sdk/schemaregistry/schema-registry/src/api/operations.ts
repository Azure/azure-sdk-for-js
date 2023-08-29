// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CustomPage } from "../models/models.js";
import {
  GetSchemaById200Response,
  GetSchemaByIdDefaultResponse,
  GetSchemaByVersion200Response,
  GetSchemaByVersionDefaultResponse,
  GetSchemaIdByContent204Response,
  GetSchemaIdByContentDefaultResponse,
  isUnexpected,
  ListSchemaGroups200Response,
  ListSchemaGroupsDefaultResponse,
  ListSchemaVersions200Response,
  ListSchemaVersionsDefaultResponse,
  RegisterSchema204Response,
  RegisterSchemaDefaultResponse,
  SchemaRegistryContext as Client,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  ListSchemaGroupsOptions,
  GetSchemaByIdOptions,
  ListSchemaVersionsOptions,
  GetSchemaByVersionOptions,
  GetSchemaIdByContentOptions,
  RegisterSchemaOptions,
} from "../models/options.js";

export function _listSchemaGroupsSend(
  context: Client,
  options: ListSchemaGroupsOptions = { requestOptions: {} }
): StreamableMethod<
  ListSchemaGroups200Response | ListSchemaGroupsDefaultResponse
> {
  return context
    .path("/$schemaGroups")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listSchemaGroupsDeserialize(
  result: ListSchemaGroups200Response | ListSchemaGroupsDefaultResponse
): Promise<CustomPage> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      groupName: p["groupName"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/** Gets the list of schema groups user is authorized to access. */
export async function listSchemaGroups(
  context: Client,
  options: ListSchemaGroupsOptions = { requestOptions: {} }
): Promise<CustomPage> {
  const result = await _listSchemaGroupsSend(context, options);
  return _listSchemaGroupsDeserialize(result);
}

export function _getSchemaByIdSend(
  context: Client,
  id: string,
  options: GetSchemaByIdOptions = { requestOptions: {} }
): StreamableMethod<GetSchemaById200Response | GetSchemaByIdDefaultResponse> {
  return context
    .path("/$schemaGroups/$schemas/{id}", id)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getSchemaByIdDeserialize(
  result: GetSchemaById200Response | GetSchemaByIdDefaultResponse
): Promise<Uint8Array> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Gets a registered schema by its unique ID.  Azure Schema Registry guarantees that ID is unique within a namespace. Operation response type is based on serialization of schema requested. */
export async function getSchemaById(
  context: Client,
  id: string,
  options: GetSchemaByIdOptions = { requestOptions: {} }
): Promise<Uint8Array> {
  const result = await _getSchemaByIdSend(context, id, options);
  return _getSchemaByIdDeserialize(result);
}

export function _listSchemaVersionsSend(
  context: Client,
  groupName: string,
  name: string,
  options: ListSchemaVersionsOptions = { requestOptions: {} }
): StreamableMethod<
  ListSchemaVersions200Response | ListSchemaVersionsDefaultResponse
> {
  return context
    .path("/$schemaGroups/{groupName}/schemas/{name}/versions", groupName, name)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listSchemaVersionsDeserialize(
  result: ListSchemaVersions200Response | ListSchemaVersionsDefaultResponse
): Promise<CustomPage> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      schemaVersion: p["schemaVersion"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/** Gets the list of all versions of one schema. */
export async function listSchemaVersions(
  context: Client,
  groupName: string,
  name: string,
  options: ListSchemaVersionsOptions = { requestOptions: {} }
): Promise<CustomPage> {
  const result = await _listSchemaVersionsSend(
    context,
    groupName,
    name,
    options
  );
  return _listSchemaVersionsDeserialize(result);
}

export function _getSchemaByVersionSend(
  context: Client,
  groupName: string,
  name: string,
  schemaVersion: number,
  options: GetSchemaByVersionOptions = { requestOptions: {} }
): StreamableMethod<
  GetSchemaByVersion200Response | GetSchemaByVersionDefaultResponse
> {
  return context
    .path(
      "/$schemaGroups/{groupName}/schemas/{name}/versions/{schemaVersion}",
      groupName,
      name,
      schemaVersion
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getSchemaByVersionDeserialize(
  result: GetSchemaByVersion200Response | GetSchemaByVersionDefaultResponse
): Promise<Uint8Array> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Gets one specific version of one schema. */
export async function getSchemaByVersion(
  context: Client,
  groupName: string,
  name: string,
  schemaVersion: number,
  options: GetSchemaByVersionOptions = { requestOptions: {} }
): Promise<Uint8Array> {
  const result = await _getSchemaByVersionSend(
    context,
    groupName,
    name,
    schemaVersion,
    options
  );
  return _getSchemaByVersionDeserialize(result);
}

export function _getSchemaIdByContentSend(
  context: Client,
  schemaContent: Uint8Array,
  groupName: string,
  name: string,
  options: GetSchemaIdByContentOptions = { requestOptions: {} }
): StreamableMethod<
  GetSchemaIdByContent204Response | GetSchemaIdByContentDefaultResponse
> {
  return context
    .path("/$schemaGroups/{groupName}/schemas/{name}:get-id", groupName, name)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ?? "application/json; serialization=Avro",
      body: schemaContent,
    });
}

export async function _getSchemaIdByContentDeserialize(
  result: GetSchemaIdByContent204Response | GetSchemaIdByContentDefaultResponse
): Promise<void> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

/** Gets the ID referencing an existing schema within the specified schema group, as matched by schema content comparison. */
export async function getSchemaIdByContent(
  context: Client,
  schemaContent: Uint8Array,
  groupName: string,
  name: string,
  options: GetSchemaIdByContentOptions = { requestOptions: {} }
): Promise<void> {
  const result = await _getSchemaIdByContentSend(
    context,
    schemaContent,
    groupName,
    name,
    options
  );
  return _getSchemaIdByContentDeserialize(result);
}

export function _registerSchemaSend(
  context: Client,
  content: Uint8Array,
  groupName: string,
  name: string,
  options: RegisterSchemaOptions = { requestOptions: {} }
): StreamableMethod<RegisterSchema204Response | RegisterSchemaDefaultResponse> {
  return context
    .path("/$schemaGroups/{groupName}/schemas/{name}", groupName, name)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ?? "application/json; serialization=Avro",
      body: content,
    });
}

export async function _registerSchemaDeserialize(
  result: RegisterSchema204Response | RegisterSchemaDefaultResponse
): Promise<void> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

/** Register new schema. If schema of specified name does not exist in specified group, schema is created at version 1. If schema of specified name exists already in specified group, schema is created at latest version + 1. */
export async function registerSchema(
  context: Client,
  content: Uint8Array,
  groupName: string,
  name: string,
  options: RegisterSchemaOptions = { requestOptions: {} }
): Promise<void> {
  const result = await _registerSchemaSend(
    context,
    content,
    groupName,
    name,
    options
  );
  return _registerSchemaDeserialize(result);
}
