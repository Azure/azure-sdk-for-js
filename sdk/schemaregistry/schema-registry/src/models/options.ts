// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface ListSchemaGroupsOptions extends OperationOptions {}

export interface GetSchemaByIdOptions extends OperationOptions {}

export interface ListSchemaVersionsOptions extends OperationOptions {}

export interface GetSchemaByVersionOptions extends OperationOptions {}

export interface GetSchemaIdByContentOptions extends OperationOptions {
  /** The content type for given schema. */
  contentType?: string;
}

export interface RegisterSchemaOptions extends OperationOptions {
  /** The content type for given schema. */
  contentType?: string;
}
