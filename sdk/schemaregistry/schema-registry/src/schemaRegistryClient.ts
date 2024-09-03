// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
  SchemaRegistry,
  SchemaRegistryClientOptions,
} from "./models";
import { SchemaRegistryClient as SchemaRegistryContext } from "./clientDefinitions";
import {
  registerSchema,
  getSchemaProperties,
  getSchemaById,
  getSchemaByVersion,
} from "./operations";
import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import { DEFAULT_SCOPE, SDK_VERSION } from "./constants";

/**
 * Initialize a new instance of `SchemaRegistryClient`
 * @param fullyQualifiedNamespace - The Schema Registry service endpoint, for example 'my-namespace.servicebus.windows.net'.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  fullyQualifiedNamespace: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): SchemaRegistryContext {
  const baseUrl = options.baseUrl ?? `${fullyQualifiedNamespace}`;
  options.apiVersion = options.apiVersion ?? "2023-07-01";
  const userAgentInfo = `azsdk-js-schema-registry/${SDK_VERSION}`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ?? [DEFAULT_SCOPE],
    },
  };

  const client = getClient(baseUrl, credentials, options) as SchemaRegistryContext;

  return client;
}

/**
 * Client for Azure Schema Registry service.
 */
export class SchemaRegistryClient implements SchemaRegistry {
  /** The Schema Registry service fully qualified namespace URL. */
  readonly fullyQualifiedNamespace: string;

  /** Underlying autorest generated client. */
  private readonly _client: SchemaRegistryContext;

  /** The tracing client */
  private readonly _tracing: TracingClient;

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
    options: SchemaRegistryClientOptions = {},
  ) {
    this._tracing = createTracingClient({
      namespace: "Microsoft.EventHub",
      packageName: "@azure/schema-registry",
      packageVersion: SDK_VERSION,
    });
    this._client = createClient(fullyQualifiedNamespace, credential, { ...options });
    this.fullyQualifiedNamespace = fullyQualifiedNamespace;
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
  registerSchema(
    schema: SchemaDescription,
    options: RegisterSchemaOptions = {},
  ): Promise<SchemaProperties> {
    return this._tracing.withSpan(
      "SchemaRegistryClient.registerSchema",
      options,
      (updatedOptions) => registerSchema(this._client, schema, updatedOptions),
    );
  }

  /**
   * Gets the ID of an existing schema with matching name, group, type, and
   * definition.
   *
   * @param schema - Schema to match.
   * @returns Matched schema's ID.
   */
  getSchemaProperties(
    schema: SchemaDescription,
    options: GetSchemaPropertiesOptions = {},
  ): Promise<SchemaProperties> {
    return this._tracing.withSpan(
      "SchemaRegistryClient.getSchemaProperties",
      options,
      (updatedOptions) => getSchemaProperties(this._client, schema, updatedOptions),
    );
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
  getSchema(schemaId: string, options?: GetSchemaOptions): Promise<Schema>;

  /**
   * Gets an existing schema by version. If the schema was not found, a RestError with
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
   * Note: If the client uses an older API version that does not support the format of the schema, 
   * the schema format may return the value in the content type header. Please upgrade to the client using
   * the latest API version so that it can return the correct schema format.
   * 
   * @param schemaDescription - schema version.
   * @returns Schema with given ID.
   */
  getSchema(
    name: string,
    groupName: string,
    version: number,
    options?: GetSchemaOptions,
  ): Promise<Schema>;
  // implementation
  getSchema(
    nameOrId: string,
    groupNameOrOptions?: string | GetSchemaOptions,
    version?: number,
    options: GetSchemaOptions = {},
  ): Promise<Schema> {
    if (typeof groupNameOrOptions !== "string" && version === undefined) {
      return this._tracing.withSpan(
        "SchemaRegistryClient.getSchema",
        groupNameOrOptions ?? {},
        (updatedOptions) => getSchemaById(this._client, nameOrId, updatedOptions),
      );
    }
    return this._tracing.withSpan("SchemaRegistryClient.getSchema", options, (updatedOptions) =>
      getSchemaByVersion(
        this._client,
        groupNameOrOptions as string,
        nameOrId,
        version as number,
        updatedOptions,
      ),
    );
  }
}
