// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listReferences,
  listByService,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/policyFragment/operations.js";
import type {
  PolicyFragmentListReferencesOptionalParams,
  PolicyFragmentListByServiceOptionalParams,
  PolicyFragmentDeleteOptionalParams,
  PolicyFragmentCreateOrUpdateOptionalParams,
  PolicyFragmentGetEntityTagOptionalParams,
  PolicyFragmentGetOptionalParams,
} from "../../api/policyFragment/options.js";
import type { PolicyFragmentContract, ResourceCollection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PolicyFragment operations. */
export interface PolicyFragmentOperations {
  /** Lists policy resources that reference the policy fragment. */
  listReferences: (
    resourceGroupName: string,
    serviceName: string,
    id: string,
    options?: PolicyFragmentListReferencesOptionalParams,
  ) => Promise<ResourceCollection>;
  /** Gets all policy fragments. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyFragmentListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyFragmentContract>;
  /** Deletes a policy fragment. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    id: string,
    ifMatch: string,
    options?: PolicyFragmentDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a policy fragment. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    id: string,
    parameters: PolicyFragmentContract,
    options?: PolicyFragmentCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PolicyFragmentContract>, PolicyFragmentContract>;
  /** Gets the entity state (Etag) version of a policy fragment. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    id: string,
    options?: PolicyFragmentGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets a policy fragment. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    id: string,
    options?: PolicyFragmentGetOptionalParams,
  ) => Promise<PolicyFragmentContract>;
}

function _getPolicyFragment(context: ApiManagementContext) {
  return {
    listReferences: (
      resourceGroupName: string,
      serviceName: string,
      id: string,
      options?: PolicyFragmentListReferencesOptionalParams,
    ) => listReferences(context, resourceGroupName, serviceName, id, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyFragmentListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      id: string,
      ifMatch: string,
      options?: PolicyFragmentDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, id, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      id: string,
      parameters: PolicyFragmentContract,
      options?: PolicyFragmentCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, id, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      id: string,
      options?: PolicyFragmentGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, id, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      id: string,
      options?: PolicyFragmentGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, id, options),
  };
}

export function _getPolicyFragmentOperations(
  context: ApiManagementContext,
): PolicyFragmentOperations {
  return {
    ..._getPolicyFragment(context),
  };
}
