// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Properties of a schema.
 */
export interface SchemaProperties {
  /** ID that uniquely identifies a schema in the registry namespace. */
  id: string;

  /**
   * Serialization type of schema.
   * Currently only 'avro' is supported, but this is subject to change.
   */
  format: string;

  /** Schema group under which schema is or should be registered. */
  groupName: string;

  /** Name of schema.*/
  name: string;
}

/**
 * Schema definition with its name, format, and group.
 */
export interface SchemaDescription {
  /** Schema group under which schema is or should be registered. */
  groupName: string;

  /** Name of schema.*/
  name: string;

  /**
   * The format of schema and it must match the serialization type of the schema's group.
   * "Avro" is the only currently accepted value at the time of this package's release.
   */
  format: string;

  /** String representation of schema. */
  definition: string;
}

/**
 * Schema definition with its properties.
 */
export interface Schema {
  /** string representation of the schema. */
  definition: string;
  /** The properties of the schema */
  properties: SchemaProperties;
}

/**
 * Options for SchemaRegistrationClient.
 */
export interface SchemaRegistryClientOptions extends CommonClientOptions {
  /**
   * The service API version to use in requests. The default is "2021-10".
   */
  apiVersion?: string;
}

/**
 * Options for SchemaRegistryClient.registerSchema.
 */
export interface RegisterSchemaOptions extends OperationOptions {}

/**
 * Options for SchemaRegistryClient.getSchemaProperties.
 */
export interface GetSchemaPropertiesOptions extends OperationOptions {}

/**
 * Options to configure SchemaRegistryClient.getSchema.
 */
export interface GetSchemaOptions extends OperationOptions {}

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
  registerSchema(
    schema: SchemaDescription,
    options?: RegisterSchemaOptions
  ): Promise<SchemaProperties>;

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * definition.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID.
   */
  getSchemaProperties(
    schema: SchemaDescription,
    options?: GetSchemaPropertiesOptions
  ): Promise<SchemaProperties>;

  /**
   * Gets an existing schema by ID.
   *
   * @param schemaId - Unique schema ID.
   * @returns Schema with given ID.
   */
  getSchema(schemaId: string, options?: GetSchemaOptions): Promise<Schema>;
}
