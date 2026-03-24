// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/policyRestriction/operations.js";
import type {
  PolicyRestrictionListByServiceOptionalParams,
  PolicyRestrictionDeleteOptionalParams,
  PolicyRestrictionUpdateOptionalParams,
  PolicyRestrictionCreateOrUpdateOptionalParams,
  PolicyRestrictionGetEntityTagOptionalParams,
  PolicyRestrictionGetOptionalParams,
} from "../../api/policyRestriction/options.js";
import type {
  PolicyRestrictionContract,
  PolicyRestrictionUpdateContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyRestriction operations. */
export interface PolicyRestrictionOperations {
  /** Gets all policy restrictions of API Management services. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyRestrictionListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyRestrictionContract>;
  /** Deletes the policy restriction configuration of the Api Management Service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    policyRestrictionId: string,
    options?: PolicyRestrictionDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the policy restriction configuration of the Api Management service. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    policyRestrictionId: string,
    ifMatch: string,
    parameters: PolicyRestrictionUpdateContract,
    options?: PolicyRestrictionUpdateOptionalParams,
  ) => Promise<PolicyRestrictionContract>;
  /** Creates or updates the policy restriction configuration of the Api Management service. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    policyRestrictionId: string,
    parameters: PolicyRestrictionContract,
    options?: PolicyRestrictionCreateOrUpdateOptionalParams,
  ) => Promise<PolicyRestrictionContract>;
  /** Gets the entity state (Etag) version of the policy restriction in the Api Management service. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    policyRestrictionId: string,
    options?: PolicyRestrictionGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy restriction of the Api Management service. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    policyRestrictionId: string,
    options?: PolicyRestrictionGetOptionalParams,
  ) => Promise<PolicyRestrictionContract>;
}

function _getPolicyRestriction(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyRestrictionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      policyRestrictionId: string,
      options?: PolicyRestrictionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, policyRestrictionId, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      policyRestrictionId: string,
      ifMatch: string,
      parameters: PolicyRestrictionUpdateContract,
      options?: PolicyRestrictionUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        policyRestrictionId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      policyRestrictionId: string,
      parameters: PolicyRestrictionContract,
      options?: PolicyRestrictionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        policyRestrictionId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      policyRestrictionId: string,
      options?: PolicyRestrictionGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, policyRestrictionId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      policyRestrictionId: string,
      options?: PolicyRestrictionGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, policyRestrictionId, options),
  };
}

export function _getPolicyRestrictionOperations(
  context: ApiManagementContext,
): PolicyRestrictionOperations {
  return {
    ..._getPolicyRestriction(context),
  };
}
