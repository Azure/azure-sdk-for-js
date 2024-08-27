// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListSchemaGroupsParameters,
  ListSchemaVersionsParameters,
  GetSchemaByIdParameters,
  GetSchemaByVersionParameters,
  GetSchemaPropertiesByContentParameters,
  RegisterSchemaParameters,
} from "./parameters.js";
import {
  ListSchemaGroups200Response,
  ListSchemaGroupsDefaultResponse,
  ListSchemaVersions200Response,
  ListSchemaVersionsDefaultResponse,
  GetSchemaById200Response,
  GetSchemaByIdDefaultResponse,
  GetSchemaByVersion200Response,
  GetSchemaByVersionDefaultResponse,
  GetSchemaPropertiesByContent204Response,
  GetSchemaPropertiesByContentDefaultResponse,
  RegisterSchema204Response,
  RegisterSchemaDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListSchemaGroups {
  /** Gets the list of schema groups user is authorized to access. */
  get(
    options?: ListSchemaGroupsParameters,
  ): StreamableMethod<ListSchemaGroups200Response | ListSchemaGroupsDefaultResponse>;
}

export interface ListSchemaVersions {
  /** Gets the list of all versions of one schema. */
  get(
    options?: ListSchemaVersionsParameters,
  ): StreamableMethod<ListSchemaVersions200Response | ListSchemaVersionsDefaultResponse>;
}

export interface GetSchemaById {
  /** Gets a registered schema by its unique ID.  Azure Schema Registry guarantees that ID is unique within a namespace. Operation response type is based on serialization of schema requested. */
  get(
    options?: GetSchemaByIdParameters,
  ): StreamableMethod<GetSchemaById200Response | GetSchemaByIdDefaultResponse>;
}

export interface GetSchemaByVersion {
  /** Gets one specific version of one schema. */
  get(
    options?: GetSchemaByVersionParameters,
  ): StreamableMethod<GetSchemaByVersion200Response | GetSchemaByVersionDefaultResponse>;
}

export interface GetSchemaPropertiesByContent {
  /** Gets the properties referencing an existing schema within the specified schema group, as matched by schema content comparison. */
  post(
    options: GetSchemaPropertiesByContentParameters,
  ): StreamableMethod<
    GetSchemaPropertiesByContent204Response | GetSchemaPropertiesByContentDefaultResponse
  >;
}

export interface RegisterSchema {
  /** Register new schema. If schema of specified name does not exist in specified group, schema is created at version 1. If schema of specified name exists already in specified group, schema is created at latest version + 1. */
  put(
    options: RegisterSchemaParameters,
  ): StreamableMethod<RegisterSchema204Response | RegisterSchemaDefaultResponse>;
}

export interface Routes {
  /** Resource for '/$schemaGroups' has methods for the following verbs: get */
  (path: "/$schemaGroups"): ListSchemaGroups;
  /** Resource for '/$schemaGroups/\{groupName\}/schemas/\{schemaName\}/versions' has methods for the following verbs: get */
  (
    path: "/$schemaGroups/{groupName}/schemas/{schemaName}/versions",
    groupName: string,
    schemaName: string,
  ): ListSchemaVersions;
  /** Resource for '/$schemaGroups/$schemas/\{id\}' has methods for the following verbs: get */
  (path: "/$schemaGroups/$schemas/{id}", id: string): GetSchemaById;
  /** Resource for '/$schemaGroups/\{groupName\}/schemas/\{schemaName\}/versions/\{schemaVersion\}' has methods for the following verbs: get */
  (
    path: "/$schemaGroups/{groupName}/schemas/{schemaName}/versions/{schemaVersion}",
    groupName: string,
    schemaName: string,
    schemaVersion: number,
  ): GetSchemaByVersion;
  /** Resource for '/$schemaGroups/\{groupName\}/schemas/\{schemaName\}:get-id' has methods for the following verbs: post */
  (
    path: "/$schemaGroups/{groupName}/schemas/{schemaName}:get-id",
    groupName: string,
    schemaName: string,
  ): GetSchemaPropertiesByContent;
  /** Resource for '/$schemaGroups/\{groupName\}/schemas/\{schemaName\}' has methods for the following verbs: put */
  (
    path: "/$schemaGroups/{groupName}/schemas/{schemaName}",
    groupName: string,
    schemaName: string,
  ): RegisterSchema;
}

export type SchemaRegistryClient = Client & {
  path: Routes;
};
