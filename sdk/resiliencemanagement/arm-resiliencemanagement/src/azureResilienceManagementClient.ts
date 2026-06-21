// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureResilienceManagementContext,
  AzureResilienceManagementClientOptionalParams,
  createAzureResilienceManagement,
} from "./api/index.js";
import {
  DrillResourcesOperations,
  _getDrillResourcesOperations,
} from "./classic/drillResources/index.js";
import {
  DrillRunResourcesOperations,
  _getDrillRunResourcesOperations,
} from "./classic/drillRunResources/index.js";
import { DrillRunsOperations, _getDrillRunsOperations } from "./classic/drillRuns/index.js";
import { DrillsOperations, _getDrillsOperations } from "./classic/drills/index.js";
import { EnrollmentsOperations, _getEnrollmentsOperations } from "./classic/enrollments/index.js";
import {
  GoalAssignmentsOperations,
  _getGoalAssignmentsOperations,
} from "./classic/goalAssignments/index.js";
import {
  GoalResourcesOperations,
  _getGoalResourcesOperations,
} from "./classic/goalResources/index.js";
import {
  GoalTemplatesOperations,
  _getGoalTemplatesOperations,
} from "./classic/goalTemplates/index.js";
import {
  OperationStatusOperations,
  _getOperationStatusOperations,
} from "./classic/operationStatus/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  RecoveryJobResourcesOperations,
  _getRecoveryJobResourcesOperations,
} from "./classic/recoveryJobResources/index.js";
import {
  RecoveryJobsOperations,
  _getRecoveryJobsOperations,
} from "./classic/recoveryJobs/index.js";
import {
  RecoveryPlanActionsOperations,
  _getRecoveryPlanActionsOperations,
} from "./classic/recoveryPlanActions/index.js";
import {
  RecoveryPlansOperations,
  _getRecoveryPlansOperations,
} from "./classic/recoveryPlans/index.js";
import {
  RecoveryResourcesOperations,
  _getRecoveryResourcesOperations,
} from "./classic/recoveryResources/index.js";
import {
  UnifiedResilienceItemsOperations,
  _getUnifiedResilienceItemsOperations,
} from "./classic/unifiedResilienceItems/index.js";
import { UsagePlansOperations, _getUsagePlansOperations } from "./classic/usagePlans/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureResilienceManagementClientOptionalParams } from "./api/azureResilienceManagementContext.js";

export class AzureResilienceManagementClient {
  private _client: AzureResilienceManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureResilienceManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureResilienceManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureResilienceManagementClientOptionalParams,
    options?: AzureResilienceManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureResilienceManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.enrollments = _getEnrollmentsOperations(this._client);
    this.usagePlans = _getUsagePlansOperations(this._client);
    this.unifiedResilienceItems = _getUnifiedResilienceItemsOperations(this._client);
    this.drillRunResources = _getDrillRunResourcesOperations(this._client);
    this.drillRuns = _getDrillRunsOperations(this._client);
    this.drillResources = _getDrillResourcesOperations(this._client);
    this.drills = _getDrillsOperations(this._client);
    this.recoveryJobResources = _getRecoveryJobResourcesOperations(this._client);
    this.recoveryJobs = _getRecoveryJobsOperations(this._client);
    this.recoveryResources = _getRecoveryResourcesOperations(this._client);
    this.recoveryPlanActions = _getRecoveryPlanActionsOperations(this._client);
    this.recoveryPlans = _getRecoveryPlansOperations(this._client);
    this.goalResources = _getGoalResourcesOperations(this._client);
    this.goalTemplates = _getGoalTemplatesOperations(this._client);
    this.goalAssignments = _getGoalAssignmentsOperations(this._client);
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for enrollments */
  public readonly enrollments: EnrollmentsOperations;
  /** The operation groups for usagePlans */
  public readonly usagePlans: UsagePlansOperations;
  /** The operation groups for unifiedResilienceItems */
  public readonly unifiedResilienceItems: UnifiedResilienceItemsOperations;
  /** The operation groups for drillRunResources */
  public readonly drillRunResources: DrillRunResourcesOperations;
  /** The operation groups for drillRuns */
  public readonly drillRuns: DrillRunsOperations;
  /** The operation groups for drillResources */
  public readonly drillResources: DrillResourcesOperations;
  /** The operation groups for drills */
  public readonly drills: DrillsOperations;
  /** The operation groups for recoveryJobResources */
  public readonly recoveryJobResources: RecoveryJobResourcesOperations;
  /** The operation groups for recoveryJobs */
  public readonly recoveryJobs: RecoveryJobsOperations;
  /** The operation groups for recoveryResources */
  public readonly recoveryResources: RecoveryResourcesOperations;
  /** The operation groups for recoveryPlanActions */
  public readonly recoveryPlanActions: RecoveryPlanActionsOperations;
  /** The operation groups for recoveryPlans */
  public readonly recoveryPlans: RecoveryPlansOperations;
  /** The operation groups for goalResources */
  public readonly goalResources: GoalResourcesOperations;
  /** The operation groups for goalTemplates */
  public readonly goalTemplates: GoalTemplatesOperations;
  /** The operation groups for goalAssignments */
  public readonly goalAssignments: GoalAssignmentsOperations;
  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
