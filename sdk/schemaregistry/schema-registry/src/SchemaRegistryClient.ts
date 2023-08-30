// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { CustomPage, CustomVersionPage } from "./models/models.js";
import {
  ListSchemaGroupsOptions,
  GetSchemaByIdOptions,
  ListSchemaVersionsOptions,
  GetSchemaByVersionOptions,
  GetSchemaIdByContentOptions,
  RegisterSchemaOptions,
} from "./models/options.js";
import {
  listSchemaGroups,
  getSchemaById,
  listSchemaVersions,
  getSchemaByVersion,
  getSchemaIdByContent,
  registerSchema,
  createSchemaRegistry,
  SchemaRegistryClientOptions,
  SchemaRegistryContext,
} from "./api/index.js";

export { SchemaRegistryClientOptions } from "./api/SchemaRegistryContext.js";

export class SchemaRegistryClient {
  private _client: SchemaRegistryContext;

  constructor(
    endpoint: string,
    credential: TokenCredential,
    options: SchemaRegistryClientOptions = {}
  ) {
    this._client = createSchemaRegistry(endpoint, credential, options);
  }

  /** Gets the list of schema groups user is authorized to access. */
  listSchemaGroups(
    options: ListSchemaGroupsOptions = { requestOptions: {} }
  ): Promise<CustomPage> {
    return listSchemaGroups(this._client, options);
  }

  /** Gets a registered schema by its unique ID.  Azure Schema Registry guarantees that ID is unique within a namespace. Operation response type is based on serialization of schema requested. */
  getSchemaById(
    id: string,
    options: GetSchemaByIdOptions = { requestOptions: {} }
  ): Promise<Uint8Array> {
    return getSchemaById(this._client, id, options);
  }

  /** Gets the list of all versions of one schema. */
  listSchemaVersions(
    groupName: string,
    name: string,
    options: ListSchemaVersionsOptions = { requestOptions: {} }
  ): Promise<CustomVersionPage> {
    return listSchemaVersions(this._client, groupName, name, options);
  }

  /** Gets one specific version of one schema. */
  getSchemaByVersion(
    groupName: string,
    name: string,
    schemaVersion: number,
    options: GetSchemaByVersionOptions = { requestOptions: {} }
  ): Promise<Uint8Array> {
    return getSchemaByVersion(
      this._client,
      groupName,
      name,
      schemaVersion,
      options
    );
  }

  /** Gets the ID referencing an existing schema within the specified schema group, as matched by schema content comparison. */
  getSchemaIdByContent(
    schemaContent: Uint8Array,
    groupName: string,
    name: string,
    options: GetSchemaIdByContentOptions = { requestOptions: {} }
  ): Promise<void> {
    return getSchemaIdByContent(
      this._client,
      schemaContent,
      groupName,
      name,
      options
    );
  }

  /** Register new schema. If schema of specified name does not exist in specified group, schema is created at version 1. If schema of specified name exists already in specified group, schema is created at latest version + 1. */
  registerSchema(
    content: Uint8Array,
    groupName: string,
    name: string,
    options: RegisterSchemaOptions = { requestOptions: {} }
  ): Promise<void> {
    return registerSchema(this._client, content, groupName, name, options);
  }
}
