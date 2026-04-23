// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceGroupsManagementContext,
  ServiceGroupsManagementClientOptionalParams,
} from "./api/index.js";
import { createServiceGroupsManagement } from "./api/index.js";
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

export type { ServiceGroupsManagementClientOptionalParams } from "./api/serviceGroupsManagementContext.js";

export class ServiceGroupsManagementClient {
  private _client: ServiceGroupsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options: ServiceGroupsManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createServiceGroupsManagement(credential, {
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
