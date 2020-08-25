// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SerializationType } from "./generated/models";
import { GeneratedSchemaRegistryClient } from "./generated/generatedSchemaRegistryClient";
import { TokenCredential } from "@azure/core-http";
import { createPipeline } from "./pipeline";
import { convertSchemaIdResponse, convertSchemaResponse } from "./conversions";

import {
  GetSchemaByIdOptions,
  GetSchemaIdOptions,
  SchemaDescription,
  SchemaIdResponse,
  SchemaResponse,
  SchemaRegistryClientOptions,
  RegisterSchemaOptions
} from "./models";

/**
 * Client for Azure Schema Registry service.
 */
export class SchemaRegistryClient {
  /** The Schema Registry service endpoint URL. */
  readonly endpoint: string;

  /** Underlying autorest generated client. */
  private readonly client: GeneratedSchemaRegistryClient;

  /**
   * Creates a new client for Azure Schema Registry service.
   *
   * @param endpoint The Schema Registry service endpoint URL, for example
   *                 https://mynamespace.servicebus.windows.net.
   * @param credential Credential to authenticate requests to the service.
   * @param options Options to configure API requests to the service.
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
   * Registers a schema.
   *
   * If schema of specified name does not exist in the specified group, a schema
   * is created at version 1. If schema of specified name exists already in
   * specified group, schema is created at latest version + 1.
   *
   * @param schema Schema to register.
   * @return Registered schema's ID.
   */
  async registerSchema(
    schema: SchemaDescription,
    options?: RegisterSchemaOptions
  ): Promise<SchemaIdResponse> {
    const response = await this.client.schema.register(
      schema.group,
      schema.name,
      // cast due to https://github.com/Azure/autorest.typescript/issues/715
      // serialization type is an extensible enum, and therefore any string
      // should be allowed.
      schema.serializationType as SerializationType,
      schema.content,
      options
    );
    return convertSchemaIdResponse(response);
  }

  /**
   * Gets the identity of an existing schema with matching name, group, type,
   * and content.
   *
   * @param schema Schema to match.
   * @return Matched schema's ID.
   */
  async getSchemaId(
    schema: SchemaDescription,
    options?: GetSchemaIdOptions
  ): Promise<SchemaIdResponse> {
    const response = await this.client.schema.queryIdByContent(
      schema.group,
      schema.name,
      // cast due to https://github.com/Azure/autorest.typescript/issues/715
      // serialization type is an extensible enum, and therefore any string
      // should be allowed.
      schema.serializationType as SerializationType,
      schema.content,
      options
    );
    return convertSchemaIdResponse(response);
  }

  /**
   * Gets an existing schema by ID.
   *
   * @param id Unique schema ID.
   * @return Schema with given ID.
   */
  async getSchemaById(id: string, options?: GetSchemaByIdOptions): Promise<SchemaResponse> {
    const response = await this.client.schema.getById(id, options);
    return convertSchemaResponse(response);
  }
}
