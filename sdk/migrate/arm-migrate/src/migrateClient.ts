// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext, MigrateClientOptionalParams } from "./api/index.js";
import { createMigrate } from "./api/index.js";
import type { MigrateProjectsOperations } from "./classic/migrateProjects/index.js";
import { _getMigrateProjectsOperations } from "./classic/migrateProjects/index.js";
import type { MigrationEntitiesOperations } from "./classic/migrationEntities/index.js";
import { _getMigrationEntitiesOperations } from "./classic/migrationEntities/index.js";
import type { MigrationEntityGroupsOperations } from "./classic/migrationEntityGroups/index.js";
import { _getMigrationEntityGroupsOperations } from "./classic/migrationEntityGroups/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TasksOperations } from "./classic/tasks/index.js";
import { _getTasksOperations } from "./classic/tasks/index.js";
import type { WavesOperations } from "./classic/waves/index.js";
import { _getWavesOperations } from "./classic/waves/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MigrateClientOptionalParams } from "./api/migrateContext.js";

export class MigrateClient {
  private _client: MigrateContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Migrate Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MigrateClientOptionalParams = {},
  ) {
    this._client = createMigrate(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.tasks = _getTasksOperations(this._client);
    this.migrationEntityGroups = _getMigrationEntityGroupsOperations(this._client);
    this.migrationEntities = _getMigrationEntitiesOperations(this._client);
    this.waves = _getWavesOperations(this._client);
    this.migrateProjects = _getMigrateProjectsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for tasks */
  public readonly tasks: TasksOperations;
  /** The operation groups for migrationEntityGroups */
  public readonly migrationEntityGroups: MigrationEntityGroupsOperations;
  /** The operation groups for migrationEntities */
  public readonly migrationEntities: MigrationEntitiesOperations;
  /** The operation groups for waves */
  public readonly waves: WavesOperations;
  /** The operation groups for migrateProjects */
  public readonly migrateProjects: MigrateProjectsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
