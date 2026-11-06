// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdditionalPolicyConfig } from "@azure-rest/core-client";
import type {
  HttpClient,
  PipelineOptions,
  PipelineRequest,
  PipelineResponse,
  TransferProgressEvent,
} from "@azure/core-rest-pipeline";
import type { OperationTracingOptions } from "@azure/core-tracing";

/**
 * Options to govern behavior of the XML parser and builder.
 */
export interface XmlOptions {
  /** The name of the root element when building XML. */
  rootName?: string;
  /** Whether to include the root element when parsing XML. */
  includeRoot?: boolean;
  /** The key used to access XML value content when parsing XML. */
  xmlCharKey?: string;
}

/**
 * Options to configure serialization and deserialization behavior.
 */
export interface SerializerOptions {
  /** Options to configure XML parser and builder behavior. */
  xml: XmlOptions;
  /** Whether to exclude properties without a mapper from the result. */
  ignoreUnknownProperties?: boolean;
}

/**
 * HTTP response with deserialized headers and body.
 */
export interface FullOperationResponse extends PipelineResponse {
  /** The parsed HTTP response headers. */
  parsedHeaders?: { [key: string]: unknown };
  /**
   * The response body as parsed JSON or XML.
   * Retains the permissive type of the legacy response callback.
   */
  parsedBody?: any;
  /** The request that generated the response. */
  request: PipelineRequest;
}

/**
 * Callback invoked each time a response is received while performing an operation.
 * May be called multiple times.
 */
export type RawResponseCallback = (
  rawResponse: FullOperationResponse,
  flatResponse: unknown,
  error?: unknown,
) => void;

/**
 * Options used when creating and sending HTTP requests for an operation.
 */
export interface OperationRequestOptions {
  /** User-defined custom request headers. */
  customHeaders?: { [key: string]: string };
  /** The number of milliseconds before a request is automatically terminated. */
  timeout?: number;
  /** Callback which fires upon upload progress. */
  onUploadProgress?: (progress: TransferProgressEvent) => void;
  /** Callback which fires upon download progress. */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
  /** Whether to deserialize the response. Defaults to true. */
  shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
  /** Set to true if the request is sent over HTTP instead of HTTPS. */
  allowInsecureConnection?: boolean;
}

/**
 * The base options type for all operations.
 */
export interface OperationOptions {
  /** The signal which can be used to abort requests. */
  abortSignal?: NonNullable<PipelineRequest["abortSignal"]>;
  /** Options used when creating and sending HTTP requests for this operation. */
  requestOptions?: OperationRequestOptions;
  /** Options used when tracing is enabled. */
  tracingOptions?: OperationTracingOptions;
  /** Options to override serialization and deserialization behavior. */
  serializerOptions?: SerializerOptions;
  /** Callback invoked each time a response is received from the server. */
  onResponse?: RawResponseCallback;
}

/**
 * Properties of a schema.
 */
export interface SchemaProperties {
  /** ID that uniquely identifies a schema in the registry namespace. */
  id: string;
  /**
   * Serialization type of schema.
   */
  format: string;
  /** Schema group under which schema is or should be registered. */
  groupName: string;
  /** Name of schema. */
  name: string;
  /** The version of schema */
  version: number;
}

/**
 * Schema definition with its name, format, and group.
 */
export interface SchemaDescription {
  /** Schema group under which schema is or should be registered. */
  groupName: string;
  /** Name of schema. */
  name: string;
  /**
   * The format of schema and it must match the serialization type of the schema's group.
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
export interface SchemaRegistryClientOptions extends PipelineOptions {
  /** The HttpClient that will be used to send HTTP requests. */
  httpClient?: HttpClient;
  /** Set to true if the request is sent over HTTP instead of HTTPS. */
  allowInsecureConnection?: boolean;
  /** Additional policies to include in the HTTP pipeline. */
  additionalPolicies?: AdditionalPolicyConfig[];
  /**
   * The service API version to use in requests. The default is "2022-10".
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
    options?: RegisterSchemaOptions,
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
    options?: GetSchemaPropertiesOptions,
  ): Promise<SchemaProperties>;
  /**
   * Gets an existing schema by ID.
   *
   * @param schemaId - Unique schema ID.
   * @returns Schema with given ID.
   */
  getSchema(schemaId: string, options?: GetSchemaOptions): Promise<Schema>;
}

/**
 * Schema formats supported at the time of this library release.
 */
export enum KnownSchemaFormats {
  /** Avro */
  Avro = "Avro",
  /** JSON */
  Json = "Json",
  /** Schemas of the custom format will be treated as an opaque string */
  Custom = "Custom",
}

/** Alias for SchemaContentTypeValues */
export type SchemaContentTypeValues =
  | "application/json; serialization=Avro"
  | "application/json; serialization=Json"
  | "text/plain; charset=utf-8";
