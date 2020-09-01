// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, OperationOptions, HttpOperationResponse } from "@azure/core-http";

/**
 * Schema definition.
 */
export interface SchemaDefinition {
  /** String representation of schema. */
  content: string;
}

/**
 * Identifies a Schema by its unique ID, version, and location.
 */
export interface SchemaId {
  /** ID that uniquely identifies a schema in the registry namespace. */
  id: string;

  /** Automatically incremented version number of the schema. */
  version: number;

  /** URL of schema by group and name. */
  location: string;

  /** URL of schema by ID. */
  locationById: string;
}

/**
 * Schema definition with its unique ID, version, and location.
 */
export interface Schema extends SchemaDefinition, SchemaId {}

/**
 * Schema definition with its group, name, and serialization type.
 */
export interface SchemaDescription extends SchemaDefinition {
  /** Schema group under which schema is or should be registered. */
  group: string;

  /** Name of schema.*/
  name: string;

  /**
   * Serialization type of schema. Must match serialization type of group.
   * Currently only 'avro' is supported, but this is subject to change.
   */
  serializationType: string;
}

/**
 * Provides access to underlying HTTP response.
 */
export interface Response {
  /** The underlying HTTP reponse. */
  _response: HttpOperationResponse;
}

/**
 * Schema with underlying HTTP response.
 */
export interface SchemaResponse extends Schema, Response {}

/**
 * SchemaId with underlying HTTP reponse.
 */
export interface SchemaIdResponse extends SchemaId, Response {}

/**
 * Options for SchemaRegistrationClient.
 */
export interface SchemaRegistryClientOptions extends PipelineOptions {}

/**
 * Options for SchemaRegistryClient.registerSchema.
 */
export interface RegisterSchemaOptions extends OperationOptions {}

/**
 * Options for SchemaRegistryClient.getSchemaId.
 */
export interface GetSchemaIdOptions extends OperationOptions {}

/**
 * Options to configure SchemaRegistryClient.getSchemaById.
 */
export interface GetSchemaByIdOptions extends OperationOptions {}
