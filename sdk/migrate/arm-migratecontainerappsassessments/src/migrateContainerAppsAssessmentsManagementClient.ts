// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MigrateContainerAppsAssessmentsManagementContext,
  MigrateContainerAppsAssessmentsManagementClientOptionalParams,
} from "./api/index.js";
import { createMigrateContainerAppsAssessmentsManagement } from "./api/index.js";
import type { AssessedWebApplicationOperationsOperations } from "./classic/assessedWebApplicationOperations/index.js";
import { _getAssessedWebApplicationOperationsOperations } from "./classic/assessedWebApplicationOperations/index.js";
import type { ContainerAppsAssessmentOperationsOperations } from "./classic/containerAppsAssessmentOperations/index.js";
import { _getContainerAppsAssessmentOperationsOperations } from "./classic/containerAppsAssessmentOperations/index.js";
import type { ContainerAppsCostDetailOperationsOperations } from "./classic/containerAppsCostDetailOperations/index.js";
import { _getContainerAppsCostDetailOperationsOperations } from "./classic/containerAppsCostDetailOperations/index.js";
import type { ContainerAppsManagedEnvironmentOperationsOperations } from "./classic/containerAppsManagedEnvironmentOperations/index.js";
import { _getContainerAppsManagedEnvironmentOperationsOperations } from "./classic/containerAppsManagedEnvironmentOperations/index.js";
import type { ContainerAppsOptionsOperationsOperations } from "./classic/containerAppsOptionsOperations/index.js";
import { _getContainerAppsOptionsOperationsOperations } from "./classic/containerAppsOptionsOperations/index.js";
import type { ContainerAppsSummaryOperationsOperations } from "./classic/containerAppsSummaryOperations/index.js";
import { _getContainerAppsSummaryOperationsOperations } from "./classic/containerAppsSummaryOperations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MigrateContainerAppsAssessmentsManagementClientOptionalParams } from "./api/migrateContainerAppsAssessmentsManagementContext.js";

export class MigrateContainerAppsAssessmentsManagementClient {
  private _client: MigrateContainerAppsAssessmentsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Migrate Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MigrateContainerAppsAssessmentsManagementClientOptionalParams = {},
  ) {
    this._client = createMigrateContainerAppsAssessmentsManagement(
      credential,
      subscriptionId,
      options,
    );
    this.pipeline = this._client.pipeline;
    this.containerAppsCostDetailOperations = _getContainerAppsCostDetailOperationsOperations(
      this._client,
    );
    this.containerAppsManagedEnvironmentOperations =
      _getContainerAppsManagedEnvironmentOperationsOperations(this._client);
    this.containerAppsSummaryOperations = _getContainerAppsSummaryOperationsOperations(
      this._client,
    );
    this.containerAppsOptionsOperations = _getContainerAppsOptionsOperationsOperations(
      this._client,
    );
    this.assessedWebApplicationOperations = _getAssessedWebApplicationOperationsOperations(
      this._client,
    );
    this.containerAppsAssessmentOperations = _getContainerAppsAssessmentOperationsOperations(
      this._client,
    );
  }

  /** The operation groups for containerAppsCostDetailOperations */
  public readonly containerAppsCostDetailOperations: ContainerAppsCostDetailOperationsOperations;
  /** The operation groups for containerAppsManagedEnvironmentOperations */
  public readonly containerAppsManagedEnvironmentOperations: ContainerAppsManagedEnvironmentOperationsOperations;
  /** The operation groups for containerAppsSummaryOperations */
  public readonly containerAppsSummaryOperations: ContainerAppsSummaryOperationsOperations;
  /** The operation groups for containerAppsOptionsOperations */
  public readonly containerAppsOptionsOperations: ContainerAppsOptionsOperationsOperations;
  /** The operation groups for assessedWebApplicationOperations */
  public readonly assessedWebApplicationOperations: AssessedWebApplicationOperationsOperations;
  /** The operation groups for containerAppsAssessmentOperations */
  public readonly containerAppsAssessmentOperations: ContainerAppsAssessmentOperationsOperations;
}
