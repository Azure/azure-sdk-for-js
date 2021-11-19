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

/**
 * Client for Azure Schema Registry service.
 */
export class SchemaRegistryClient implements SchemaRegistry {
  /** The Schema Registry service fully qualified namespace URL. */
  readonly fullyQualifiedNamespace: string;

  /** Underlying autorest generated client. */
  private readonly client: GeneratedSchemaRegistryClient;

  /**
   * Creates a new client for Azure Schema Registry service.
   *
   * @param fullyQualifiedNamespace - The Schema Registry service qualified namespace URL, for example
   *                                  https://mynamespace.servicebus.windows.net.
   * @param credential - Credential to authenticate requests to the service.
   * @param options - Options to configure API requests to the service.
   */
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential,
    options: SchemaRegistryClientOptions = {}
  ) {
    this.fullyQualifiedNamespace = fullyQualifiedNamespace;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    this.client = new GeneratedSchemaRegistryClient(this.fullyQualifiedNamespace, {
      endpoint: this.fullyQualifiedNamespace,
      apiVersion: options.apiVersion,
      ...internalPipelineOptions
    });

    const authPolicy = bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_SCOPE });
    this.client.pipeline.addPolicy(authPolicy);
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
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    return this.client.schema
      .register(
        groupName,
        schemaName,
        `application/json; serialization=${format}`,
        schemaContent,
        options
      )
      .then(convertSchemaIdResponse(format));
  }

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * definition.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID.
   */
  async getSchemaProperties(
    schema: SchemaDescription,
    options?: GetSchemaPropertiesOptions
  ): Promise<SchemaProperties> {
    const { groupName, name: schemaName, definition: schemaContent, format } = schema;
    return this.client.schema
      .queryIdByContent(
        groupName,
        schemaName,
        `application/json; serialization=${format}`,
        schemaContent,
        options
      )
      .then(convertSchemaIdResponse(format));
  }

  /**
   * Gets an existing schema by ID. If the schema was not found, a RestError with
   * status code 404 will be thrown, which could be caught as follows:
   * 
   * ```js
   * ...
   * } catch (e) {
    if (typeof e === "object" && e.statusCode === 404) {
      ...;
    }
    throw e;
  }
   * ```
   *
   * @param schemaId - Unique schema ID.
   * @returns Schema with given ID.
   */
  async getSchema(schemaId: string, options?: GetSchemaOptions): Promise<Schema> {
    return this.client.schema.getById(schemaId, options).then(convertSchemaResponse);
  }
}
