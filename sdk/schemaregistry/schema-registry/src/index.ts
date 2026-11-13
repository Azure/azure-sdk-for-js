// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { SchemaRegistryClient } from "./schemaRegistryClient.js";
export {
  type FullOperationResponse,
  type GetSchemaOptions,
  type GetSchemaPropertiesOptions,
  KnownSchemaFormats,
  type OperationOptions,
  type OperationRequestOptions,
  type RawResponseCallback,
  type RegisterSchemaOptions,
  type Schema,
  type SchemaDescription,
  type SchemaRegistry,
  type SchemaRegistryClientOptions,
  type SchemaProperties,
  type SerializerOptions,
  type XmlOptions,
} from "./models.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";
