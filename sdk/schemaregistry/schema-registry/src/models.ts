// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Identifies a Schema by its unique ID, version, and location.
 */
export interface SchemaId {
  /** ID that uniquely identifies a schema in the registry namespace. */
  id: string;

  /**
   * Serialization type of schema.
   * Currently only 'avro' is supported, but this is subject to change.
   */
  serializationType: string;

  /** Automatically incremented version number of the schema. */
  version: number;

  /** URL of schema by group and name. */
  location: string;

  /** URL of schema by ID. */
  locationById: string;
}

/**
 * Schema definition with its group, name, and serialization type.
 */
export interface SchemaDescription {
  /** Schema group under which schema is or should be registered. */
  group: string;

  /** Name of schema.*/
  name: string;

  /**
   * Serialization type of schema. Must match serialization type of group.
   * Currently only 'avro' is supported, but this is subject to change.
   */
  serializationType: string;

  /** String representation of schema. */
  content: string;
}

/**
 * Schema definition with its unique ID, version, and location.
 */
export interface Schema extends SchemaId {
  /** String representation of schema. */
  content: string;
}

/**
 * Options for SchemaRegistrationClient.
 */
export interface SchemaRegistryClientOptions extends CommonClientOptions {}

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

/**
 * Represents a store of registered schemas.
 *
 * Implemented by SchemaRegistryClient to store the schemas using the Azure
 * Schema Registry service.
 */
export interface SchemaRegistry {
  /**
   * Registers a new schema and returns its ID.
   *
   * If schema of specified name does not exist in the specified group, a schema
   * is created at version 1. If schema of specified name exists already in
   * specified group, schema is created at latest version + 1.
   *
   * @param schema - Schema to register.
   * @returns Registered schema's ID.
   */
  registerSchema(schema: SchemaDescription, options?: RegisterSchemaOptions): Promise<SchemaId>;

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * content.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID or undefined if no matching schema was found.
   */
  getSchemaId(
    schema: SchemaDescription,
    options?: GetSchemaIdOptions
  ): Promise<SchemaId | undefined>;

  /**
   * Gets an existing schema by ID.
   *
   * @param id - Unique schema ID.
   * @returns Schema with given ID or undefined if no schema was found with the given ID.
   */
  getSchemaById(id: string, options?: GetSchemaByIdOptions): Promise<Schema | undefined>;
}
