// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { validate } from "../../api/migrations/operations.js";
import type { MigrationsValidateOptionalParams } from "../../api/migrations/options.js";
import type {
  MigrationValidationRequest,
  MigrationValidationResponse,
} from "../../models/models.js";

/** Interface representing a Migrations operations. */
export interface MigrationsOperations {
  /** Validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource. */
  validate: (
    resourceGroupName: string,
    clusterName: string,
    body: MigrationValidationRequest,
    options?: MigrationsValidateOptionalParams,
  ) => Promise<MigrationValidationResponse>;
}

function _getMigrations(context: RedisEnterpriseManagementContext) {
  return {
    validate: (
      resourceGroupName: string,
      clusterName: string,
      body: MigrationValidationRequest,
      options?: MigrationsValidateOptionalParams,
    ) => validate(context, resourceGroupName, clusterName, body, options),
  };
}

export function _getMigrationsOperations(
  context: RedisEnterpriseManagementContext,
): MigrationsOperations {
  return {
    ..._getMigrations(context),
  };
}
