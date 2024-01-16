// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetSchemaOptions,
  GetSchemaPropertiesOptions,
  RegisterSchemaOptions,
  Schema,
  SchemaDescription,
  SchemaProperties,
  SchemaRegistry,
  SchemaRegistryClientOptions,
} from "./models/models";
import { TokenCredential } from "@azure/core-auth";
import { SchemaRegistryClient as SchemaRegistryContext } from "./clientDefinitions";
import {
  registerSchema,
  getSchemaProperties,
  getSchemaById,
  getSchemaByVersion,
} from "./api/client";
import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";

/**
 * Initialize a new instance of `SchemaRegistryClient`
 * @param fullyQualifiedNamespace - The Schema Registry service endpoint, for example 'my-namespace.servicebus.windows.net'.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(fullyQualifiedNamespace: string, credentials: TokenCredential, options: ClientOptions = {}): SchemaRegistryContext {
    const baseUrl = options.baseUrl ?? `${fullyQualifiedNamespace}`;
    options.apiVersion = options.apiVersion ?? "2023-07-01";
    const userAgentInfo = `azsdk-js-AzureSchemaRegistry-rest/1.0.0-beta.1`;
    const userAgentPrefix = options.userAgentOptions && options.userAgentOptions.userAgentPrefix
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
      scopes: options.credentials?.scopes ?? ["https://eventhubs.azure.net/.default"],
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
    // const authPolicy = bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_SCOPE });
    // this._client = createClient(fullyQualifiedNamespace, credential, { ...options, additionalPolicies: [{policy: authPolicy, position: "perCall"}]})
    this.fullyQualifiedNamespace = fullyQualifiedNamespace;
    this._client = createClient(fullyQualifiedNamespace, credential, { ...options });
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
    options: RegisterSchemaOptions = {}
  ): Promise<SchemaProperties> {
    return registerSchema(this._client, schema, options);
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
    options: GetSchemaPropertiesOptions = {}
  ): Promise<SchemaProperties> {
    return getSchemaProperties(this._client, schema, options);
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
   *
   * @param schemaDescription - schema version.
   * @returns Schema with given ID.
   */
  getSchema(
    name: string,
    groupName: string,
    version: number,
    options?: GetSchemaOptions
  ): Promise<Schema>;
  // implementation
  getSchema(
    nameOrId: string,
    groupNameOrOptions?: string | GetSchemaOptions,
    version?: number,
    options: GetSchemaOptions = {}
  ): Promise<Schema> {
    if (typeof groupNameOrOptions !== "string" && version === undefined) {
      return getSchemaById(this._client, nameOrId, options);
    }
    return getSchemaByVersion(
      this._client,
      groupNameOrOptions as string,
      nameOrId,
      version as number,
      options
    );
  }
}
