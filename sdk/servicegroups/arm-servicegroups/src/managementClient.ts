// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementContext, ManagementClientOptionalParams } from "./api/index.js";
import { createManagement } from "./api/index.js";
import {
  deleteServiceGroup,
  updateServiceGroup,
  createOrUpdateServiceGroup,
} from "./api/operations.js";
import type {
  DeleteServiceGroupOptionalParams,
  UpdateServiceGroupOptionalParams,
  CreateOrUpdateServiceGroupOptionalParams,
} from "./api/options.js";
import type { ServiceGroupsOperations } from "./classic/serviceGroups/index.js";
import { _getServiceGroupsOperations } from "./classic/serviceGroups/index.js";
import type { ServiceGroup } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ManagementClientOptionalParams } from "./api/managementContext.js";

export class ManagementClient {
  private _client: ManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Groups RP provides Service Groups as a construct to group multiple resources, resource groups, subscriptions and other service groups into an organizational hierarchy and centrally manage access control, policies, alerting and reporting for those resources */
  constructor(credential: TokenCredential, options: ManagementClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.serviceGroups = _getServiceGroupsOperations(this._client);
  }

  /** Delete a ServiceGroup */
  deleteServiceGroup(
    serviceGroupName: string,
    options: DeleteServiceGroupOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<void>, void> {
    return deleteServiceGroup(this._client, serviceGroupName, options);
  }

  /** Update a serviceGroup */
  updateServiceGroup(
    serviceGroupName: string,
    updateServiceGroupRequest: ServiceGroup,
    options: UpdateServiceGroupOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<ServiceGroup>, ServiceGroup> {
    return updateServiceGroup(this._client, serviceGroupName, updateServiceGroupRequest, options);
  }

  /** Create or Update a serviceGroup */
  createOrUpdateServiceGroup(
    serviceGroupName: string,
    createServiceGroupRequest: ServiceGroup,
    options: CreateOrUpdateServiceGroupOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<ServiceGroup>, ServiceGroup> {
    return createOrUpdateServiceGroup(
      this._client,
      serviceGroupName,
      createServiceGroupRequest,
      options,
    );
  }

  /** The operation groups for serviceGroups */
  public readonly serviceGroups: ServiceGroupsOperations;
}
