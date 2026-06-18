// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  activateBringYourOwnRoot,
  revokeIssuer,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/policies/operations.js";
import {
  PoliciesActivateBringYourOwnRootOptionalParams,
  PoliciesRevokeIssuerOptionalParams,
  PoliciesListByResourceGroupOptionalParams,
  PoliciesUpdateOptionalParams,
  PoliciesDeleteOptionalParams,
  PoliciesCreateOrUpdateOptionalParams,
  PoliciesGetOptionalParams,
} from "../../api/policies/options.js";
import { Policy, PolicyUpdate, ActivateBringYourOwnRootRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Policies operations. */
export interface PoliciesOperations {
  /** Activates or renews a Bring Your Own Root policy by accepting a customer-provided signed certificate. This is a long-running operation that returns no content upon completion. */
  activateBringYourOwnRoot: (
    resourceGroupName: string,
    namespaceName: string,
    policyName: string,
    body: ActivateBringYourOwnRootRequest,
    options?: PoliciesActivateBringYourOwnRootOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** A long-running resource action. */
  revokeIssuer: (
    resourceGroupName: string,
    namespaceName: string,
    policyName: string,
    options?: PoliciesRevokeIssuerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Policy resources by Credential */
  listByResourceGroup: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PoliciesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Policy>;
  /** Update a Policy */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    policyName: string,
    properties: PolicyUpdate,
    options?: PoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<Policy>, Policy>;
  /** Delete a Policy */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    policyName: string,
    options?: PoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Policy */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    policyName: string,
    resource: Policy,
    options?: PoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Policy>, Policy>;
  /** Get a Policy */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    policyName: string,
    options?: PoliciesGetOptionalParams,
  ) => Promise<Policy>;
}

function _getPolicies(context: DeviceRegistryManagementContext) {
  return {
    activateBringYourOwnRoot: (
      resourceGroupName: string,
      namespaceName: string,
      policyName: string,
      body: ActivateBringYourOwnRootRequest,
      options?: PoliciesActivateBringYourOwnRootOptionalParams,
    ) =>
      activateBringYourOwnRoot(
        context,
        resourceGroupName,
        namespaceName,
        policyName,
        body,
        options,
      ),
    revokeIssuer: (
      resourceGroupName: string,
      namespaceName: string,
      policyName: string,
      options?: PoliciesRevokeIssuerOptionalParams,
    ) => revokeIssuer(context, resourceGroupName, namespaceName, policyName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      namespaceName: string,
      options?: PoliciesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, namespaceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      policyName: string,
      properties: PolicyUpdate,
      options?: PoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, policyName, properties, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      policyName: string,
      options?: PoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, policyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      policyName: string,
      resource: Policy,
      options?: PoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, policyName, resource, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      policyName: string,
      options?: PoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, policyName, options),
  };
}

export function _getPoliciesOperations(
  context: DeviceRegistryManagementContext,
): PoliciesOperations {
  return {
    ..._getPolicies(context),
  };
}
