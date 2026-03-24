// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext, ManagementGroupsAPIOptionalParams } from "./api/index.js";
import { createManagementGroupsAPI } from "./api/index.js";
import {
  tenantBackfillStatus,
  startTenantBackfill,
  checkNameAvailability,
} from "./api/operations.js";
import type {
  TenantBackfillStatusOptionalParams,
  StartTenantBackfillOptionalParams,
  CheckNameAvailabilityOptionalParams,
} from "./api/options.js";
import type { EntitiesOperations } from "./classic/entities/index.js";
import { _getEntitiesOperations } from "./classic/entities/index.js";
import type { HierarchySettingsOperations } from "./classic/hierarchySettings/index.js";
import { _getHierarchySettingsOperations } from "./classic/hierarchySettings/index.js";
import type { ManagementGroupSubscriptionsOperations } from "./classic/managementGroupSubscriptions/index.js";
import { _getManagementGroupSubscriptionsOperations } from "./classic/managementGroupSubscriptions/index.js";
import type { ManagementGroupsOperations } from "./classic/managementGroups/index.js";
import { _getManagementGroupsOperations } from "./classic/managementGroups/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type {
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
  TenantBackfillStatusResult,
} from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ManagementGroupsAPIOptionalParams } from "./api/managementGroupsAPIContext.js";

export class ManagementGroupsAPI {
  private _client: ManagementGroupsAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * The Azure Management Groups API enables consolidation of multiple
   * subscriptions/resources into an organizational hierarchy and centrally
   * manage access control, policies, alerting and reporting for those resources.
   */
  constructor(credential: TokenCredential, options: ManagementGroupsAPIOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createManagementGroupsAPI(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.entities = _getEntitiesOperations(this._client);
    this.managementGroupSubscriptions = _getManagementGroupSubscriptionsOperations(this._client);
    this.hierarchySettings = _getHierarchySettingsOperations(this._client);
    this.managementGroups = _getManagementGroupsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Gets tenant backfill status */
  tenantBackfillStatus(
    options: TenantBackfillStatusOptionalParams = { requestOptions: {} },
  ): Promise<TenantBackfillStatusResult> {
    return tenantBackfillStatus(this._client, options);
  }

  /** Starts backfilling subscriptions for the Tenant. */
  startTenantBackfill(
    options: StartTenantBackfillOptionalParams = { requestOptions: {} },
  ): Promise<TenantBackfillStatusResult> {
    return startTenantBackfill(this._client, options);
  }

  /** Checks if the specified management group name is valid and unique */
  checkNameAvailability(
    checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
    options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<CheckNameAvailabilityResult> {
    return checkNameAvailability(this._client, checkNameAvailabilityRequest, options);
  }

  /** The operation groups for entities */
  public readonly entities: EntitiesOperations;
  /** The operation groups for managementGroupSubscriptions */
  public readonly managementGroupSubscriptions: ManagementGroupSubscriptionsOperations;
  /** The operation groups for hierarchySettings */
  public readonly hierarchySettings: HierarchySettingsOperations;
  /** The operation groups for managementGroups */
  public readonly managementGroups: ManagementGroupsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
