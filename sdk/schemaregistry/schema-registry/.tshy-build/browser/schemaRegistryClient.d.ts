import type { GetSchemaOptions, GetSchemaPropertiesOptions, RegisterSchemaOptions, Schema, SchemaDescription, SchemaProperties, SchemaRegistry, SchemaRegistryClientOptions } from "./models.js";
import type { SchemaRegistryClient as SchemaRegistryContext } from "./clientDefinitions.js";
import type { ClientOptions } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
/**
 * Initialize a new instance of `SchemaRegistryClient`
 * @param fullyQualifiedNamespace - The Schema Registry service endpoint, for example 'my-namespace.servicebus.windows.net'.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(fullyQualifiedNamespace: string, credentials: TokenCredential, options?: ClientOptions): SchemaRegistryContext;
/**
 * Client for Azure Schema Registry service.
 */
export declare class SchemaRegistryClient implements SchemaRegistry {
    /** The Schema Registry service fully qualified namespace URL. */
    readonly fullyQualifiedNamespace: string;
    /** Underlying autorest generated client. */
    private readonly _client;
    /** The tracing client */
    private readonly _tracing;
    /**
     * Creates a new client for Azure Schema Registry service.
     *
     * @param fullyQualifiedNamespace - The Schema Registry service qualified namespace URL, for example
     *                                  https://mynamespace.servicebus.windows.net.
     * @param credential - Credential to authenticate requests to the service.
     * @param options - Options to configure API requests to the service.
     */
    constructor(fullyQualifiedNamespace: string, credential: TokenCredential, options?: SchemaRegistryClientOptions);
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
    registerSchema(schema: SchemaDescription, options?: RegisterSchemaOptions): Promise<SchemaProperties>;
    /**
     * Gets the ID of an existing schema with matching name, group, type, and
     * definition.
     *
     * @param schema - Schema to match.
     * @returns Matched schema's ID.
     */
    getSchemaProperties(schema: SchemaDescription, options?: GetSchemaPropertiesOptions): Promise<SchemaProperties>;
    /**
     * Gets an existing schema by ID. If the schema was not found, a RestError with
     * status code 404 will be thrown, which could be caught as follows:
     *
     * ```ts snippet:ignore
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
     * ```ts snippet:ignore
     * ...
     * } catch (e) {
      if (typeof e === "object" && e.statusCode === 404) {
        ...;
      }
      throw e;
    }
     * ```
     * @remarks
     *
     * If the client uses an older API version that does not support the format of the schema,
     * the schema format may return the value in the content type header. Please upgrade to the client using
     * the latest API version so that it can return the correct schema format.
     *
     * @param schemaDescription - schema version.
     * @returns Schema with given ID.
     */
    getSchema(name: string, groupName: string, version: number, options?: GetSchemaOptions): Promise<Schema>;
}
//# sourceMappingURL=schemaRegistryClient.d.ts.map