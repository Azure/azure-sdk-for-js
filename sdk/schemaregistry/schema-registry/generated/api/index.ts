// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  registerSchema,
  getSchemaPropertiesByContent,
  getSchemaByVersion,
  getSchemaById,
  listSchemaVersions,
  listSchemaGroups,
} from "./operations.js";
export type {
  RegisterSchemaOptionalParams,
  GetSchemaPropertiesByContentOptionalParams,
  GetSchemaByVersionOptionalParams,
  GetSchemaByIdOptionalParams,
  ListSchemaVersionsOptionalParams,
  ListSchemaGroupsOptionalParams,
} from "./options.js";
export type {
  SchemaRegistryContext,
  SchemaRegistryClientOptionalParams,
} from "./schemaRegistryContext.js";
export { createSchemaRegistry } from "./schemaRegistryContext.js";
