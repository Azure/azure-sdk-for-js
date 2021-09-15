// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeneratedSchemaRegistryClient } from "./generated/generatedSchemaRegistryClient";
import { TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions
} from "@azure/core-rest-pipeline";
import { convertSchemaIdResponse, convertSchemaResponse } from "./conversions";

import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  SchemaDescription,
  SchemaRegistryClientOptions,
  SchemaRegistry,
  RegisterSchemaOptions,
  SchemaProperties,
  Schema
} from "./models";
import { DEFAULT_SCOPE } from "./constants";
import { logger } from "./logger";
import { getRawResponse } from "./utils";

/**
 * Client for Azure Schema Registry service.
 */
export class SchemaRegistryClient implements SchemaRegistry {
  /** The Schema Registry service endpoint URL. */
  readonly endpoint: string;

  /** Underlying autorest generated client. */
  private readonly client: GeneratedSchemaRegistryClient;

  private readonly schemaToIdMap: Map<SchemaDescription, SchemaProperties>;
  private readonly idToSchemaMap: Map<string, Schema>;

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
    this.endpoint = endpoint;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    this.client = new GeneratedSchemaRegistryClient(this.endpoint, {
      endpoint: this.endpoint,
      ...internalPipelineOptions
    });

    const authPolicy = bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_SCOPE });
    this.client.pipeline.addPolicy(authPolicy);
    this.schemaToIdMap = new Map();
    this.idToSchemaMap = new Map();
  }

  private addToCache(schema: SchemaDescription, id: SchemaProperties): void {
    this.schemaToIdMap.set(schema, id);
    this.idToSchemaMap.set(id.id, { ...id, content: schema.content });
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
  ): Promise<SchemaProperties> {
    const id = await this.client.schema
      .register(schema.groupName, schema.name, schema.serializationType, schema.content, options)
      .then(convertSchemaIdResponse);
    this.addToCache(schema, id);
    return id;
  }

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * content.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID or undefined if no matching schema was found.
   */
  async getSchemaProperties(
    schema: SchemaDescription,
    options?: GetSchemaPropertiesOptions
  ): Promise<SchemaProperties | undefined> {
    const cached = this.schemaToIdMap.get(schema);
    if (cached !== undefined) {
      return cached;
    }
    try {
      const id = await this.client.schema
        .queryIdByContent(
          schema.groupName,
          schema.name,
          schema.serializationType,
          schema.content,
          options
        )
        .then(convertSchemaIdResponse);
      this.addToCache(schema, id);
      return id;
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
  async getSchema(id: string, options?: GetSchemaOptions): Promise<Schema | undefined> {
    const cached = this.idToSchemaMap.get(id);
    if (cached !== undefined) {
      return cached;
    }
    try {
      const { flatResponse, rawResponse } = await getRawResponse(
        (paramOptions) => this.client.schema.getById(id, paramOptions),
        options || {}
      );
      const schema = convertSchemaResponse(flatResponse, rawResponse);
      // the service should send schema's name and group in separate headers so
      // we can implement the other direction of the bidirectional caching.
      // see https://github.com/Azure/azure-sdk-for-js/issues/16763
      this.idToSchemaMap.set(id, schema);
      return schema;
    } catch (error) {
      if (typeof error === "object" && error?.statusCode === 404) {
        return undefined;
      }
      throw error;
    }
  }
}
