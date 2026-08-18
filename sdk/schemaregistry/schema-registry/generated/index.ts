// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SchemaRegistryClient } from "./schemaRegistryClient.js";
export type {
  SchemaContentTypeValues,
  GetSchemaByVersionResponse,
  GetSchemaByIdResponse,
} from "./models/index.js";
export { KnownServiceVersion } from "./models/index.js";
export type {
  RegisterSchemaOptionalParams,
  GetSchemaPropertiesByContentOptionalParams,
  GetSchemaByVersionOptionalParams,
  GetSchemaByIdOptionalParams,
  ListSchemaVersionsOptionalParams,
  ListSchemaGroupsOptionalParams,
  SchemaRegistryClientOptionalParams,
} from "./api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
