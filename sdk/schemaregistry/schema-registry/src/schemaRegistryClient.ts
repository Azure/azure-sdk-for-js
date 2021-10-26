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
import { getRawResponse, undefinedfyOn404 } from "./utils";

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
    return this.client.schema
      .register(schema.groupName, schema.name, schema.format, schema.schemaDefinition, options)
      .then(convertSchemaIdResponse);
  }

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * definition.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID or undefined if no matching schema was found.
   */
  async getSchemaProperties(
    schema: SchemaDescription,
    options?: GetSchemaPropertiesOptions
  ): Promise<SchemaProperties | undefined> {
    return undefinedfyOn404(
      this.client.schema
        .queryIdByContent(
          schema.groupName,
          schema.name,
          schema.format,
          schema.schemaDefinition,
          options
        )
        .then(convertSchemaIdResponse)
    );
  }

  /**
   * Gets an existing schema by ID.
   *
   * @param id - Unique schema ID.
   * @returns Schema with given ID or undefined if no schema was found with the given ID.
   */
  async getSchema(id: string, options?: GetSchemaOptions): Promise<Schema | undefined> {
    return undefinedfyOn404(
      getRawResponse(
        (paramOptions) => this.client.schema.getById(id, paramOptions),
        options || {}
      ).then(({ flatResponse, rawResponse }) => convertSchemaResponse(flatResponse, rawResponse))
    );
  }
}
