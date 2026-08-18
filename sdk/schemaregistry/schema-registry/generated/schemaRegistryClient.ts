// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SchemaRegistryContext,
  SchemaRegistryClientOptionalParams,
  createSchemaRegistry,
} from "./api/index.js";
import {
  registerSchema,
  getSchemaPropertiesByContent,
  getSchemaByVersion,
  getSchemaById,
  listSchemaVersions,
  listSchemaGroups,
} from "./api/operations.js";
import {
  RegisterSchemaOptionalParams,
  GetSchemaPropertiesByContentOptionalParams,
  GetSchemaByVersionOptionalParams,
  GetSchemaByIdOptionalParams,
  ListSchemaVersionsOptionalParams,
  ListSchemaGroupsOptionalParams,
} from "./api/options.js";
import {
  SchemaContentTypeValues,
  GetSchemaByVersionResponse,
  GetSchemaByIdResponse,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { SchemaRegistryClientOptionalParams } from "./api/schemaRegistryContext.js";

export class SchemaRegistryClient {
  private _client: SchemaRegistryContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** SchemaRegistryClient is a client for registering and retrieving schemas from the Azure Schema Registry service. */
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential,
    options: SchemaRegistryClientOptionalParams = {},
  ) {
    this._client = createSchemaRegistry(fullyQualifiedNamespace, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /** Register new schema. If schema of specified name does not exist in specified group, schema is created at version 1. If schema of specified name exists already in specified group, schema is created at latest version + 1. */
  registerSchema(
    groupName: string,
    schemaName: string,
    schemaContent: Uint8Array,
    contentType: SchemaContentTypeValues,
    options: RegisterSchemaOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return registerSchema(this._client, groupName, schemaName, schemaContent, contentType, options);
  }

  /** Gets the properties referencing an existing schema within the specified schema group, as matched by schema content comparison. */
  getSchemaPropertiesByContent(
    groupName: string,
    schemaName: string,
    contentType: SchemaContentTypeValues,
    schemaContent: Uint8Array,
    options: GetSchemaPropertiesByContentOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return getSchemaPropertiesByContent(
      this._client,
      groupName,
      schemaName,
      contentType,
      schemaContent,
      options,
    );
  }

  /** Gets one specific version of one schema. */
  getSchemaByVersion(
    groupName: string,
    schemaName: string,
    schemaVersion: number,
    options: GetSchemaByVersionOptionalParams = { requestOptions: {} },
  ): Promise<GetSchemaByVersionResponse> {
    return getSchemaByVersion(this._client, groupName, schemaName, schemaVersion, options);
  }

  /** Gets a registered schema by its unique ID.  Azure Schema Registry guarantees that ID is unique within a namespace. Operation response type is based on serialization of schema requested. */
  getSchemaById(
    id: string,
    options: GetSchemaByIdOptionalParams = { requestOptions: {} },
  ): Promise<GetSchemaByIdResponse> {
    return getSchemaById(this._client, id, options);
  }

  /** Gets the list of all versions of one schema. */
  listSchemaVersions(
    groupName: string,
    schemaName: string,
    options: ListSchemaVersionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<number> {
    return listSchemaVersions(this._client, groupName, schemaName, options);
  }

  /** Gets the list of schema groups user is authorized to access. */
  listSchemaGroups(
    options: ListSchemaGroupsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<string> {
    return listSchemaGroups(this._client, options);
  }
}
