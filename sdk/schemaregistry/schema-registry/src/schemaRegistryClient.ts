// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeneratedSchemaRegistryClient } from "./generated/generatedSchemaRegistryClient";
import { TokenCredential } from "@azure/core-http";
import { createPipeline } from "./pipeline";
import { convertSchemaIdResponse, convertSchemaResponse } from "./conversions";

import {
  GetSchemaByIdOptions,
  GetSchemaIdOptions,
  SchemaDescription,
  SchemaRegistryClientOptions,
  SchemaRegistry,
  RegisterSchemaOptions,
  SchemaId,
  Schema
} from "./models";

/**
 * Client for Azure Schema Registry service.
 */
export class SchemaRegistryClient implements SchemaRegistry {
  /** The Schema Registry service endpoint URL. */
  readonly endpoint: string;

  /** Underlying autorest generated client. */
  private readonly client: GeneratedSchemaRegistryClient;

  /**
   * Creates a new client for Azure Schema Registry service.
   *
   * @param endpoint - The Schema Registry service endpoint URL, for example
   *                   https://mynamespace.servicebus.windows.net.
   * @param credential - Credential to authenticate requests to the service.
   * @param options - Options to configure API requests to the service.
   */
  constructor(
    endpoint: string,
    credential: TokenCredential,
    options: SchemaRegistryClientOptions = {}
  ) {
    const pipeline = createPipeline(options, credential);
    this.endpoint = endpoint;
    this.client = new GeneratedSchemaRegistryClient(endpoint, { ...pipeline, endpoint });
  }

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
  async registerSchema(
    schema: SchemaDescription,
    options?: RegisterSchemaOptions
  ): Promise<SchemaId> {
    const response = await this.client.schema.register(
      schema.group,
      schema.name,
      schema.serializationType,
      schema.content,
      options
    );
    return convertSchemaIdResponse(response);
  }

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * content.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID or undefined if no matching schema was found.
   */
  async getSchemaId(
    schema: SchemaDescription,
    options?: GetSchemaIdOptions
  ): Promise<SchemaId | undefined> {
    try {
      const response = await this.client.schema.queryIdByContent(
        schema.group,
        schema.name,
        schema.serializationType,
        schema.content,
        options
      );
      return convertSchemaIdResponse(response);
    } catch (error) {
      if (typeof error === "object" && error?.statusCode === 404) {
        return undefined;
      }
      throw error;
    }
  }

  /**
   * Gets an existing schema by ID.
   *
   * @param id - Unique schema ID.
   * @returns Schema with given ID or undefined if no schema was found with the given ID.
   */
  async getSchemaById(id: string, options?: GetSchemaByIdOptions): Promise<Schema | undefined> {
    try {
      const response = await this.client.schema.getById(id, options);
      return convertSchemaResponse(response);
    } catch (error) {
      if (typeof error === "object" && error?.statusCode === 404) {
        return undefined;
      }
      throw error;
    }
  }
}
