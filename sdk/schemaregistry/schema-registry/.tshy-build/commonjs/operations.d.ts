import type { GetSchemaOptions, GetSchemaPropertiesOptions, RegisterSchemaOptions, Schema, SchemaDescription, SchemaProperties } from "./models.js";
import type { SchemaRegistryClient } from "./clientDefinitions.js";
export declare function registerSchema(context: SchemaRegistryClient, schema: SchemaDescription, options?: RegisterSchemaOptions): Promise<SchemaProperties>;
export declare function prepareSchemaContent(schemaContent: string): Uint8Array;
export declare function getSchemaProperties(context: SchemaRegistryClient, schema: SchemaDescription, options?: GetSchemaPropertiesOptions): Promise<SchemaProperties>;
export declare function getSchemaById(context: SchemaRegistryClient, schemaId: string, options?: GetSchemaOptions): Promise<Schema>;
export declare function getSchemaByVersion(context: SchemaRegistryClient, groupName: string, name: string, version: number, options?: GetSchemaOptions): Promise<Schema>;
//# sourceMappingURL=operations.d.ts.map