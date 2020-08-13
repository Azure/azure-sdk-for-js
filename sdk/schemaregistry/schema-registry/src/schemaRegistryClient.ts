// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DEFAULT_SCOPE, LIB_INFO } from "./constants";
import { logger } from "./logger";
import { Schema, SchemaId, SchemaDescription } from "./models";
import { GeneratedSchemaRegistryClient } from "./generated/generatedSchemaRegistryClient";

import {
  SerializationType,
  SchemaGetByIdResponse,
  SchemaRegisterResponse,
  SchemaQueryIdByContentResponse
} from "./generated/models";

import {
  HttpOperationResponse,
  InternalPipelineOptions,
  OperationOptions,
  PipelineOptions,
  ServiceClientOptions,
  TokenCredential,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions
} from "@azure/core-http";

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
    this.client = new GeneratedSchemaRegistryClient(endpoint, { endpoint, ...pipeline });
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
 * Builds ServiceClientOptions from PipelineOptions and credentials.
 * Sets up logger and user agent prefix.
 */
function createPipeline(
  options: PipelineOptions,
  credential: TokenCredential
): ServiceClientOptions {
  const internalOptions = convertPipelineOptions(options);
  const policy = bearerTokenAuthenticationPolicy(credential, DEFAULT_SCOPE);
  return createPipelineFromOptions(internalOptions, policy);
}

/**
 * Converts PipelineOptions to InternalPipelineOptions.
 * Adds logger and user agent prefix.
 */
function convertPipelineOptions(options: PipelineOptions): InternalPipelineOptions {
  if (!options.userAgentOptions) {
    options.userAgentOptions = {};
  }

  if (options.userAgentOptions.userAgentPrefix) {
    options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${LIB_INFO}`;
  } else {
    options.userAgentOptions.userAgentPrefix = LIB_INFO;
  }

  return {
    ...options,
    loggingOptions: {
      logger: logger.info
    }
  };
}

/**
 * Union of generated client's responses that return schema content.
 */
type GeneratedSchemaResponse = SchemaGetByIdResponse;

/**
 * Union of generated client's responses that return schema ID.
 */
type GeneratedSchemaIdResponse = SchemaRegisterResponse | SchemaQueryIdByContentResponse;

/**
 * Union of all generated client's responses.
 */
type GeneratedResponse = GeneratedSchemaResponse | GeneratedSchemaIdResponse;

/**
 * Converts generated client's reponse to IdentifiedSchemaResponse.
 */
function convertSchemaResponse(response: GeneratedSchemaResponse): SchemaResponse {
  return {
    ...convertResponse(response),
    content: response.body
  };
}

/**
 * Converts generated client's response to SchemaIdentityResponse.
 */
function convertSchemaIdResponse(response: GeneratedSchemaIdResponse): SchemaIdResponse {
  return {
    ...convertResponse(response),
    // `!` here because server is required to return this on success, but that
    // is not modeled by the generated client.
    id: response.id!
  };
}

/**
 * Converts common portion of all generated client responses.
 */
function convertResponse(response: GeneratedResponse): SchemaIdResponse {
  return {
    _response: response._response,
    // `!`s here because server is required to return these on success, but that
    // is not modeled by the generated client.
    location: response.location!,
    locationById: response.xSchemaIdLocation!,
    id: response.xSchemaId!,
    version: response.xSchemaVersion!
  };
}

