// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MongoMIResourcesListMongoMIRoleAssignmentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoMIResourcesDeleteMongoMIRoleAssignmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoMIResourcesCreateUpdateMongoMIRoleAssignmentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoMIResourcesGetMongoMIRoleAssignmentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoMIResourcesListMongoMIRoleDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MongoMIResourcesDeleteMongoMIRoleDefinitionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoMIResourcesCreateUpdateMongoMIRoleDefinitionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MongoMIResourcesGetMongoMIRoleDefinitionOptionalParams extends OperationOptions {}
